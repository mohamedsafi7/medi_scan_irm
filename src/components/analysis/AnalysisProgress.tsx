import React from 'react';
import { Loader2, Brain, Database, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  stage: string;
  progress: number;
  isVisible: boolean;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ stage, progress, isVisible }) => {
  if (!isVisible) return null;

  const getStageIcon = () => {
    if (stage.includes('Preprocessing')) {
      return <Loader2 size={24} className="animate-spin text-blue-600" />;
    } else if (stage.includes('Gemini AI')) {
      return <Brain size={24} className="text-purple-600 animate-pulse" />;
    } else if (stage.includes('reference') || stage.includes('database')) {
      return <Database size={24} className="text-green-600 animate-pulse" />;
    } else if (stage.includes('Finalizing')) {
      return <CheckCircle size={24} className="text-emerald-600" />;
    }
    return <Loader2 size={24} className="animate-spin text-blue-600" />;
  };

  const getStageStyles = () => {
    if (stage.includes('Preprocessing')) {
      return {
        container: 'bg-blue-50 border-blue-200',
        header: 'text-blue-800',
        progressBg: 'bg-blue-200',
        progressBar: 'bg-gradient-to-r from-blue-500 to-blue-600',
        text: 'text-blue-700',
        subtext: 'text-blue-600',
        dots: 'bg-blue-500',
        details: 'bg-blue-100 border-blue-200 text-blue-700'
      };
    } else if (stage.includes('Gemini AI')) {
      return {
        container: 'bg-purple-50 border-purple-200',
        header: 'text-purple-800',
        progressBg: 'bg-purple-200',
        progressBar: 'bg-gradient-to-r from-purple-500 to-purple-600',
        text: 'text-purple-700',
        subtext: 'text-purple-600',
        dots: 'bg-purple-500',
        details: 'bg-purple-100 border-purple-200 text-purple-700'
      };
    } else if (stage.includes('reference') || stage.includes('database')) {
      return {
        container: 'bg-green-50 border-green-200',
        header: 'text-green-800',
        progressBg: 'bg-green-200',
        progressBar: 'bg-gradient-to-r from-green-500 to-green-600',
        text: 'text-green-700',
        subtext: 'text-green-600',
        dots: 'bg-green-500',
        details: 'bg-green-100 border-green-200 text-green-700'
      };
    } else if (stage.includes('Finalizing')) {
      return {
        container: 'bg-emerald-50 border-emerald-200',
        header: 'text-emerald-800',
        progressBg: 'bg-emerald-200',
        progressBar: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        text: 'text-emerald-700',
        subtext: 'text-emerald-600',
        dots: 'bg-emerald-500',
        details: 'bg-emerald-100 border-emerald-200 text-emerald-700'
      };
    }
    // Default blue
    return {
      container: 'bg-blue-50 border-blue-200',
      header: 'text-blue-800',
      progressBg: 'bg-blue-200',
      progressBar: 'bg-gradient-to-r from-blue-500 to-blue-600',
      text: 'text-blue-700',
      subtext: 'text-blue-600',
      dots: 'bg-blue-500',
      details: 'bg-blue-100 border-blue-200 text-blue-700'
    };
  };

  const styles = getStageStyles();

  return (
    <div className={`${styles.container} border rounded-lg p-6 mb-6 transition-all duration-500`}>
      <div className="text-center">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-4">
          {getStageIcon()}
          <h3 className={`text-lg font-semibold ${styles.header} ml-3`}>
            AI Analysis in Progress
          </h3>
        </div>

        {/* Progress Bar Container */}
        <div className="relative mb-4">
          <div className={`w-full ${styles.progressBg} rounded-full h-4 overflow-hidden`}>
            <div
              className={`${styles.progressBar} h-4 rounded-full transition-all duration-700 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Progress percentage overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-bold ${styles.header} drop-shadow-sm`}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Current Stage Description */}
        <div className="space-y-2">
          <p className={`${styles.text} font-medium text-base`}>{stage}</p>

          {/* Stage-specific descriptions */}
          <p className={`text-sm ${styles.subtext}`}>
            {stage.includes('Preprocessing') && 'Optimizing image quality and format for analysis...'}
            {stage.includes('Gemini AI') && 'Advanced AI model processing medical imaging data...'}
            {stage.includes('reference') && 'Cross-referencing with medical database of similar cases...'}
            {stage.includes('Finalizing') && 'Compiling comprehensive analysis report...'}
          </p>
        </div>

        {/* Animated Processing Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className={`w-3 h-3 ${styles.dots} rounded-full animate-bounce`}></div>
          <div
            className={`w-3 h-3 ${styles.dots} rounded-full animate-bounce`}
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className={`w-3 h-3 ${styles.dots} rounded-full animate-bounce`}
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Technical Details (Optional) */}
        {progress > 50 && (
          <div className={`mt-4 p-3 ${styles.details} rounded-md border`}>
            <p className="text-xs">
              🔬 Analyzing tissue patterns and density variations<br/>
              🧠 Applying deep learning algorithms for pattern recognition<br/>
              📊 Generating confidence metrics and similarity scores
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisProgress;
