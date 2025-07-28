import { LearningPath, User, Message } from '../types';
import { FriendRequest } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: true },
  { id: '2', name: 'Bob Smith', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: false },
  { id: '3', name: 'Carol Davis', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: true },
  { id: '4', name: 'David Wilson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: true },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Full Stack Development',
    description: 'Master both frontend and backend development with React, Node.js, and databases.',
    duration: '12 weeks',
    level: 'Intermediate',
    enrolledCount: 15420,
    rating: 4.8,
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    modules: [
      {
        id: '1-1',
        title: 'React Fundamentals',
        description: 'Learn the basics of React including components, props, and state.',
        duration: '2 weeks',
        completed: false,
        type: 'video',
        content: 'Introduction to React concepts and component lifecycle...'
      },
      {
        id: '1-2',
        title: 'Node.js Backend',
        description: 'Build robust backend APIs with Node.js and Express.',
        duration: '3 weeks',
        completed: false,
        type: 'video'
      },
      {
        id: '1-3',
        title: 'Database Integration',
        description: 'Connect your application to databases using MongoDB and PostgreSQL.',
        duration: '2 weeks',
        completed: false,
        type: 'quiz',
        quiz: {
          id: 'q1',
          questions: [
            {
              id: 'q1-1',
              question: 'What is the purpose of middleware in Express.js?',
              options: [
                'To handle HTTP routes',
                'To execute code during request-response cycle',
                'To connect to databases',
                'To render HTML templates'
              ],
              correctAnswer: 1,
              explanation: 'Middleware functions execute during the request-response cycle and can modify req/res objects.'
            }
          ]
        }
      }
    ]
  },
  {
    id: '2',
    title: 'AI with Python',
    description: 'Dive into artificial intelligence and machine learning using Python and popular frameworks.',
    duration: '16 weeks',
    level: 'Advanced',
    enrolledCount: 8930,
    rating: 4.9,
    category: 'Artificial Intelligence',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    modules: [
      {
        id: '2-1',
        title: 'Python for AI',
        description: 'Master Python fundamentals for AI development.',
        duration: '3 weeks',
        completed: false,
        type: 'video'
      },
      {
        id: '2-2',
        title: 'Machine Learning Basics',
        description: 'Understanding ML algorithms and implementations.',
        duration: '4 weeks',
        completed: false,
        type: 'reading'
      }
    ]
  },
  {
    id: '3',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts, ethical hacking, and network security.',
    duration: '10 weeks',
    level: 'Beginner',
    enrolledCount: 12100,
    rating: 4.7,
    category: 'Security',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
    modules: []
  },
  {
    id: '4',
    title: 'React & Node.js',
    description: 'Build modern web applications with React frontend and Node.js backend.',
    duration: '8 weeks',
    level: 'Intermediate',
    enrolledCount: 18750,
    rating: 4.6,
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    modules: []
  },
  {
    id: '5',
    title: 'Data Science Mastery',
    description: 'Comprehensive data science course covering statistics, visualization, and predictive modeling.',
    duration: '14 weeks',
    level: 'Advanced',
    enrolledCount: 9640,
    rating: 4.8,
    category: 'Data Science',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    modules: []
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'current-user',
    content: 'Hey! How\'s your Full Stack Development course going?',
    type: 'text',
    timestamp: new Date('2024-01-20T10:30:00')
  },
  {
    id: '2',
    senderId: 'current-user',
    receiverId: '1',
    content: 'It\'s going great! Just finished the React fundamentals module.',
    type: 'text',
    timestamp: new Date('2024-01-20T10:32:00')
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 'current-user',
    content: 'That\'s awesome! The Node.js section is really interesting too.',
    type: 'text',
    timestamp: new Date('2024-01-20T10:35:00')
  }
];

export const mockFriendRequests: FriendRequest[] = [
  {
    id: '1',
    senderId: '5',
    receiverId: 'current-user',
    senderName: 'Emma Wilson',
    senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'pending',
    createdAt: new Date('2024-01-19T14:30:00')
  },
  {
    id: '2',
    senderId: '6',
    receiverId: 'current-user',
    senderName: 'Michael Brown',
    senderAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'pending',
    createdAt: new Date('2024-01-18T09:15:00')
  }
];