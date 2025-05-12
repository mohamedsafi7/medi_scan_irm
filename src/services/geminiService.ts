import { PatientInfo, AnalysisResult, SimilarCase } from '../types/types';

// Python backend URL
const PYTHON_BACKEND_URL = 'http://localhost:5000/api/analyze';

/**
 * Initialize the MRI data - this is a placeholder function to maintain compatibility
 * with the existing code that calls this function
 */
export const initializeCancerData = async (): Promise<void> => {
  console.log('MRI data initialization is handled by the Python backend.');
  return Promise.resolve();
};

/**
 * Analyze a medical image using the Python backend with Gemini AI and MRI reference images
 * @param image Medical image file
 * @param patientInfo Patient information
 * @returns Analysis result
 */
export const analyzeImage = async (
  image: File,
  patientInfo: PatientInfo
): Promise<AnalysisResult> => {
  try {
    // Convert image to base64
    const imageData = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });

    console.log('Sending image to Python backend for MRI analysis...');

    // First check if the server is running
    try {
      const testResponse = await fetch('http://localhost:5000/api/test');
      if (!testResponse.ok) {
        console.error('MRI analysis server test failed:', await testResponse.text());
        throw new Error('MRI analysis server is not responding properly. Please check if it\'s running.');
      } else {
        console.log('MRI analysis server test successful:', await testResponse.json());
      }
    } catch (testError) {
      console.error('Error connecting to MRI analysis server:', testError);
      throw new Error('Failed to connect to MRI analysis server. Please make sure it\'s running on http://localhost:5000');
    }

    // Send the image and patient info to the Python backend
    console.log('Sending request to MRI analysis server...');
    const response = await fetch(PYTHON_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        patientInfo
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Backend error response:', errorData);
      try {
        // Try to parse as JSON
        const errorJson = JSON.parse(errorData);
        throw new Error(`Backend error: ${errorJson.error || errorData}`);
      } catch (e) {
        // If not JSON, use the raw text
        throw new Error(`Backend error (${response.status}): ${errorData}`);
      }
    }

    // Parse the response
    const result = await response.json();

    console.log('Received analysis from Python backend:', result);

    // Check if the image is invalid
    if (result.error === "Invalid image type") {
      throw new Error(`${result.details || "The uploaded image does not appear to be a valid breast MRI."}

Please upload a proper breast MRI image for accurate analysis.`);
    }

    // Extract the key metrics for visualization if available
    const imageAnnotations = result.keyMetrics ?
      Object.entries(result.keyMetrics).map(([key, value]) => ({
        x: Math.random() * 80 + 10, // Random position for demonstration
        y: Math.random() * 80 + 10,
        width: 20,
        height: 20,
        label: `${key}: ${value}`
      })) :
      undefined;

    // Return the analysis result in the expected format
    return {
      patientInfo,
      prediction: result.prediction as 'Positive' | 'Negative',
      confidenceScore: result.confidenceScore,
      detailedAnalysis: result.detailedAnalysis,
      recommendations: result.recommendations,
      similarCases: result.similarCases,
      imageAnnotations,
      is_valid_mri: result.is_valid_mri
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};