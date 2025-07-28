import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { LearningPath } from '../types';

interface SearchSectionProps {
  onGeneratePath: (query: string) => void;
  generatedPath: LearningPath | null;
  isGenerating: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onGeneratePath, generatedPath, isGenerating }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onGeneratePath(searchQuery);
    }
  };

  const suggestions = [
    'Learn React and build modern web apps',
    'Master Python for data science',
    'Become a cybersecurity expert',
    'Full-stack development with MERN',
    'Machine learning fundamentals'
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI-Powered Learning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {' '}Paths
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us what you want to learn, and our AI will create a personalized learning path just for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="block w-full pl-12 pr-32 py-4 text-lg bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={isGenerating || !searchQuery.trim()}
              className="absolute inset-y-0 right-0 mr-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Generate</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(suggestion)}
              className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-full text-sm hover:bg-gray-700/50 hover:text-white transition-colors border border-gray-700/50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {generatedPath && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">AI Generated Path</h3>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-medium text-white mb-2">{generatedPath.title}</h4>
              <p className="text-gray-300 mb-4">{generatedPath.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{generatedPath.duration}</span>
                  <span>•</span>
                  <span>{generatedPath.level}</span>
                  <span>•</span>
                  <span>{generatedPath.modules.length} modules</span>
                </div>
                <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;