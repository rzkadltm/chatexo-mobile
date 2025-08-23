import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { rooms as allRooms } from '@/data/rooms';
import { useRooms } from '@/features/rooms/hooks/useRooms';
import { RoomItemProps } from "@/features/rooms/types/roomTypes";
import { getRelativeTime } from '@/utils/date';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

const ChatexoMainScreen = () => {
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const flatListRef = useRef<FlatList>(null);

  const { rooms, loading, hasMore, loadMore } = useRooms(allRooms, {
    pageSize: 10,
    fetchDelayMs: 1000,
  });

  const filteredRooms = rooms.filter((room) => {
    const lowerSearch = searchText.toLowerCase();
    return (
      room.title.toLowerCase().includes(lowerSearch) ||
      room.participants.some((p) =>
        p.name.toLowerCase().includes(lowerSearch)
      )
    );
  });

  const RoomItem: React.FC<RoomItemProps> = ({ room }) => (
    <ThemedView style={[styles.roomItem, { 
      shadowColor: colorScheme === 'dark' ? '#000' : '#000',
    }]}>
      <View style={styles.roomHeader}>
        <View style={styles.flagContainer}>
          {room.flags.map((flag, index) => (
            <Text key={index} style={styles.roomFlag}>{flag}</Text>
          ))}
        </View>
        <ThemedText style={[styles.dateCreatedText, { color: themeColors.tint }]}>
          {getRelativeTime(room.dateCreated)}
        </ThemedText>
      </View>

      <ThemedText style={styles.roomTitle} type="defaultSemiBold">
        {room.title}
      </ThemedText>

      <View style={styles.roomFooterAligned}>
        <View style={styles.leftContent}>
          <View style={styles.participantImages}>
            {room.participants.slice(0, 4).map((participant, index) => (
              <Image
                key={index}
                source={{ uri: participant.image }}
                style={[
                  styles.participantImage,
                  { borderColor: themeColors.background },
                  index > 0 && styles.spacedImage
                ]}
              />
            ))}

            {room.totalUsers > 4 && (
              <View style={[
                styles.participantImage, 
                styles.moreParticipants, 
                styles.spacedImage,
                { 
                  backgroundColor: colorScheme === 'dark' ? '#2D3748' : '#E2E8F0',
                  borderColor: themeColors.background 
                }
              ]}>
                <ThemedText style={[styles.moreParticipantsText, { color: themeColors.icon }]}>
                  +{room.totalUsers - 4}
                </ThemedText>
              </View>
            )}
          </View>
          <View style={styles.statusAndJoinRow}>
            <View style={styles.userStatusRow}>
              <ThemedText style={[styles.participantCount, { color: themeColors.icon }]}>
                {room.totalUsers} people
              </ThemedText>
            </View>

            <TouchableOpacity style={[styles.joinButton, { backgroundColor: themeColors.tint }]}>
              <Text style={[styles.joinButtonText, { 
                color: colorScheme === 'dark' ? themeColors.text : '#fff' 
              }]}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <ThemedView style={styles.header}>
        <ThemedText style={styles.logo} type="title">Chatexo</ThemedText>
        <View style={styles.searchAndCreateWrapper}>
          <View style={[styles.searchContainer, { 
            backgroundColor: colorScheme === 'dark' ? '#1F2122' : '#F7FAFC' 
          }]}>
            <Text style={[styles.searchIcon, { color: themeColors.icon }]}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: themeColors.text }]}
              placeholder="Search rooms or users..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={themeColors.icon}
            />
          </View>

          <TouchableOpacity style={[styles.createRoomButton, { backgroundColor: themeColors.tint }]} onPress={() => {}}>
            <Text style={[styles.createRoomButtonText, { 
              color: colorScheme === 'dark' ? themeColors.text : '#fff' 
            }]}>＋</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <FlatList
        ref={flatListRef}
        data={filteredRooms}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.roomList}
        renderItem={({ item }) => <RoomItem room={item} />}
        onEndReached={() => {
          if (!loading && hasMore) loadMore();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator 
              style={{ marginVertical: 16 }} 
              size="large" 
              color={themeColors.tint} 
            />
          ) : null
        }
      />
    </ThemedView>
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
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRoomButtonText: {
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
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
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
    marginBottom: 24,
  },
  spacedImage: {
    marginLeft: 8,
  },
  moreParticipants: {
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