import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Play, Pause, X, Users } from 'lucide-react';
import { User, Message } from '../types';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  messages: Message[];
  onSendMessage: (receiverId: string, content: string, type: 'text' | 'voice', voiceUrl?: string, duration?: number) => void;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose, users, messages, onSendMessage }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const userMessages = messages.filter(m => 
    selectedUser && (
      (m.senderId === selectedUser.id && m.receiverId === 'current-user') ||
      (m.senderId === 'current-user' && m.receiverId === selectedUser.id)
    )
  );

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      onSendMessage(selectedUser.id, newMessage, 'text');
      setNewMessage('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (selectedUser) {
          onSendMessage(selectedUser.id, 'Voice message', 'voice', audioUrl, recordingTime);
        }
        
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const toggleAudioPlayback = (audioUrl: string, messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
    } else {
      const audio = new Audio(audioUrl);
      audio.play();
      setPlayingAudio(messageId);
      audio.onended = () => setPlayingAudio(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-800 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Users List */}
        <div className="w-32 border-r border-gray-800 overflow-y-auto">
          <div className="p-2">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Friends</h4>
            <div className="space-y-1">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-2 rounded-lg text-left transition-colors ${
                    selectedUser?.id === user.id
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs font-medium truncate">{user.name.split(' ')[0]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-white">{selectedUser.name}</h4>
                    <p className={`text-xs ${selectedUser.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                      {selectedUser.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {userMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.senderId === 'current-user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      {message.type === 'text' ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAudioPlayback(message.voiceUrl!, message.id)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                          >
                            {playingAudio === message.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="text-xs">Voice message</p>
                            {message.duration && (
                              <p className="text-xs opacity-70">{formatTime(message.duration)}</p>
                            )}
                          </div>
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-800">
                {isRecording ? (
                  <div className="flex items-center space-x-3 p-3 bg-red-600/20 rounded-lg border border-red-500/30">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm">Recording... {formatTime(recordingTime)}</span>
                    <button
                      onClick={stopRecording}
                      className="ml-auto p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <MicOff className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={startRecording}
                      className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Select a friend to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;