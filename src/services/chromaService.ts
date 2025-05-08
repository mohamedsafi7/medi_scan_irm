import { ChromaClient, Collection } from "chromadb";
import { PatientInfo, SimilarCase } from "../types/types";

// Initialize the Chroma client
// Use default configuration for in-memory server
const chroma = new ChromaClient();

// Collection name for cancer data
const COLLECTION_NAME = "cancer_data";

/**
 * Initialize the Chroma collection for cancer data
 * @returns The Chroma collection
 */
export const initializeCollection = async (): Promise<Collection> => {
  try {
    // Check if collection exists, if not create it
    const collections = await chroma.listCollections();
    const collectionExists = collections.some(c => c.name === COLLECTION_NAME);

    if (!collectionExists) {
      console.log(`Creating new collection: ${COLLECTION_NAME}`);
      return await chroma.createCollection({
        name: COLLECTION_NAME,
      });
    } else {
      console.log(`Using existing collection: ${COLLECTION_NAME}`);
      return await chroma.getCollection({
        name: COLLECTION_NAME,
      });
    }
  } catch (error) {
    console.error("Error initializing Chroma collection:", error);
    throw error;
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
    console.error("Error querying similar cases from Chroma:", error);
    return [];
  }
};

/**
 * Delete the cancer data collection
 * @returns True if successful
 */
export const deleteCollection = async (): Promise<boolean> => {
  try {
    await chroma.deleteCollection({
      name: COLLECTION_NAME,
    });
    console.log(`Deleted collection: ${COLLECTION_NAME}`);
    return true;
  } catch (error) {
    console.error("Error deleting Chroma collection:", error);
    return false;
  }
};
