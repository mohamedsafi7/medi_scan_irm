/**
 * Service for loading cancer data directly into the prompt context
 */

/**
 * Load a subset of cancer data to include directly in the prompt
 * @returns A formatted string with cancer data examples
 */
export const loadCancerDataForContext = async (): Promise<string> => {
  try {
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
    
    // Parse the CSV header
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => 
      header.trim().replace(/^"|"$/g, '') // Remove quotes if present
    );
    
    // Select a subset of rows (10 examples: 5 malignant, 5 benign)
    const malignantExamples: string[] = [];
    const benignExamples: string[] = [];
    
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
      
      // Add to appropriate category based on diagnosis
      if (rowObject.diagnosis === 'M' && malignantExamples.length < 5) {
        malignantExamples.push(formatExample(rowObject));
      } else if (rowObject.diagnosis === 'B' && benignExamples.length < 5) {
        benignExamples.push(formatExample(rowObject));
      }
      
      // Stop once we have enough examples
      if (malignantExamples.length >= 5 && benignExamples.length >= 5) {
        break;
      }
    }
    
    // Format the context string
    return `
CANCER DATA EXAMPLES:

Malignant Examples:
${malignantExamples.join('\n\n')}

Benign Examples:
${benignExamples.join('\n\n')}

Key Metrics for Diagnosis:
- Higher values of radius_mean, perimeter_mean, area_mean, and concavity_mean are associated with malignant tumors
- Malignant tumors typically have radius_mean > 15, while benign tumors often have radius_mean < 15
- Malignant tumors typically have texture_mean > 18, while benign tumors often have texture_mean < 18
- Malignant tumors typically have area_mean > 700, while benign tumors often have area_mean < 500
`;
  } catch (error) {
    console.error('Error loading cancer data for context:', error);
    return `
CANCER DATA EXAMPLES:

Unable to load cancer data examples. Please analyze based on medical knowledge.
`;
  }
};

/**
 * Format a data row as a readable example
 * @param data The data object
 * @returns Formatted string
 */
const formatExample = (data: Record<string, string | number>): string => {
  // Select the most important features for diagnosis
  return `Example ID: ${data.id}
Diagnosis: ${data.diagnosis === 'M' ? 'Malignant' : 'Benign'}
Key Metrics:
- radius_mean: ${data.radius_mean}
- texture_mean: ${data.texture_mean}
- perimeter_mean: ${data.perimeter_mean}
- area_mean: ${data.area_mean}
- smoothness_mean: ${data.smoothness_mean}
- compactness_mean: ${data.compactness_mean}
- concavity_mean: ${data.concavity_mean}
- symmetry_mean: ${data.symmetry_mean}`;
};
