import React, { useEffect, useState } from 'react';
import { Database } from 'lucide-react';

/**
 * Component to display the first row of the CSV file
 * This confirms that the system is reading the data
 */
const CsvDataDisplay: React.FC = () => {
  const [csvFirstRow, setCsvFirstRow] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        setIsLoading(true);

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

        // Parse the first row
        const lines = csvText.split('\n');
        if (lines.length < 2) {
          throw new Error('CSV file does not have enough data');
        }

        // Extract headers (first line)
        const headers = lines[0].split(',').map(header =>
          header.trim().replace(/^"|"$/g, '') // Remove quotes if present
        );

        // Parse the first data row (second line)
        const values = lines[1].split(',').map(value =>
          value ? value.trim().replace(/^"|"$/g, '') : '' // Remove quotes if present and handle empty values
        );

        // Create an object with header keys and corresponding values
        const rowObject: Record<string, string | number> = {};
        headers.forEach((header, index) => {
          if (header && header.trim()) { // Only process non-empty headers
            // Convert numeric values to numbers, handle missing values
            const value = index < values.length ? values[index] : '';
            rowObject[header] = value && !isNaN(Number(value)) ? Number(value) : value;
          }
        });

        setCsvFirstRow(rowObject);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-blue-600" size={20} />
          CSV Data Verification
        </h3>
        <div className="flex items-center text-slate-600">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          Loading CSV data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-red-600" size={20} />
          CSV Data Verification
        </h3>
        <div className="text-red-600">
          Error loading CSV data: {error}
        </div>
        <div className="mt-3 p-3 bg-yellow-50 text-sm text-yellow-800 rounded-md">
          <p className="font-medium">Troubleshooting:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Make sure the file 'Cancer_Data.csv' exists in the 'data' folder</li>
            <li>Check that the file has the correct format and at least one data row</li>
            <li>Try refreshing the page</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!csvFirstRow) {
    // Create a fallback display with sample data
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
          <Database className="mr-2 text-blue-600" size={20} />
          CSV Data Verification
        </h3>
        <div className="text-slate-600 mb-3">
          No CSV data found. Displaying sample data instead:
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">id</th>
                <th className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">diagnosis</th>
                <th className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">radius_mean</th>
                <th className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">texture_mean</th>
                <th className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">area_mean</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border border-slate-200 text-slate-700">842302</td>
                <td className="px-3 py-2 border border-slate-200 text-slate-700">M</td>
                <td className="px-3 py-2 border border-slate-200 text-slate-700">17.99</td>
                <td className="px-3 py-2 border border-slate-200 text-slate-700">10.38</td>
                <td className="px-3 py-2 border border-slate-200 text-slate-700">1001</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-xs text-yellow-600">
          Note: This is sample data. The actual CSV file could not be loaded.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
        <Database className="mr-2 text-blue-600" size={20} />
        CSV Data Verification
      </h3>
      <p className="text-sm text-slate-600 mb-3">
        First row of Cancer_Data.csv (confirms data is being read):
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100">
              {Object.keys(csvFirstRow).map((key) => (
                <th key={key} className="px-3 py-2 text-left font-medium text-slate-700 border border-slate-200">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(csvFirstRow).map((value, index) => (
                <td key={index} className="px-3 py-2 border border-slate-200 text-slate-700">
                  {value !== undefined && value !== null ? value.toString() : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvDataDisplay;
