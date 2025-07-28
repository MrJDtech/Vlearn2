import React, { useState } from 'react';
import Header from './components/Header';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import FriendRequests from './components/FriendRequests';
import SearchSection from './components/SearchSection';
import PopularPaths from './components/PopularPaths';
import LearningPath from './components/LearningPath';
import Chat from './components/Chat';
import Certificate from './components/Certificate';
import { mockLearningPaths, mockUsers, mockMessages, mockFriendRequests } from './utils/mockData';
import { LearningPath as LearningPathType, User, Message, Certificate as CertificateType, AuthUser, FriendRequest } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPath, setSelectedPath] = useState<LearningPathType | null>(null);
  const [generatedPath, setGeneratedPath] = useState<LearningPathType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showCertificate, setShowCertificate] = useState<CertificateType | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(mockFriendRequests);
  const [friends, setFriends] = useState<User[]>(mockUsers);

  const handleSignIn = (email: string, password: string) => {
    // Simulate authentication
    const user: AuthUser = {
      id: 'current-user',
      name: 'John Doe',
      email,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isOnline: true,
      joinDate: new Date()
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Simulate registration
    const user: AuthUser = {
      id: 'current-user',
      name,
      email,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isOnline: true,
      joinDate: new Date()
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSocialSignIn = (provider: string) => {
    // Simulate social authentication
    const user: AuthUser = {
      id: 'current-user',
      name: 'John Doe',
      email: `user@${provider}.com`,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isOnline: true,
      joinDate: new Date()
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('home');
  };

  const handleGeneratePath = async (query: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock learning path based on the query
    const generatedPath: LearningPathType = {
      id: 'generated-' + Date.now(),
      title: `Personalized: ${query}`,
      description: `A custom learning path generated specifically for "${query}". This comprehensive course covers all essential topics and practical applications.`,
      duration: '8-12 weeks',
      level: 'Intermediate',
      enrolledCount: 0,
      rating: 5.0,
      category: 'AI Generated',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
      modules: [
        {
          id: 'gen-1',
          title: 'Fundamentals',
          description: 'Core concepts and foundations',
          duration: '2 weeks',
          completed: false,
          type: 'video'
        },
        {
          id: 'gen-2',
          title: 'Practical Applications',
          description: 'Hands-on projects and exercises',
          duration: '3 weeks',
          completed: false,
          type: 'reading'
        },
        {
          id: 'gen-3',
          title: 'Advanced Topics',
          description: 'Deep dive into specialized areas',
          duration: '2 weeks',
          completed: false,
          type: 'quiz',
          quiz: {
            id: 'gen-quiz',
            questions: [
              {
                id: 'gq1',
                question: 'What is the most important aspect of this learning path?',
                options: ['Theory', 'Practice', 'Both theory and practice', 'Testing'],
                correctAnswer: 2,
                explanation: 'A balanced approach combining theory and practice yields the best learning outcomes.'
              }
            ]
          }
        }
      ]
    };
    
    setGeneratedPath(generatedPath);
    setIsGenerating(false);
  };

  const handleSendMessage = (receiverId: string, content: string, type: 'text' | 'voice', voiceUrl?: string, duration?: number) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId,
      content,
      type,
      timestamp: new Date(),
      voiceUrl,
      duration
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate response (in a real app, this would come from WebSocket)
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: receiverId,
        receiverId: 'current-user',
        content: type === 'voice' ? 'Thanks for the voice message!' : 'Thanks for your message!',
        type: 'text',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleGenerateCertificate = (pathId: string) => {
    const path = mockLearningPaths.find(p => p.id === pathId);
    if (path) {
      const certificate: CertificateType = {
        id: 'cert-' + Date.now(),
        userId: 'John Doe',
        pathId,
        pathTitle: path.title,
        completionDate: new Date(),
        grade: 95
      };
      setShowCertificate(certificate);
    }
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      // Add to friends list
      const newFriend: User = {
        id: request.senderId,
        name: request.senderName,
        avatar: request.senderAvatar,
        isOnline: Math.random() > 0.5
      };
      setFriends(prev => [...prev, newFriend]);
      
      // Update request status
      setFriendRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: 'accepted' as const } : req
        )
      );
    }
  };

  const handleRejectFriendRequest = (requestId: string) => {
    setFriendRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );
  };

  const handleSendFriendRequest = (userId: string) => {
    // In a real app, this would send a request to the backend
    console.log('Sending friend request to user:', userId);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const pendingRequestCount = friendRequests.filter(req => req.status === 'pending').length;

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authMode === 'signin') {
      return (
        <SignIn
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setAuthMode('signup')}
          onGoogleSignIn={() => handleSocialSignIn('google')}
          onGithubSignIn={() => handleSocialSignIn('github')}
        />
      );
    } else {
      return (
        <SignUp
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setAuthMode('signin')}
          onGoogleSignIn={() => handleSocialSignIn('google')}
          onGithubSignIn={() => handleSocialSignIn('github')}
        />
      );
    }
  }

  const renderContent = () => {
    if (selectedPath) {
      return (
        <LearningPath
          path={selectedPath}
          onBack={() => setSelectedPath(null)}
          onGenerateCertificate={handleGenerateCertificate}
        />
      );
    }

    switch (activeTab) {
      case 'home':
      case 'learn':
        return (
          <div className="min-h-screen bg-gray-900">
            <SearchSection
              onGeneratePath={handleGeneratePath}
              generatedPath={generatedPath}
              isGenerating={isGenerating}
            />
            <PopularPaths
              paths={mockLearningPaths}
              onSelectPath={setSelectedPath}
            />
          </div>
        );
      case 'friends':
        return (
          <FriendRequests
            onBack={() => setActiveTab('home')}
            friendRequests={friendRequests}
            friends={friends}
            onAcceptRequest={handleAcceptFriendRequest}
            onRejectRequest={handleRejectFriendRequest}
            onSendRequest={handleSendFriendRequest}
          />
        );
      case 'certificates':
        return (
          <div className="min-h-screen bg-gray-900 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Your Certificates</h2>
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-12">
                <div className="text-gray-400">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    📜
                  </div>
                  <p className="text-lg mb-2">No certificates yet</p>
                  <p className="text-sm">Complete courses to earn certificates!</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-900 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{currentUser?.name || 'User'}</h1>
                    <p className="text-gray-400">{currentUser?.email}</p>
                    <p className="text-gray-400">Software Developer & Lifelong Learner</p>
                    <p className="text-sm text-gray-500">
                      Member since {currentUser?.joinDate?.toLocaleDateString() || 'Recently'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-purple-400">3</h3>
                    <p className="text-gray-400">Courses Enrolled</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-green-400">1</h3>
                    <p className="text-gray-400">Courses Completed</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-400">42h</h3>
                    <p className="text-gray-400">Learning Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleChat={toggleChat}
        isChatOpen={isChatOpen}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        friendRequestCount={pendingRequestCount}
      />
      
      <main className={`transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
        {renderContent()}
      </main>

      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        users={mockUsers}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      {showCertificate && (
        <Certificate
          certificate={showCertificate}
          onClose={() => setShowCertificate(null)}
        />
      )}
    </div>
  );
}

export default App;