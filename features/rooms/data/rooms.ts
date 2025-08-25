export interface Participant {
  name: string;
  image: string;
}

export interface Room {
  id: number;
  title: string;
  flags: string[];
  participants: Participant[];
  totalUsers: number;
  status: string;
  dateCreated: string;
}

export const rooms: Room[] = [
  {
    id: 1,
    title: 'Practice Korean and Japanese',
    flags: ['🇰🇷', '🇯🇵'],
    participants: [
      {
        name: 'Alice Kim',
        image:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Kenji Tanaka',
        image:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'David Park',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Emma Wilson',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Sarah Olivia',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 5,
    status: 'Live now',
    dateCreated: '2025-08-06T09:15:00',
  },
  {
    id: 2,
    title: 'Beginner Chat',
    flags: ['🇫🇷', '🇪🇸'],
    participants: [
      {
        name: 'Pierre Dubois',
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Sofia Martinez',
        image:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '10 mins ago',
    dateCreated: '2025-08-05T09:15:00',
  },
  {
    id: 3,
    title: 'German Conversation Club',
    flags: ['🇩🇪', '🇬🇧'],
    participants: [
      {
        name: 'Hans Mueller',
        image:
          'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Lisa Thompson',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Michael Brown',
        image:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-07T09:15:00',
  },
  {
    id: 4,
    title: 'Spanish Speaking Practice',
    flags: ['🇪🇸', '🇲🇽'],
    participants: [
      {
        name: 'Isabella Garcia',
        image:
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Carlos Rodriguez',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Juan Lopez',
        image:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: '5 mins ago',
    dateCreated: '2025-08-08T09:15:00',
  },
  {
    id: 5,
    title: 'Japanese Language Exchange',
    flags: ['🇯🇵', '🇺🇸'],
    participants: [
      {
        name: 'Hiroshi Sato',
        image:
          'https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Jessica Davis',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Ryan Johnson',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Maya Patel',
        image:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 4,
    status: 'Live now',
    dateCreated: '2025-08-01T09:15:00',
  },
  {
    id: 6,
    title: 'Italian Coffee Chat',
    flags: ['🇮🇹', '🇬🇧'],
    participants: [
      {
        name: 'Marco Rossi',
        image:
          'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Anna Smith',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Grace Lee',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: '3 mins ago',
    dateCreated: '2025-08-01T09:15:00',
  },
  {
    id: 7,
    title: 'Mandarin Practice Group',
    flags: ['🇨🇳', '🇺🇸'],
    participants: [
      {
        name: 'Li Wei',
        image:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Tom Anderson',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '1 min ago',
    dateCreated: '2025-08-12T12:15:00',
  },
  {
    id: 8,
    title: 'French Breakfast Talk',
    flags: ['🇫🇷', '🇧🇪'],
    participants: [
      {
        name: 'Camille Leroy',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Julien Martin',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Emma Clarke',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-11T10:45:00',
  },
  {
    id: 9,
    title: 'Portuguese Learning Circle',
    flags: ['🇵🇹', '🇧🇷'],
    participants: [
      {
        name: 'Lucas Ferreira',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Maria Santos',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '15 mins ago',
    dateCreated: '2025-08-09T09:15:00',
  },
  {
    id: 10,
    title: 'Arabic Culture Chat',
    flags: ['🇸🇦', '🇪🇬'],
    participants: [
      {
        name: 'Ahmed Hassan',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Fatima Noor',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Youssef Ali',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-12T14:20:00',
  },
  {
    id: 11,
    title: 'Russian Conversation Cafe',
    flags: ['🇷🇺', '🇺🇦'],
    participants: [
      {
        name: 'Olga Ivanova',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Dmitry Petrov',
        image:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '7 mins ago',
    dateCreated: '2025-08-12T08:10:00',
  },
  {
    id: 12,
    title: 'Hindi & Urdu Exchange',
    flags: ['🇮🇳', '🇵🇰'],
    participants: [
      {
        name: 'Ayesha Khan',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Ravi Sharma',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Imran Qureshi',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-11T20:00:00',
  },
  {
    id: 13,
    title: 'Greek Mythology Discussion',
    flags: ['🇬🇷', '🇨🇾'],
    participants: [
      {
        name: 'Nikos Papadopoulos',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Eleni Georgiou',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '2 mins ago',
    dateCreated: '2025-08-13T09:50:00',
  },
  {
    id: 14,
    title: 'Dutch Language Meet',
    flags: ['🇳🇱', '🇧🇪'],
    participants: [
      {
        name: 'Sven Janssen',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Lotte Vermeer',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Tom Bakker',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-10T18:30:00',
  },
  {
    id: 15,
    title: 'Korean Drama Fans Chat',
    flags: ['🇰🇷', '🇺🇸'],
    participants: [
      {
        name: 'Minji Lee',
        image:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'James Wilson',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '25 mins ago',
    dateCreated: '2025-08-13T08:25:00',
  },
  {
    id: 16,
    title: 'Polish Learning Hub',
    flags: ['🇵🇱', '🇬🇧'],
    participants: [
      {
        name: 'Katarzyna Nowak',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Piotr Kowalski',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: 'Live now',
    dateCreated: '2025-08-13T07:00:00',
  },
  {
    id: 17,
    title: 'Turkish Conversation Group',
    flags: ['🇹🇷', '🇨🇦'],
    participants: [
      {
        name: 'Ahmet Kaya',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Leyla Demir',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'John Roberts',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: '8 mins ago',
    dateCreated: '2025-08-12T22:10:00',
  },
  {
    id: 18,
    title: 'Finnish Language Lounge',
    flags: ['🇫🇮', '🇸🇪'],
    participants: [
      {
        name: 'Mikko Virtanen',
        image:
          'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Sara Laaksonen',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: 'Live now',
    dateCreated: '2025-08-13T06:00:00',
  },
  {
    id: 19,
    title: 'Thai & English Exchange',
    flags: ['🇹🇭', '🇬🇧'],
    participants: [
      {
        name: 'Ananda Chai',
        image:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Lucy Green',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '12 mins ago',
    dateCreated: '2025-08-13T05:40:00',
  },
  {
    id: 20,
    title: 'Hebrew Speaking Corner',
    flags: ['🇮🇱', '🇺🇸'],
    participants: [
      {
        name: 'David Cohen',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Noa Levi',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: 'Live now',
    dateCreated: '2025-08-13T05:10:00',
  },
  {
    id: 21,
    title: 'Swedish fika Chat',
    flags: ['🇸🇪', '🇫🇮'],
    participants: [
      {
        name: 'Erik Larsson',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Anna Berg',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Oskar Nilsson',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: '3 mins ago',
    dateCreated: '2025-08-13T04:55:00',
  },
  {
    id: 22,
    title: 'Vietnamese & English Hangout',
    flags: ['🇻🇳', '🇺🇸'],
    participants: [
      {
        name: 'Nguyen Thi Mai',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Chris Adams',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: '20 mins ago',
    dateCreated: '2025-08-13T04:30:00',
  },
  {
    id: 23,
    title: 'Norwegian Practice Room',
    flags: ['🇳🇴', '🇬🇧'],
    participants: [
      {
        name: 'Lars Johansen',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Ingrid Olsen',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Mark Evans',
        image:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: 'Live now',
    dateCreated: '2025-08-13T04:00:00',
  },
  {
    id: 24,
    title: 'Persian Poetry and Talk',
    flags: ['🇮🇷', '🇺🇸'],
    participants: [
      {
        name: 'Shirin Azadi',
        image:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Amir Reza',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Sophia Carter',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 3,
    status: '5 mins ago',
    dateCreated: '2025-08-13T03:40:00',
  },
  {
    id: 25,
    title: 'Sign Language Social',
    flags: ['🤟', '🇺🇸'],
    participants: [
      {
        name: 'Alex Morgan',
        image:
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
      },
      {
        name: 'Jamie Lee',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      },
    ],
    totalUsers: 2,
    status: 'Live now',
    dateCreated: '2025-08-13T03:15:00',
  },
];
