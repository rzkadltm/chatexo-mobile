import { Link, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import InCallManager from 'react-native-incall-manager';
import {
    RTCIceCandidate,
    RTCPeerConnection,
    RTCSessionDescription,
    mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

declare module 'react-native-webrtc' {
  interface RTCPeerConnection {
    onicecandidate: ((event: any) => void) | null;
    ontrack: ((event: any) => void) | null;
    onconnectionstatechange: ((event: any) => void) | null;
    onaddstream: ((event: any) => void) | null;
  }
}

const SERVER_URL = 'https://chatexo-server.duckdns.org';

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
        urls: "stun:relay1.expressturn.com:3478"
    },
    {
        urls: "turn:relay1.expressturn.com:3478",
        username: "000000002071554186",
        credential: "+NWiFhr865VmoyGZZDelKqokuZ4="
    },
    {
        urls: "turn:relay1.expressturn.com:3478",
        username: "efPU52K4SLOQ34W2QY",
        credential: "1TJPNFxHKXrZfelz"
    }
  ],
};

export default function Index() {
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('voice-room-1');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [userCount, setUserCount] = useState(0);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const socket = useRef<any>(null);
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const localStream = useRef<any>(null);

  useEffect(() => {
    requestPermissions();
    return cleanup;
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice calls.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
          setPermissionsGranted(true);
        } else {
          console.log('Microphone permission denied');
          Alert.alert('Permission Required', 'Microphone permission is required for voice calls.');
        }
      } else {
        setPermissionsGranted(true);
      }
    } catch (err) {
      console.warn('Permission request error:', err);
      Alert.alert('Error', 'Failed to request permissions');
    }
  };

  const initializeSocket = () => {
    if (socket.current) return;

    console.log('Connecting to server:', SERVER_URL);
    socket.current = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
    });

    socket.current.on('connect', () => {
      console.log('Connected to signaling server');
      setConnectionStatus('Connected to server');
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from signaling server');
      setConnectionStatus('Disconnected from server');
      setIsConnected(false);
    });

    socket.current.on('joined-room', (data: any) => {
      console.log('Successfully joined room:', data);
      setIsConnected(true);
      setIsConnecting(false);
      setUserCount(data.userCount);
      setConnectionStatus(`Connected - ${data.userCount} users`);
    });

    socket.current.on('join-error', (data: any) => {
      console.log('Join error:', data.message);
      Alert.alert('Join Failed', data.message);
      setIsConnecting(false);
      setConnectionStatus('Join failed');
    });

    socket.current.on('user-joined', (data: any) => {
      console.log('User joined:', data);
      setUserCount(data.userCount);
      setConnectionStatus(`Connected - ${data.userCount} users`);
    });

    socket.current.on('user-left', (data: any) => {
      console.log('User left:', data);
      setUserCount(data.userCount);
      setConnectionStatus(`Connected - ${data.userCount} users`);
      
      // Clean up peer connection for the user who left
      if (peerConnections.current.has(data.userId)) {
        peerConnections.current.get(data.userId)?.close();
        peerConnections.current.delete(data.userId);
      }
    });

    socket.current.on('new-user', async (data: any) => {
      console.log('New user joined, creating offer for:', data.userId);
      await createPeerConnection(data.userId, true);
    });

    socket.current.on('offer', async (data: any) => {
      console.log('Received offer from:', data.fromUserId);
      await handleOffer(data.fromUserId, data.offer);
    });

    socket.current.on('answer', async (data: any) => {
      console.log('Received answer from:', data.fromUserId);
      await handleAnswer(data.fromUserId, data.answer);
    });

    socket.current.on('ice-candidate', async (data: any) => {
      console.log('Received ICE candidate from:', data.fromUserId);
      await handleIceCandidate(data.fromUserId, data.candidate);
    });
  };

  const createPeerConnection = async (userId: string, shouldCreateOffer: boolean) => {
    try {
      const pc = new RTCPeerConnection(configuration);
      peerConnections.current.set(userId, pc);

      // Add local stream to peer connection
      if (localStream.current) {
        localStream.current.getTracks().forEach((track: any) => {
          pc.addTrack(track, localStream.current);
        });
      }

      pc.onicecandidate = (event) => {
        if (event.candidate && socket.current) {
          socket.current.emit('ice-candidate', {
            targetUserId: userId,
            candidate: event.candidate,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log('Received remote stream from:', userId);
        // Handle remote audio stream here
        if (event.streams && event.streams[0]) {
          console.log('Remote audio stream received from user:', userId);
        }
      };

      pc.onconnectionstatechange = () => {
        console.log(`Connection state with ${userId}:`, pc.connectionState);
      };

      if (shouldCreateOffer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        socket.current?.emit('offer', {
          targetUserId: userId,
          offer: offer,
        });
      }
    } catch (error) {
      console.error('Error creating peer connection:', error);
    }
  };

  const handleOffer = async (fromUserId: string, offer: any) => {
    try {
      await createPeerConnection(fromUserId, false);
      const pc = peerConnections.current.get(fromUserId);
      
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        
        socket.current?.emit('answer', {
          targetUserId: fromUserId,
          answer: answer,
        });
      }
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (fromUserId: string, answer: any) => {
    try {
      const pc = peerConnections.current.get(fromUserId);
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async (fromUserId: string, candidate: any) => {
    try {
      const pc = peerConnections.current.get(fromUserId);
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const getUserMedia = async () => {
    try {
      console.log('Requesting user media...');
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      
      console.log('Got local stream:', stream);
      localStream.current = stream;
      return stream;
    } catch (error) {
      console.error('Error getting user media:', error);
      Alert.alert('Error', 'Failed to access microphone. Please check permissions.');
      throw error;
    }
  };

  const startCall = async () => {
    if (password !== 'secret') {
      Alert.alert('Invalid Password', 'Please enter the correct password to join the call.');
      return;
    }

    if (!permissionsGranted) {
      Alert.alert('Permission Required', 'Please grant microphone permission first.');
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('Connecting...');

    try {
      // Initialize socket connection
      initializeSocket();
      
      // Get local audio stream
      await getUserMedia();
      
      // Start InCallManager to handle audio routing
      InCallManager.start({ media: 'audio' });

      // Join the room
      socket.current?.emit('join-room', {
        roomId: roomId,
        password: password,
      });

    } catch (error) {
      console.error('Error starting call:', error);
      setIsConnecting(false);
      setConnectionStatus('Failed');
      Alert.alert('Error', 'Failed to start voice call');
    }
  };

  const endCall = () => {
    if (socket.current) {
      socket.current.emit('leave-room');
      socket.current.disconnect();
      socket.current = null;
    }
    
    // Stop InCallManager
    InCallManager.stop();
    cleanup();
    setIsConnected(false);
    setIsConnecting(false);
    setConnectionStatus('Disconnected');
    setUserCount(0);
    Alert.alert('Call Ended', 'Voice call has been terminated.');
  };

  const cleanup = () => {
    // Stop local stream
    if (localStream.current) {
      localStream.current.getTracks().forEach((track: any) => track.stop());
      localStream.current = null;
    }
    
    // Close all peer connections
    peerConnections.current.forEach(pc => pc.close());
    peerConnections.current.clear();
  };

  const toggleSpeaker = () => {
    const nextState = !isSpeakerOn;
    InCallManager.setForceSpeakerphoneOn(nextState);
    setIsSpeakerOn(nextState);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'ChatExo Voice Call' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">ChatExo Voice Call</ThemedText>
        
        {/* Connection Status */}
        <ThemedView style={styles.statusContainer}>
          <ThemedText type="subtitle">Status: {connectionStatus}</ThemedText>
          <ThemedText style={styles.statusText}>
            {permissionsGranted ? '✅ Microphone Ready' : '❌ Microphone Permission Needed'}
          </ThemedText>
          {userCount > 0 && (
            <ThemedText style={styles.userCountText}>
              👥 {userCount} user{userCount !== 1 ? 's' : ''} in room
            </ThemedText>
          )}
        </ThemedView>

        {/* Room and Password Input */}
        {!isConnected && (
          <ThemedView style={styles.inputContainer}>
            <ThemedText type="default">Room ID:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter room name"
              placeholderTextColor="#888"
              value={roomId}
              onChangeText={setRoomId}
              editable={!isConnecting}
            />
            
            <ThemedText type="default" style={{ marginTop: 15 }}>Password:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter 'secret' to join"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              editable={!isConnecting}
            />
            <ThemedText style={styles.hint}>Hint: Password is 'secret'</ThemedText>
          </ThemedView>
        )}

        {/* Call Controls */}
        <ThemedView style={styles.buttonContainer}>
          {!isConnected ? (
            <TouchableOpacity
              style={[styles.button, styles.startButton, isConnecting && styles.disabledButton]}
              onPress={startCall}
              disabled={isConnecting || !permissionsGranted}
            >
              <ThemedText style={styles.buttonText}>
                {isConnecting ? 'Connecting...' : 'Start Voice Call'}
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <View style={styles.callControlsRow}>
              <TouchableOpacity
                style={[styles.button, styles.endButton]}
                onPress={endCall}
              >
                <ThemedText style={styles.buttonText}>End Call</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.speakerButton, isSpeakerOn && styles.speakerButtonActive]}
                onPress={toggleSpeaker}
              >
                <ThemedText style={styles.speakerButtonText}>
                  {isSpeakerOn ? '🔊' : '📞'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>

        {/* Server Instructions */}
        <ThemedView style={styles.instructionsContainer}>
          <ThemedText type="subtitle">Setup Instructions:</ThemedText>
          <ThemedText style={styles.instructionText}>
            1. Start the signaling server first{'\n'}
            2. Update SERVER_URL with your IP{'\n'}
            3. Enter room name and password{'\n'}
            4. Multiple devices can join the same room{'\n'}
            5. Real voice communication will work!
          </ThemedText>
        </ThemedView>

        {/* Navigation */}
        <Link href="/rooms" style={styles.link}>
          <ThemedText type="link">Go to rooms screen →</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    minWidth: '100%',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
  },
  userCountText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  inputContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  endButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    width: '100%',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  link: {
    marginTop: 30,
    paddingVertical: 15,
  },
  callControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  speakerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  speakerButtonActive: {
    backgroundColor: '#0D47A1',
  },
  speakerButtonText: {
    fontSize: 24,
  },
});