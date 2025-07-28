import React from 'react';
import { ArrowLeft, UserPlus, Check, X, Search, Users } from 'lucide-react';
import { FriendRequest, User } from '../types';

interface FriendRequestsProps {
  onBack: () => void;
  friendRequests: FriendRequest[];
  friends: User[];
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onSendRequest: (userId: string) => void;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({
  onBack,
  friendRequests,
  friends,
  onAcceptRequest,
  onRejectRequest,
  onSendRequest
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'requests' | 'friends' | 'search'>('requests');

  const pendingRequests = friendRequests.filter(req => req.status === 'pending');

  // Mock users for search (in real app, this would come from API)
  const searchResults = [
    { id: '7', name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: true },
    { id: '8', name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: false },
    { id: '9', name: 'Maria Garcia', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150', isOnline: true },
  ].filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !friends.some(friend => friend.id === user.id)
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Friends & Requests</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-700/30 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'requests'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Requests ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('friends')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'friends'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Friends ({friends.length})
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'search'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Find Friends
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No pending requests</h3>
                    <p className="text-gray-400">Friend requests will appear here</p>
                  </div>
                ) : (
                  pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.senderAvatar}
                          alt={request.senderName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-white">{request.senderName}</h3>
                          <p className="text-sm text-gray-400">
                            Sent {request.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onAcceptRequest(request.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRejectRequest(request.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'friends' && (
              <div className="space-y-4">
                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No friends yet</h3>
                    <p className="text-gray-400">Start connecting with other learners</p>
                  </div>
                ) : (
                  friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full"
                          />
                          {friend.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{friend.name}</h3>
                          <p className={`text-sm ${friend.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                            {friend.isOnline ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Message
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'search' && (
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for users..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-4">
                  {searchQuery && searchResults.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No users found matching "{searchQuery}"</p>
                    </div>
                  ) : (
                    searchResults.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            {user.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{user.name}</h3>
                            <p className={`text-sm ${user.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                              {user.isOnline ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onSendRequest(user.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Add Friend</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;