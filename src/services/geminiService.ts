import { GoogleGenerativeAI } from '@google/generative-ai';
import { PatientInfo, AnalysisResult, SimilarCase } from '../types/types';
import { querySimilarCases } from './chromaService';
import { loadCancerData, isDataLoaded } from './dataLoaderService';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Initialize cancer data for analysis
 */
export const initializeCancerData = async (): Promise<void> => {
  try {
    const dataLoaded = await isDataLoaded();
    if (!dataLoaded) {
      console.log('Loading cancer data...');
      await loadCancerData();
    }
    console.log('Cancer data initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize cancer data, continuing without it:', error);
  }
};

/**
 * Analyze a medical image using Gemini AI directly
 * @param image Medical image file
 * @param patientInfo Patient information
 * @returns Analysis result
 */
export const analyzeImage = async (
  image: File,
  patientInfo: PatientInfo
): Promise<AnalysisResult> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }

    console.log('Analyzing image with Gemini AI...');

    // Convert image to base64
    const imageData = await fileToGenerativePart(image);

    // Get similar cases from ChromaDB
    const similarCases = await querySimilarCases(patientInfo);

    // Create detailed prompt for medical analysis
    const prompt = createMedicalAnalysisPrompt(patientInfo, similarCases);

    // Analyze with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const analysisText = response.text();

    console.log('Received analysis from Gemini AI');

    // Parse the analysis result
    const parsedResult = parseGeminiResponse(analysisText, patientInfo, similarCases);

    return parsedResult;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Convert file to format suitable for Gemini AI
 */
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
}

/**
 * Create detailed medical analysis prompt
 */
function createMedicalAnalysisPrompt(patientInfo: PatientInfo, similarCases: SimilarCase[]): string {
  const similarCasesText = similarCases.length > 0
    ? `\n\nSimilar cases for reference:\n${similarCases.map(c => `- ${c.diagnosis}: ${c.data}`).join('\n')}`
    : '';

  return `You are an expert radiologist specializing in breast MRI analysis. Analyze this medical image and provide a comprehensive assessment.

Patient Information:
- Name: ${patientInfo.name}
- Age: ${patientInfo.age}
- Gender: ${patientInfo.gender}
- Medical History: ${patientInfo.medicalHistory || 'None provided'}

${similarCasesText}

Please provide your analysis in the following JSON format:
{
  "prediction": "Positive" or "Negative",
  "confidenceScore": 0.0-1.0,
  "detailedAnalysis": "Detailed medical analysis of the image",
  "keyMetrics": {
    "Tissue Density": 0-100,
    "Border Irregularity": 0-100,
    "Contrast Enhancement": 0-100,
    "Size (relative)": 0-100,
    "Symmetry Disruption": 0-100
  },
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "is_valid_mri": true/false
}

Focus on:
1. Image quality and whether it appears to be a valid breast MRI
2. Tissue characteristics and any suspicious areas
3. Comparison with normal breast tissue patterns
4. Risk assessment based on visible features
5. Appropriate follow-up recommendations

Remember: This is for educational purposes only and should not replace professional medical diagnosis.`;
}

/**
 * Parse Gemini AI response into structured format
 */
function parseGeminiResponse(analysisText: string, patientInfo: PatientInfo, similarCases: SimilarCase[]): AnalysisResult {
  try {
    // Try to extract JSON from the response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      // Generate image annotations based on key metrics
      const imageAnnotations = parsed.keyMetrics ?
        Object.entries(parsed.keyMetrics).map(([key, value], index) => ({
          x: 20 + (index % 3) * 30,
          y: 20 + Math.floor(index / 3) * 25,
          width: 25,
          height: 20,
          label: `${key}: ${value}`
        })) : undefined;

      return {
        patientInfo,
        prediction: parsed.prediction === 'Positive' ? 'Positive' : 'Negative',
        confidenceScore: parsed.confidenceScore || 0.5,
        detailedAnalysis: parsed.detailedAnalysis || analysisText,
        recommendations: parsed.recommendations || ['Consult with a medical professional for proper diagnosis'],
        similarCases: similarCases.slice(0, 3),
        imageAnnotations,
        is_valid_mri: parsed.is_valid_mri !== false
      };
    }
  } catch (error) {
    console.warn('Failed to parse JSON response, using fallback:', error);
  }

  // Fallback parsing if JSON extraction fails
  const prediction = analysisText.toLowerCase().includes('positive') ||
                    analysisText.toLowerCase().includes('malignant') ||
                    analysisText.toLowerCase().includes('suspicious') ? 'Positive' : 'Negative';

  return {
    patientInfo,
    prediction,
    confidenceScore: 0.75,
    detailedAnalysis: analysisText,
    recommendations: [
      'Consult with a medical professional for proper diagnosis',
      'Consider additional imaging if recommended',
      'Follow up as advised by your healthcare provider'
    ],
    similarCases: similarCases.slice(0, 3),
    imageAnnotations: undefined,
    is_valid_mri: true
  };
}