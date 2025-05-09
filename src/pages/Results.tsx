import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Download, Share2, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { AnalysisResult } from '../types/types';
import SimilarCasesDisplay from '../components/SimilarCasesDisplay';
import DownloadReport from '../components/results/DownloadReport';
import AnalysisChart from '../components/results/AnalysisChart';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, we would fetch the results from an API or state management
    // This is a simplified example using localStorage
    const storedResults = localStorage.getItem('analysisResults');

    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }

    setLoading(false);
  }, []);

  // Download functionality is now handled by the DownloadReport component

  const handleShareResults = () => {
    // In a real application, we would implement sharing functionality
    toast.success('Share link copied to clipboard');
  };

  // Navigation is handled directly in the button onClick

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
          <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Analysis Results Found</h2>
          <p className="text-slate-600 mb-6">
            It seems you haven't completed an analysis yet. Please start a new analysis to see results.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/analysis')}
          >
            Start New Analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Analysis Results</h1>
          <p className="text-blue-100 mt-1">
            AI-generated cancer detection analysis
          </p>
        </div>

        {/* Results Content */}
        <div className="p-6">
          {/* Patient Info Summary */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium">{results.patientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Age</p>
                <p className="font-medium">{results.patientInfo.age}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-medium">{results.patientInfo.gender}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Medical History</p>
                <p className="font-medium">{results.patientInfo.medicalHistory || 'None provided'}</p>
              </div>
            </div>
          </div>

          {/* Analysis Result */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-slate-800">Analysis Result</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                results.prediction === 'Positive'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {results.prediction}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium text-slate-700 mb-2">
                Confidence Score
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({Math.round(results.confidenceScore * 100)}% confidence in {results.prediction.toLowerCase()} result)
                </span>
              </h3>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    results.prediction === 'Positive'
                      ? (results.confidenceScore > 0.7 ? 'bg-red-500' : 'bg-yellow-500')
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${results.confidenceScore * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mt-1">
                <span>0%</span>
                <span className="font-medium">{Math.round(results.confidenceScore * 100)}%</span>
                <span>100%</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {results.prediction === 'Positive'
                  ? (results.confidenceScore > 0.7
                    ? 'High confidence in positive finding. Immediate medical consultation recommended.'
                    : 'Moderate confidence in positive finding. Medical follow-up advised.')
                  : (results.confidenceScore < 0.3
                    ? 'High confidence in negative finding. Routine follow-up recommended.'
                    : 'Moderate confidence in negative finding. Consider follow-up testing.')}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Detailed Analysis</h2>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700 whitespace-pre-line">{results.detailedAnalysis}</p>
            </div>

            {/* Direct Context Injection Badge */}
            <div className="mt-3 flex items-center text-xs text-slate-500 bg-blue-50 p-2 rounded-md inline-block">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              Analysis enhanced with direct context injection of cancer data examples
            </div>

            {/* Debug Info - Confidence Extraction */}
            <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs text-gray-500 border border-gray-200">
              <div className="font-medium">Debug Info:</div>

              {/* Show all percentage values found in the text */}
              <div className="mt-1">
                <span className="font-medium">All percentages in text:</span>{' '}
                {(() => {
                  const percentages = results.detailedAnalysis.match(/(\d+(?:\.\d+)?)[%]/g) || [];
                  return percentages.length > 0
                    ? percentages.map((p, i) => <span key={i} className="mr-2">{p}</span>)
                    : 'None found';
                })()}
              </div>

              {/* Show CONFIDENCE section if found */}
              <div className="mt-1">
                <span className="font-medium">CONFIDENCE section:</span>{' '}
                {(() => {
                  const confidenceMatch = results.detailedAnalysis.match(/CONFIDENCE:?\s*(\d+(?:\.\d+)?)[%]?/i);
                  return confidenceMatch
                    ? confidenceMatch[1] + '%'
                    : 'Not found';
                })()}
              </div>

              {/* Show confidence level if found */}
              <div className="mt-1">
                <span className="font-medium">Confidence level mention:</span>{' '}
                {(() => {
                  const confidenceLevelMatch = results.detailedAnalysis.match(/confidence(?:\s+level)?(?:\s+is)?(?:\s+at)?[:\s]+(\d+(?:\.\d+)?)[%]?/i);
                  return confidenceLevelMatch
                    ? confidenceLevelMatch[1] + '%'
                    : 'Not found';
                })()}
              </div>

              <div className="mt-1 font-medium text-blue-600">
                Extracted confidence used in UI: {Math.round(results.confidenceScore * 100)}%
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Recommendations</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {results.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-700">
              <strong>Important Disclaimer:</strong> This analysis is provided for informational purposes only and should not replace professional medical advice. Please consult with qualified healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>

          {/* Visualization Section */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <BarChart size={20} className="text-blue-600" />
                Data Visualization
              </h2>
            </div>
            <AnalysisChart results={results} />
          </div>

          {/* Similar Cases Display */}
          <SimilarCasesDisplay similarCases={results.similarCases} />

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/analysis')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} /> New Analysis
            </Button>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={handleShareResults}
                className="flex items-center gap-2"
              >
                <Share2 size={18} /> Share
              </Button>
              <DownloadReport results={results} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;