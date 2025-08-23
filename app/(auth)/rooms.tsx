import { Colors } from '@/constants/Colors';
import { rooms } from '@/features/rooms/data/rooms';
import { getRelativeTime } from '@/utils/date';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const ChatexoMainScreen = () => {
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const filteredRooms = rooms.filter((room) => {
    const lowerSearch = searchText.toLowerCase();

    const titleMatch = room.title.toLowerCase().includes(lowerSearch);

    const participantMatch = room.participants.some((p) =>
      p.name.toLowerCase().includes(lowerSearch)
    );

    return titleMatch || participantMatch;
  });

  interface Room {
    id: number;
    title: string;
    flags: string[];
    participants: { name: string; image: string }[];
    totalUsers: number;
    status: string;
    dateCreated: string;
  }

  interface RoomItemProps {
    room: Room;
  }

  const  RoomItem: React.FC<RoomItemProps> = ({ room }) => (
    <View style={[styles.roomItem, { backgroundColor: themeColors.background }]}>
      <View style={styles.roomHeader}>
        <View style={styles.flagContainer}>
          {room.flags.map((flag, index) => (
            <Text key={index} style={styles.roomFlag}>{flag}</Text>
          ))}
        </View>
        <Text style={[styles.dateCreatedText, { color: '#48BB78' }]}>
          {getRelativeTime(room.dateCreated)}
        </Text>
      </View>

      <Text style={[styles.roomTitle, { color: themeColors.text }]}>
        {room.title}
      </Text>

      <View style={styles.roomFooterAligned}>
        <View style={styles.leftContent}>
          <View style={styles.participantImages}>
            {room.participants.slice(0, 4).map((participant, index) => (
              <Image
                key={index}
                source={{ uri: participant.image }}
                style={[
                  styles.participantImage,
                  index > 0 && styles.spacedImage
                ]}
              />
            ))}

            {room.totalUsers > 4 && (
              <View style={[styles.participantImage, styles.moreParticipants, styles.spacedImage]}>
                <Text style={[styles.moreParticipantsText, { color: themeColors.icon }]}>
                  +{room.totalUsers - 4}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.statusAndJoinRow}>
            <View style={styles.userStatusRow}>
              <Text style={[styles.participantCount, { color: themeColors.icon }]}>
                {room.totalUsers} people
              </Text>
            </View>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <Text style={[styles.logo, { color: themeColors.text }]}>Chatexo</Text>
        <View style={styles.searchAndCreateWrapper}>
          <View style={[styles.searchContainer, { backgroundColor: colorScheme === 'dark' ? '#1F2122' : '#F7FAFC' }]}>
            <Text style={[styles.searchIcon, { color: themeColors.icon }]}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: themeColors.text }]}
              placeholder="Search rooms or users..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={themeColors.icon}
            />
          </View>

          <TouchableOpacity style={styles.createRoomButton} onPress={() => { /* Add logic here */ }}>
            <Text style={styles.createRoomButtonText}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.roomList}>
          {filteredRooms.map((room) => (
            <RoomItem key={room.id} room={room} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  searchAndCreateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  createRoomButton: {
    flex: 1,
    backgroundColor: '#48BB78',
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRoomButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  roomFooterAligned: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusAndJoinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  userStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 10,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  joinButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  roomList: {
    paddingHorizontal: 20,
  },
  roomItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  roomFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 16,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsSection: {
    flex: 1,
    flexDirection: 'column',
  },
  participantImages: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  participantImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 24,
  },
  spacedImage: {
    marginLeft: 8,
  },
  moreParticipants: {
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreParticipantsText: {
    fontSize: 10,
    fontWeight: '600',
  },
  participantCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  roomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#48BB78',
    marginRight: 6,
  },
  dateCreatedText: {
    fontSize: 11,
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 16,
  },
});

export default ChatexoMainScreen;
