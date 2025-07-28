import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, PlayCircle, FileText, HelpCircle, Download } from 'lucide-react';
import { LearningPath as LearningPathType, Module, Quiz } from '../types';

interface LearningPathProps {
  path: LearningPathType;
  onBack: () => void;
  onGenerateCertificate: (pathId: string) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ path, onBack, onGenerateCertificate }) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const completedModules = path.modules.filter(m => m.completed).length;
  const progress = (completedModules / path.modules.length) * 100;
  const isCompleted = completedModules === path.modules.length;

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayCircle;
      case 'reading': return FileText;
      case 'quiz': return HelpCircle;
      default: return FileText;
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    // Simulate module completion
    if (selectedModule) {
      selectedModule.completed = true;
    }
  };

  const handleModuleComplete = (moduleId: string) => {
    const moduleIndex = path.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      path.modules[moduleIndex].completed = true;
    }
  };

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedModule(null)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </button>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h1 className="text-2xl font-bold text-white mb-4">{selectedModule.title}</h1>
            <p className="text-gray-400 mb-6">{selectedModule.description}</p>

            {selectedModule.type === 'video' && (
              <div className="space-y-6">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-purple-400" />
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{selectedModule.content}</p>
                </div>
                <button
                  onClick={() => handleModuleComplete(selectedModule.id)}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
                >
                  Mark as Complete
                </button>
              </div>
            )}

            {selectedModule.type === 'quiz' && selectedModule.quiz && (
              <div className="space-y-6">
                {selectedModule.quiz.questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            quizAnswers[question.id] === optionIndex
                              ? 'bg-purple-600/20 border border-purple-500'
                              : 'bg-gray-600/30 hover:bg-gray-600/50 border border-transparent'
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            onChange={() => handleQuizAnswer(question.id, optionIndex)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            quizAnswers[question.id] === optionIndex
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-400'
                          }`}>
                            {quizAnswers[question.id] === optionIndex && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                    {quizSubmitted && (
                      <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {!quizSubmitted && (
                  <button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedModule.quiz.questions.length}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                )}

                {quizSubmitted && (
                  <button
                    onClick={() => handleModuleComplete(selectedModule.id)}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
                  >
                    Complete Module
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">{path.title}</h1>
              <p className="text-gray-400 text-lg mb-6">{path.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{path.duration}</span>
                </div>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs">
                  {path.level}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">{completedModules}/{path.modules.length} modules</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {isCompleted && (
                <button
                  onClick={() => onGenerateCertificate(path.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Certificate</span>
                </button>
              )}
            </div>

            {/* Modules */}
            <div className="space-y-4">
              {path.modules.map((module, index) => {
                const Icon = getModuleIcon(module.type);
                return (
                  <div
                    key={module.id}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-purple-500/30 transition-all cursor-pointer ${
                      module.completed ? 'border-green-500/30 bg-green-900/10' : ''
                    }`}
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        module.completed ? 'bg-green-600' : 'bg-gray-700'
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">{module.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{module.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="capitalize">{module.type}</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Course Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Enrolled Students</span>
                  <span className="text-white">{path.enrolledCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-white">{path.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{path.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;