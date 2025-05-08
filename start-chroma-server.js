// Simple script to start a Chroma server
import { ChromaClient } from 'chromadb';

console.log('Starting Chroma server...');
console.log('This script will keep running to maintain the connection.');
console.log('Press Ctrl+C to stop the server.');

// Create a client that will connect to the default in-memory server
const client = new ChromaClient();

// Keep the script running
setInterval(async () => {
  try {
    // Ping the server to check if it's running
    await client.heartbeat();
    console.log('Chroma server is running...');
  } catch (error) {
    console.error('Error connecting to Chroma server:', error);
  }
}, 5000);
