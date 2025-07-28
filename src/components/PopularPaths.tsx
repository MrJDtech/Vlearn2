import React from 'react';
import { Clock, Users, Star, BookOpen, ArrowRight } from 'lucide-react';
import { LearningPath } from '../types';

interface PopularPathsProps {
  paths: LearningPath[];
  onSelectPath: (path: LearningPath) => void;
}

const PopularPaths: React.FC<PopularPathsProps> = ({ paths, onSelectPath }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Web Development': 'bg-blue-500',
      'Artificial Intelligence': 'bg-purple-500',
      'Security': 'bg-red-500',
      'Data Science': 'bg-green-500',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Learning Paths
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of learners in our most popular courses designed by industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path) => (
            <div
              key={path.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 ${getCategoryColor(path.category)} text-white text-xs font-medium rounded-full`}>
                    {path.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {path.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {path.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {path.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{path.enrolledCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{path.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{path.modules.length} modules</span>
                  </div>
                  <button
                    onClick={() => onSelectPath(path)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm hover:from-purple-700 hover:to-blue-700 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/25"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPaths;