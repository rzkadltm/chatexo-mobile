export interface Room {
    id: number;
    title: string;
    flags: string[];
    participants: { name: string; image: string }[];
    totalUsers: number;
    status: string;
    dateCreated: string;
}

export interface RoomItemProps {
    room: Room;
}