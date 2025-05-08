import React, { useEffect, useState } from 'react';
import { Database, FileText, AlertCircle } from 'lucide-react';
import { SimilarCase } from '../types/types';

interface SimilarCasesDisplayProps {
  similarCases?: SimilarCase[];
}

interface ExampleCase {
  id: string;
  diagnosis: string;
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  symmetry_mean: number;
}

/**
 * Component to display similar cases from the vector database
 * This shows the data that was used to inform the analysis
 */
const SimilarCasesDisplay: React.FC<SimilarCasesDisplayProps> = ({ similarCases }) => {
  const [directContextExamples, setDirectContextExamples] = useState<ExampleCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDirectContextExamples = async () => {
      try {
        setIsLoading(true);

        // Try different possible paths for the CSV file
        // Try the standard path first
        const response = await fetch('/data/Cancer_Data.csv').catch(() => {
          // If that fails, try an alternative path
          console.log('Trying alternative path for CSV file...');
          return fetch('./data/Cancer_Data.csv');
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();

        // Parse the CSV header
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header =>
          header.trim().replace(/^"|"$/g, '') // Remove quotes if present
        );

        // Select a subset of rows (5 examples: 3 malignant, 2 benign)
        const examples: ExampleCase[] = [];
        let malignantCount = 0;
        let benignCount = 0;

        // Parse each line and categorize by diagnosis
        for (let i = 1; i < Math.min(lines.length, 100); i++) {
          const line = lines[i];
          if (!line.trim()) continue;

          const values = line.split(',').map(value =>
            value.trim().replace(/^"|"$/g, '') // Remove quotes if present
          );

          // Create an object with header keys and corresponding values
          const rowObject: Record<string, string | number> = {};
          headers.forEach((header, index) => {
            if (index < values.length) {
              const value = values[index];
              rowObject[header] = isNaN(Number(value)) ? value : Number(value);
            }
          });

          // Add to examples based on diagnosis
          if (rowObject.diagnosis === 'M' && malignantCount < 3) {
            examples.push({
              id: String(rowObject.id),
              diagnosis: 'Malignant',
              radius_mean: Number(rowObject.radius_mean),
              texture_mean: Number(rowObject.texture_mean),
              perimeter_mean: Number(rowObject.perimeter_mean),
              area_mean: Number(rowObject.area_mean),
              smoothness_mean: Number(rowObject.smoothness_mean),
              compactness_mean: Number(rowObject.compactness_mean),
              concavity_mean: Number(rowObject.concavity_mean),
              symmetry_mean: Number(rowObject.symmetry_mean)
            });
            malignantCount++;
          } else if (rowObject.diagnosis === 'B' && benignCount < 2) {
            examples.push({
              id: String(rowObject.id),
              diagnosis: 'Benign',
              radius_mean: Number(rowObject.radius_mean),
              texture_mean: Number(rowObject.texture_mean),
              perimeter_mean: Number(rowObject.perimeter_mean),
              area_mean: Number(rowObject.area_mean),
              smoothness_mean: Number(rowObject.smoothness_mean),
              compactness_mean: Number(rowObject.compactness_mean),
              concavity_mean: Number(rowObject.concavity_mean),
              symmetry_mean: Number(rowObject.symmetry_mean)
            });
            benignCount++;
          }

          // Stop once we have enough examples
          if (malignantCount >= 3 && benignCount >= 2) {
            break;
          }
        }

        setDirectContextExamples(examples);
      } catch (err) {
        console.error('Error loading direct context examples:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadDirectContextExamples();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-blue-600" size={20} />
          Reference Cases
        </h3>
        <div className="flex items-center text-slate-600">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          Loading reference cases...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <AlertCircle className="mr-2 text-red-600" size={20} />
          Reference Cases
        </h3>
        <div className="text-red-600">
          Error loading reference cases: {error}
        </div>
      </div>
    );
  }

  // If we have similar cases from the vector database, use those
  if (similarCases && similarCases.length > 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-blue-600" size={20} />
          Similar Cases
        </h3>
        <div className="text-slate-600">
          Similar cases were found in the vector database.
        </div>
      </div>
    );
  }

  // Otherwise, show the direct context examples
  if (directContextExamples.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-blue-600" size={20} />
          Reference Cases
        </h3>
        <div className="text-slate-600">
          No reference cases could be loaded.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
        <Database className="mr-2 text-blue-600" size={20} />
        Reference Cases Used for Analysis
      </h3>
      <p className="text-sm text-slate-600 mb-3">
        These reference cases from our cancer dataset were used to enhance the analysis:
      </p>

      <div className="space-y-4">
        {directContextExamples.map((example, index) => (
          <div key={index} className="border border-slate-200 rounded-md p-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center text-sm font-medium text-slate-700">
                <FileText className="mr-2 text-blue-600" size={16} />
                Case ID: {example.id}
              </div>
              <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
                example.diagnosis === 'Malignant'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {example.diagnosis}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium text-slate-600">Radius Mean:</span>{' '}
                <span className="text-slate-700">{example.radius_mean.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Texture Mean:</span>{' '}
                <span className="text-slate-700">{example.texture_mean.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Perimeter Mean:</span>{' '}
                <span className="text-slate-700">{example.perimeter_mean.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Area Mean:</span>{' '}
                <span className="text-slate-700">{example.area_mean.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium text-slate-600">Smoothness Mean:</span>{' '}
                <span className="text-slate-700">{example.smoothness_mean.toFixed(4)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Compactness Mean:</span>{' '}
                <span className="text-slate-700">{example.compactness_mean.toFixed(4)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Concavity Mean:</span>{' '}
                <span className="text-slate-700">{example.concavity_mean.toFixed(4)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Symmetry Mean:</span>{' '}
                <span className="text-slate-700">{example.symmetry_mean.toFixed(4)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-500 bg-blue-50 p-3 rounded-md">
        <p className="font-medium text-blue-700 mb-1">How Direct Context Injection Works:</p>
        <ol className="list-decimal pl-4 space-y-1 text-slate-600">
          <li>Reference cases are selected from our cancer dataset</li>
          <li>These cases are formatted and included directly in the AI prompt</li>
          <li>The AI uses these examples to better understand cancer indicators</li>
          <li>This provides concrete examples of both malignant and benign cases</li>
          <li>The AI can compare the current case against these reference examples</li>
        </ol>
        <p className="mt-2">
          This approach, known as Direct Context Injection, enhances the AI's capabilities by providing it with relevant examples to learn from.
        </p>
      </div>
    </div>
  );
};

export default SimilarCasesDisplay;
