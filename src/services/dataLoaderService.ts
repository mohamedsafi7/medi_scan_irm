import { initializeCollection } from './chromaService';

/**
 * Parse CSV data into an array of objects
 * @param csvText CSV text content
 * @returns Array of objects representing the CSV rows
 */
const parseCSV = (csvText: string): any[] => {
  // Split the CSV text into lines
  const lines = csvText.split('\n');

  // Extract headers (first line)
  const headers = lines[0].split(',').map(header =>
    header.trim().replace(/^"|"$/g, '') // Remove quotes if present
  );

  // Parse each line into an object
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',').map(value =>
      value.trim().replace(/^"|"$/g, '') // Remove quotes if present
    );

    // Create an object with header keys and corresponding values
    const rowObject: Record<string, string | number> = {};
    headers.forEach((header, index) => {
      // Convert numeric values to numbers
      const value = values[index];
      rowObject[header] = isNaN(Number(value)) ? value : Number(value);
    });

    return rowObject;
  });
};

/**
 * Load cancer data from CSV file into Chroma
 * @returns True if successful
 */
export const loadCancerData = async (): Promise<boolean> => {
  try {
    const collection = await initializeCollection();

    if (!collection) {
      console.log("ChromaDB not available, skipping data loading");
      return true; // Return true to indicate the app can continue without Chroma
    }

    // Try different possible paths for the CSV file
    let response;
    try {
      // Try the standard path first
      response = await fetch('/data/Cancer_Data.csv');
    } catch (err) {
      // If that fails, try an alternative path
      console.log('Trying alternative path for CSV file...');
      response = await fetch('./data/Cancer_Data.csv');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    // Parse CSV
    const data = parseCSV(csvText);

    // Prepare data for Chroma
    const documents = data.map((row: any) => {
      // Create a text representation of the row for embedding
      return Object.entries(row)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    });

    const ids = data.map((_: any, index: number) => `cancer_data_${index}`);

    const metadatas = data.map((row: any) => {
      // Extract all numeric fields and convert them to numbers
      const metadata: Record<string, any> = {
        id: row.id,
        diagnosis: row.diagnosis,
      };

      // Add all numeric fields to metadata
      Object.entries(row).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'diagnosis') {
          const numValue = typeof value === 'number' ? value : parseFloat(value as string);
          if (!isNaN(numValue)) {
            metadata[key] = numValue;
          } else {
            metadata[key] = value;
          }
        }
      });

      return metadata;
    });

    // Add data to collection in batches to avoid overwhelming the server
    const BATCH_SIZE = 50;
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batchIds = ids.slice(i, i + BATCH_SIZE);
      const batchDocuments = documents.slice(i, i + BATCH_SIZE);
      const batchMetadatas = metadatas.slice(i, i + BATCH_SIZE);

      await collection.add({
        ids: batchIds,
        documents: batchDocuments,
        metadatas: batchMetadatas,
      });

      console.log(`Loaded batch ${i / BATCH_SIZE + 1} of cancer data into Chroma`);
    }

    console.log(`Loaded ${documents.length} cancer data records into Chroma`);
    return true;
  } catch (error) {
    console.warn("Error loading cancer data into Chroma, continuing without it:", error);
    return true; // Return true to allow the app to continue
  }
};

/**
 * Check if cancer data is already loaded in Chroma
 * @returns True if data is loaded or if ChromaDB is not available
 */
export const isDataLoaded = async (): Promise<boolean> => {
  try {
    const collection = await initializeCollection();
    if (!collection) {
      // If ChromaDB is not available, consider data as "loaded" to continue
      return true;
    }
    const count = await collection.count();
    return count > 0;
  } catch (error) {
    console.warn("Error checking if data is loaded, assuming loaded:", error);
    return true; // Return true to allow the app to continue
  }
};
