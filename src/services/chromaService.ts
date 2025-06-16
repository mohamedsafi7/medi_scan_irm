import { PatientInfo, SimilarCase } from "../types/types";

// Check if we're in production mode
const isProduction = import.meta.env.PROD;

// Lazy import ChromaDB or mock based on environment
let ChromaClient: any = null;
let chroma: any = null;

const initChroma = async () => {
  try {
    if (!ChromaClient) {
      if (isProduction) {
        // Use mock in production
        const chromaModule = await import("./chromaMock");
        ChromaClient = chromaModule.ChromaClient;
        chroma = new ChromaClient();
        console.log("Using ChromaDB mock for production");
      } else {
        // Use real ChromaDB in development
        const chromaModule = await import("chromadb");
        ChromaClient = chromaModule.ChromaClient;
        chroma = new ChromaClient();
        console.log("Using real ChromaDB for development");
      }
    }
    return chroma;
  } catch (error) {
    console.warn("ChromaDB not available, using fallback mode:", error);
    // Fallback to mock if real ChromaDB fails
    try {
      const chromaModule = await import("./chromaMock");
      ChromaClient = chromaModule.ChromaClient;
      chroma = new ChromaClient();
      return chroma;
    } catch (mockError) {
      console.error("Even mock ChromaDB failed:", mockError);
      return null;
    }
  }
};

// Collection name for cancer data
const COLLECTION_NAME = "cancer_data";

/**
 * Initialize the Chroma collection for cancer data
 * @returns The Chroma collection or null if not supported
 */
export const initializeCollection = async (): Promise<any> => {
  try {
    const chromaInstance = await initChroma();
    if (!chromaInstance) {
      console.log("ChromaDB not available, using fallback mode");
      return null;
    }

    // Check if collection exists, if not create it
    const collections = await chromaInstance.listCollections();
    const collectionExists = collections.some((c: any) => c.name === COLLECTION_NAME);

    if (!collectionExists) {
      console.log(`Creating new collection: ${COLLECTION_NAME}`);
      return await chromaInstance.createCollection({
        name: COLLECTION_NAME,
      });
    } else {
      console.log(`Using existing collection: ${COLLECTION_NAME}`);
      return await chromaInstance.getCollection({
        name: COLLECTION_NAME,
      });
    }
  } catch (error) {
    console.warn("Error initializing Chroma collection, using fallback:", error);
    return null;
  }
};



/**
 * Query the cancer data collection for similar cases
 * @param patientInfo Patient information to use for the query
 * @returns Array of similar cases with detailed information
 */
export const querySimilarCases = async (patientInfo: PatientInfo): Promise<SimilarCase[]> => {
  try {
    const collection = await initializeCollection();

    if (!collection) {
      // Fallback: return mock similar cases when ChromaDB is not available
      console.log("Using fallback similar cases");
      return generateFallbackSimilarCases(patientInfo);
    }

    // Create a query based on patient info
    const queryText = `Patient age: ${patientInfo.age}, gender: ${patientInfo.gender}, medical history: ${patientInfo.medicalHistory || 'None provided'}`;

    // Query Chroma for similar cases with metadata
    const queryResults = await collection.query({
      queryTexts: [queryText],
      nResults: 5,
      include: ["metadatas", "documents", "distances"]
    });

    // Extract similar cases information with more details
    const similarCases: SimilarCase[] = [];

    if (queryResults.ids && queryResults.ids[0] && queryResults.metadatas && queryResults.metadatas[0]) {
      for (let i = 0; i < queryResults.ids[0].length; i++) {
        const metadata = queryResults.metadatas[0][i];
        const document = queryResults.documents && queryResults.documents[0] ? queryResults.documents[0][i] : '';
        const distance = queryResults.distances && queryResults.distances[0] ? queryResults.distances[0][i] : undefined;

        // Convert distance to similarity score (1 - normalized distance)
        // Lower distance means higher similarity
        const similarity = distance !== undefined ? Math.round((1 - Math.min(1, distance)) * 100) : undefined;

        similarCases.push({
          id: metadata.id?.toString() || 'unknown',
          diagnosis: metadata.diagnosis?.toString() || 'unknown',
          data: document,
          similarity
        });
      }
    }

    // Sort by similarity (highest first)
    return similarCases.sort((a, b) =>
      (b.similarity || 0) - (a.similarity || 0)
    );
  } catch (error) {
    console.warn("Error querying similar cases from Chroma, using fallback:", error);
    return generateFallbackSimilarCases(patientInfo);
  }
};

/**
 * Generate fallback similar cases when ChromaDB is not available
 */
const generateFallbackSimilarCases = (patientInfo: PatientInfo): SimilarCase[] => {
  const age = parseInt(patientInfo.age) || 45;
  const gender = patientInfo.gender || 'Female';

  return [
    {
      id: 'fallback_1',
      diagnosis: 'Benign',
      data: `Similar case: ${gender}, age ${age - 2}, no significant medical history`,
      similarity: 85
    },
    {
      id: 'fallback_2',
      diagnosis: 'Malignant',
      data: `Similar case: ${gender}, age ${age + 3}, family history of breast cancer`,
      similarity: 78
    },
    {
      id: 'fallback_3',
      diagnosis: 'Benign',
      data: `Similar case: ${gender}, age ${age - 5}, previous benign findings`,
      similarity: 72
    }
  ];
};

/**
 * Delete the cancer data collection
 * @returns True if successful
 */
export const deleteCollection = async (): Promise<boolean> => {
  try {
    const chromaInstance = await initChroma();
    if (!chromaInstance) {
      console.log("ChromaDB not available, cannot delete collection");
      return false;
    }

    await chromaInstance.deleteCollection({
      name: COLLECTION_NAME,
    });
    console.log(`Deleted collection: ${COLLECTION_NAME}`);
    return true;
  } catch (error) {
    console.error("Error deleting Chroma collection:", error);
    return false;
  }
};
