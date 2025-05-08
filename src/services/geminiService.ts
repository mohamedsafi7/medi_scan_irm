import { GoogleGenerativeAI } from '@google/generative-ai';
import { PatientInfo, AnalysisResult, SimilarCase } from '../types/types';
import { querySimilarCases } from './chromaService';
import { isDataLoaded, loadCancerData } from './dataLoaderService';
import { loadCancerDataForContext } from './directContextService';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Initialize the cancer data in Chroma if not already loaded
 */
export const initializeCancerData = async (): Promise<void> => {
  try {
    const dataLoaded = await isDataLoaded();
    if (!dataLoaded) {
      console.log('Cancer data not found in Chroma. Loading data...');
      await loadCancerData();
      console.log('Cancer data loaded successfully.');
    } else {
      console.log('Cancer data already loaded in Chroma.');
    }
  } catch (error) {
    console.error('Error initializing cancer data:', error);
  }
};

/**
 * Analyze a medical image using Gemini AI and Chroma vector database
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

    // Remove data URL prefix
    const base64Image = imageData.split(',')[1];

    // Load cancer data directly into the prompt context
    let cancerDataContext = '';
    let retrievedSimilarCases: SimilarCase[] = [];

    try {
      // Load cancer data examples directly into the prompt
      cancerDataContext = await loadCancerDataForContext();
      console.log('Loaded cancer data context for direct injection');

      // Still try to get similar cases from Chroma as a fallback
      try {
        retrievedSimilarCases = await querySimilarCases(patientInfo);
        if (retrievedSimilarCases.length > 0) {
          console.log('Retrieved similar cases from Chroma as fallback:', retrievedSimilarCases);
        }
      } catch (chromaError) {
        console.warn('Could not retrieve similar cases from Chroma:', chromaError);
        // Continue with just the direct context
      }
    } catch (error) {
      console.warn('Could not load cancer data context:', error);

      // Try to get similar cases from Chroma as a fallback
      try {
        retrievedSimilarCases = await querySimilarCases(patientInfo);
        if (retrievedSimilarCases.length > 0) {
          console.log('Retrieved similar cases from Chroma as fallback:', retrievedSimilarCases);
        }
      } catch (chromaError) {
        console.warn('Could not retrieve similar cases from Chroma:', chromaError);
      }
    }

    // Create enhanced prompt with direct context injection
    const prompt = `Analyze this medical image for potential cancer indicators. Consider:
      - Patient age: ${patientInfo.age}
      - Patient gender: ${patientInfo.gender}
      - Medical history: ${patientInfo.medicalHistory || 'None provided'}

      ${cancerDataContext}

      Provide a detailed analysis in the following EXACT structured format:

      PREDICTION: [ONLY write "POSITIVE" or "NEGATIVE" - nothing else]

      CONFIDENCE: [ONLY write a number between 0-100 followed by % - example: "85%"]

      DETAILED ANALYSIS:
      [Your detailed observations and analysis]

      RECOMMENDATIONS:
      - [Recommendation 1]
      - [Recommendation 2]
      - [Additional recommendations as needed]

      IMPORTANT INSTRUCTIONS:
      1. Be objective in your assessment. Do not default to positive results.
      2. Clearly indicate negative results when appropriate.
      3. The confidence score should reflect your actual confidence level.
      4. Follow the EXACT format specified above for PREDICTION and CONFIDENCE.
      5. For PREDICTION, only write "POSITIVE" or "NEGATIVE" - no other text.
      6. For CONFIDENCE, only write a number followed by % (e.g., "85%").
      7. Use the cancer data examples provided above to inform your analysis.`;

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Analyze the image
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image
        }
      }
    ]);

    const response = result.response;
    const text = response.text();

    // Debug log to see the raw AI response
    console.log('Raw AI Response:', text);

    // Parse the response with more robust logic
    // Extract prediction (positive/negative)
    let prediction: 'Positive' | 'Negative' = 'Negative'; // Default to negative
    const predictionMatch = text.match(/PREDICTION:?\s*([A-Za-z]+)/i);
    if (predictionMatch) {
      const extractedPrediction = predictionMatch[1].trim().toLowerCase();
      // Only set to positive if explicitly stated
      if (extractedPrediction === 'positive') {
        prediction = 'Positive';
      }
    } else {
      // Fallback to the old method if structured format isn't found
      const isPositive = text.toLowerCase().includes('positive') &&
                        !text.toLowerCase().includes('not positive') &&
                        !text.toLowerCase().includes('negative');
      prediction = isPositive ? 'Positive' : 'Negative';
    }

    // Extract confidence score with improved pattern matching
    let confidenceScore = 0.5; // Default value

    // Try multiple patterns to extract confidence score
    // Pattern 1: Look for "CONFIDENCE: X%" format (exact format we requested)
    const confidenceExactMatch = text.match(/CONFIDENCE:\s*(\d+(?:\.\d+)?)[%]/i);

    // Pattern 2: Look for "CONFIDENCE: X%" or "CONFIDENCE: X" format (more flexible)
    const confidenceMatch = text.match(/CONFIDENCE:?\s*(\d+(?:\.\d+)?)[%]?/i);

    // Pattern 3: Look for "CONFIDENCE:** X%" format (with asterisks)
    const confidenceAsteriskMatch = text.match(/CONFIDENCE:?\*+\s*(\d+(?:\.\d+)?)[%]?/i);

    // Pattern 4: Look for "confidence level: X%" or similar formats
    const altConfidenceMatch = text.match(/confidence(?:\s+level)?(?:\s+is)?(?:\s+at)?[:\s]+(\d+(?:\.\d+)?)[%]?/i);

    // Pattern 5: Look for "X% confidence" format
    const percentConfidenceMatch = text.match(/(\d+(?:\.\d+)?)[%]\s+confidence/i);

    if (confidenceExactMatch) {
      // Convert to a value between 0 and 1
      confidenceScore = Math.min(1, Math.max(0, parseFloat(confidenceExactMatch[1]) / 100));
      console.log('Confidence extracted using exact pattern:', confidenceExactMatch[1]);
    } else if (confidenceMatch) {
      // Convert to a value between 0 and 1
      confidenceScore = Math.min(1, Math.max(0, parseFloat(confidenceMatch[1]) / 100));
      console.log('Confidence extracted using pattern 2:', confidenceMatch[1]);
    } else if (confidenceAsteriskMatch) {
      confidenceScore = Math.min(1, Math.max(0, parseFloat(confidenceAsteriskMatch[1]) / 100));
      console.log('Confidence extracted using pattern 3:', confidenceAsteriskMatch[1]);
    } else if (altConfidenceMatch) {
      const value = parseFloat(altConfidenceMatch[1]);
      // Check if the value is likely a percentage (0-100) or decimal (0-1)
      confidenceScore = value > 1 ? Math.min(1, Math.max(0, value / 100)) : Math.min(1, Math.max(0, value));
      console.log('Confidence extracted using pattern 4:', altConfidenceMatch[1]);
    } else if (percentConfidenceMatch) {
      confidenceScore = Math.min(1, Math.max(0, parseFloat(percentConfidenceMatch[1]) / 100));
      console.log('Confidence extracted using pattern 5:', percentConfidenceMatch[1]);
    } else if (prediction === 'Negative') {
      // If negative prediction with no confidence, use a lower default
      confidenceScore = 0.3;
      console.log('Using default confidence for negative prediction:', confidenceScore);
    }

    // Additional check for confidence values in the detailed analysis
    // This helps catch cases where the confidence is mentioned in the analysis but not in the expected format
    if (confidenceScore === 0.5 || confidenceScore === 0.3) {
      // Look for any percentage in the text that might be a confidence score
      const anyPercentageMatch = text.match(/(\d+(?:\.\d+)?)[%]/g);
      if (anyPercentageMatch && anyPercentageMatch.length > 0) {
        // Use the first percentage found that's between 1 and 100
        for (const match of anyPercentageMatch) {
          const value = parseFloat(match);
          if (value >= 1 && value <= 100) {
            confidenceScore = value / 100;
            console.log('Confidence extracted from any percentage in text:', value);
            break;
          }
        }
      }
    }

    // Extract recommendations from the text or use default ones
    let recommendations = [
      "Consult with a healthcare professional to review these findings",
      "Consider additional diagnostic tests if recommended",
      "Schedule regular follow-up appointments",
      "Maintain detailed records of all medical imaging and reports"
    ];

    // Try to extract recommendations from the text with improved pattern matching
    // First try to find the RECOMMENDATIONS section
    const recommendationsSectionMatch = text.match(/RECOMMENDATIONS:?\s*([\s\S]+?)(?:\n\n|\n[A-Z]+:|\n$|$)/i);
    if (recommendationsSectionMatch) {
      // Extract bullet points from the recommendations section
      const recommendationsSection = recommendationsSectionMatch[1];
      const extractedRecommendations = recommendationsSection
        .split(/\n\s*-|\n\s*\d+\.|\n\s*•/)
        .map(r => r.trim())
        .filter(r => r.length > 0);

      if (extractedRecommendations.length > 0) {
        recommendations = extractedRecommendations;
      }
    } else {
      // Fallback to the old pattern if no RECOMMENDATIONS section is found
      const oldRecommendationsMatch = text.match(/recommendations?[:\s]+([\s\S]+?)(?:\n\n|\n[A-Z]+:|\n$|$)/i);
      if (oldRecommendationsMatch) {
        const extractedRecommendations = oldRecommendationsMatch[1]
          .split(/\n\s*-|\n\s*\d+\.|\n\s*•/)
          .map(r => r.trim())
          .filter(r => r.length > 0);

        if (extractedRecommendations.length > 0) {
          recommendations = extractedRecommendations;
        }
      }
    }

    // Debug logs for extracted values
    console.log('Extracted Prediction:', prediction);
    console.log('Extracted Confidence Score:', confidenceScore);
    console.log('Extracted Recommendations:', recommendations);

    // Include a note about the direct context injection in the detailed analysis
    const analysisWithContextNote = `${text}

Note: This analysis was enhanced with direct context injection of cancer data examples to improve accuracy.`;

    return {
      patientInfo,
      prediction,
      confidenceScore,
      detailedAnalysis: analysisWithContextNote,
      recommendations,
      similarCases: retrievedSimilarCases.length > 0 ? retrievedSimilarCases : undefined
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};