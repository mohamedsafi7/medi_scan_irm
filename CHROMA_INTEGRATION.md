# Chroma Vector Database Integration

This document explains how the MediScan AI application integrates with Chroma vector database to enhance cancer detection analysis.

## Overview

Chroma is an open-source AI-native vector database that allows us to store and query embeddings efficiently. In this application, we use Chroma to:

1. Store cancer data from the `data/Cancer_Data.csv` file
2. Find similar cases to a patient's information
3. Enhance the Gemini AI analysis with relevant historical data

## How It Works

1. **Data Storage**: When the application starts, it checks if the cancer data is already loaded in Chroma. If not, it loads the data from the CSV file.

2. **Vector Search**: When analyzing a medical image, the application queries Chroma for cases similar to the patient's information.

3. **Enhanced Analysis**: The similar cases are included in the prompt sent to Gemini AI, allowing it to provide more accurate and contextually relevant analysis.

## Running the Application with Chroma

### Option 1: In-Memory Chroma (Default)

By default, the application uses an in-memory Chroma database, which is automatically initialized when the application starts. No additional setup is required.

### Option 2: Standalone Chroma Server

For production use or to persist data between application restarts, you can run a standalone Chroma server:

1. Start the Chroma server:
   ```bash
   npm run start-chroma
   ```

2. In a separate terminal, start the application:
   ```bash
   npm run dev
   ```

## Implementation Details

### Key Components

1. **ChromaService**: Handles interactions with the Chroma database, including initializing collections and querying similar cases.

2. **DataLoaderService**: Loads cancer data from the CSV file into Chroma.

3. **GeminiService**: Uses data from Chroma to enhance the AI analysis.

4. **ChromaInitializer**: Initializes Chroma when the application starts.

5. **ChromaStatus**: Displays the status of the Chroma database on the About page.

### Code Structure

- `src/services/chromaService.ts`: Service for interacting with Chroma
- `src/services/dataLoaderService.ts`: Service for loading data into Chroma
- `src/services/geminiService.ts`: Enhanced with Chroma integration
- `src/components/ChromaInitializer.tsx`: Component for initializing Chroma
- `src/components/ChromaStatus.tsx`: Component for displaying Chroma status

## Benefits of Chroma Integration

1. **More Accurate Analysis**: By incorporating similar historical cases, the AI can provide more accurate and contextually relevant analysis.

2. **Better User Experience**: Users get more detailed results with references to similar cases.

3. **Improved Recommendations**: The AI can provide more specific recommendations based on similar cases.

4. **Scalability**: As more data is collected, the system becomes more accurate without requiring retraining of the AI model.

## Troubleshooting

If you encounter issues with the Chroma integration:

1. Check the browser console for error messages.

2. Verify that the Chroma server is running (if using the standalone server).

3. Check the About page to see the Chroma status, including connection status and record count.

4. Try restarting both the Chroma server and the application.

## Future Enhancements

1. **User-Contributed Data**: Allow users to contribute their own data to improve the database.

2. **Advanced Filtering**: Implement more sophisticated filtering based on metadata.

3. **Visualization**: Add visualizations of similar cases to help users understand the analysis.

4. **Persistent Storage**: Configure Chroma to use persistent storage for production use.
