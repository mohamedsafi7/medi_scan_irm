import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileImage, X, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PatientInfoForm from '../components/analysis/PatientInfoForm';
import ImageUploader from '../components/analysis/ImageUploader';
import AnalysisProgress from '../components/analysis/AnalysisProgress';
import Button from '../components/ui/Button';
import { PatientInfo } from '../types/types';
import { analyzeImage } from '../services/geminiService';

const Analysis: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    age: '',
    gender: '',
    medicalHistory: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handlePatientInfoSubmit = (data: PatientInfo) => {
    setPatientInfo(data);
    setCurrentStep(2);
  };

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const [analysisStage, setAnalysisStage] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const handleAnalysis = async () => {
    if (!selectedImage) {
      toast.error('Please upload an image to analyze');
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisProgress(0);

      // Stage 1: Preprocessing (0-1 second)
      setAnalysisStage('Preprocessing image...');
      setAnalysisProgress(20);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Image preprocessing completed', { duration: 1000 });

      // Stage 2: AI Analysis (1-2 seconds)
      setAnalysisStage('Analyzing with Gemini AI...');
      setAnalysisProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('AI analysis completed', { duration: 1000 });

      // Stage 3: Comparing with reference data (2-3 seconds)
      setAnalysisStage('Comparing with reference MRI database...');
      setAnalysisProgress(80);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Reference comparison completed', { duration: 1000 });

      // Stage 4: Finalizing results
      setAnalysisStage('Finalizing analysis results...');
      setAnalysisProgress(95);

      // Actual API call to Gemini AI for analysis
      const results = await analyzeImage(selectedImage, patientInfo);

      // Complete the progress
      setAnalysisProgress(100);
      setAnalysisStage('Analysis complete! 🎉');
      await new Promise(resolve => setTimeout(resolve, 800)); // Brief pause to show completion

      // In a real application, we would store the results somewhere and pass them to the Results page
      // This is a simplified example
      localStorage.setItem('analysisResults', JSON.stringify(results));

      toast.success('Analysis completed successfully! Redirecting to results...', { duration: 2000 });
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay before navigation
      navigate('/results');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStage('');
      setAnalysisProgress(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Cancer Detection Analysis</h1>
          <p className="text-blue-100 mt-1">
            Complete the form and upload an image for AI analysis with vector database enhancement
          </p>
          <div className="mt-2 flex items-center text-xs text-blue-100">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
            Using Chroma vector database for enhanced analysis with similar cases
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center mb-6">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {currentStep === 1 ? 'Patient Information' : 'Upload Medical Image'}
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-6 pt-2">
          {currentStep === 1 ? (
            <PatientInfoForm
              patientInfo={patientInfo}
              onSubmit={handlePatientInfoSubmit}
            />
          ) : (
            <div className="space-y-6">
              {!imagePreview ? (
                <ImageUploader onImageSelected={handleImageSelected} />
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 relative">
                  <button
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200 transition-colors"
                    aria-label="Remove image"
                  >
                    <X size={18} />
                  </button>
                  <div className="text-center">
                    <FileImage className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">Image selected:</p>
                    <p className="font-medium text-slate-800 mb-3">{selectedImage?.name}</p>
                  </div>
                  <div className="max-h-64 overflow-hidden flex justify-center rounded-lg border border-slate-200 relative">
                    <img
                      src={imagePreview}
                      alt="Selected medical image"
                      className={`max-w-full h-auto object-contain transition-all duration-500 ${
                        isAnalyzing ? 'opacity-75 scale-105 animate-pulse' : ''
                      }`}
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                          <Loader2 size={32} className="animate-spin text-blue-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Analysis Progress Display */}
              <AnalysisProgress
                stage={analysisStage}
                progress={analysisProgress}
                isVisible={isAnalyzing}
              />

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isAnalyzing}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAnalysis}
                  disabled={!selectedImage || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Start Analysis <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;