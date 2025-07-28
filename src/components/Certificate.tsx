import React from 'react';
import { Download, Award, Calendar, User } from 'lucide-react';
import { Certificate as CertificateType } from '../types';

interface CertificateProps {
  certificate: CertificateType;
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ certificate, onClose }) => {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = 1200;
      canvas.height = 800;
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(1, '#111827');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Completion', canvas.width / 2, 150);
      
      // Course title
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#8b5cf6';
      ctx.fillText(certificate.pathTitle, canvas.width / 2, 250);
      
      // User name
      ctx.font = '32px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Awarded to: ${certificate.userId}`, canvas.width / 2, 350);
      
      // Date
      ctx.font = '24px Arial';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(
        `Completed on: ${certificate.completionDate.toLocaleDateString()}`,
        canvas.width / 2,
        420
      );
      
      // Grade
      ctx.fillText(`Final Grade: ${certificate.grade}%`, canvas.width / 2, 460);
      
      // Convert to download
      const link = document.createElement('a');
      link.download = `certificate-${certificate.pathTitle.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Certificate of Completion</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Certificate Content */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-4 border-purple-500/50 p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative z-10">
              {/* Award Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8">
                <Award className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Certificate of Completion
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>

              {/* Course Title */}
              <h2 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-8">
                {certificate.pathTitle}
              </h2>

              {/* Recipient */}
              <p className="text-xl text-gray-300 mb-2">This certifies that</p>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <User className="w-6 h-6 text-blue-400" />
                <span className="text-2xl font-bold text-white">{certificate.userId}</span>
              </div>

              <p className="text-lg text-gray-300 mb-8">
                has successfully completed the course requirements
              </p>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Completion Date</p>
                    <p className="text-white font-medium">
                      {certificate.completionDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Final Grade</p>
                    <p className="text-white font-medium">{certificate.grade}%</p>
                  </div>
                </div>
              </div>

              {/* Certificate ID */}
              <p className="text-xs text-gray-500 mb-8">
                Certificate ID: {certificate.id}
              </p>

              {/* Signature */}
              <div className="border-t border-gray-700 pt-6">
                <div className="text-center">
                  <div className="w-48 h-px bg-gray-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-400">LearnPath AI</p>
                  <p className="text-xs text-gray-500">Educational Platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Download Certificate</span>
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Download as PNG image to share on social media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;