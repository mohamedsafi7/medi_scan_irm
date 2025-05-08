import { useEffect, useState } from 'react';
import { initializeCancerData } from '../services/geminiService';

/**
 * Component that initializes Chroma and loads cancer data
 * This component doesn't render anything visible
 */
const ChromaInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeCancerData();
        setIsInitializing(false);
      } catch (err) {
        console.error('Failed to initialize Chroma:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ChromaInitializer;
