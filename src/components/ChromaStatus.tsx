import React, { useEffect, useState } from 'react';
import { initializeCollection } from '../services/chromaService';
import { Database, Server, FileText } from 'lucide-react';

/**
 * Component to display the status of the Chroma database
 */
const ChromaStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRecord, setFirstRecord] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const checkChromaStatus = async () => {
      try {
        setIsLoading(true);
        const collection = await initializeCollection();
        const count = await collection.count();
        setRecordCount(count);
        setIsConnected(true);

        // Get the first record to verify data was loaded
        if (count > 0) {
          try {
            const result = await collection.get({
              limit: 1,
              include: ["metadatas", "documents"]
            });

            if (result.metadatas && result.metadatas.length > 0) {
              setFirstRecord(result.metadatas[0]);
            }
          } catch (err) {
            console.error('Error fetching first record:', err);
          }
        }
      } catch (error) {
        console.error('Error checking Chroma status:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkChromaStatus();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Database className="mr-2 text-blue-600" size={20} />
        Vector Database Status
      </h3>

      {isLoading ? (
        <div className="flex items-center text-slate-600">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          Checking database status...
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center">
            <Server className="mr-2 text-blue-600" size={18} />
            <span className="text-slate-700 font-medium">Connection Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              isConnected
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {isConnected && recordCount !== null && (
            <div className="flex items-center">
              <Database className="mr-2 text-blue-600" size={18} />
              <span className="text-slate-700 font-medium">Records in Database:</span>
              <span className="ml-2 text-slate-900">{recordCount}</span>
            </div>
          )}

          <p className="text-sm text-slate-600 mt-2">
            {isConnected
              ? `The vector database is connected and contains ${recordCount} cancer data records for enhanced analysis.`
              : 'The vector database is not connected. Some advanced features may not be available.'}
          </p>

          {firstRecord && (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <FileText className="mr-2 text-blue-600" size={18} />
                <span className="text-slate-700 font-medium">First Record in Chroma (Verification):</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-md text-xs overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(firstRecord, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChromaStatus;
