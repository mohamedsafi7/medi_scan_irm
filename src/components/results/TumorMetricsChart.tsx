import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { AnalysisResult, SimilarCase } from '../../types/types';

interface TumorMetricsChartProps {
  results: AnalysisResult;
}

// Extract metrics from the detailed analysis text
const extractMetrics = (detailedAnalysis: string) => {
  // Define the metrics we want to extract
  const metricsToExtract = [
    { name: 'Radius', regex: /radius(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Texture', regex: /texture(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Perimeter', regex: /perimeter(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Area', regex: /area(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Smoothness', regex: /smoothness(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Compactness', regex: /compactness(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Concavity', regex: /concavity(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i },
    { name: 'Symmetry', regex: /symmetry(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i }
  ];

  // Extract values for each metric
  const extractedMetrics = metricsToExtract.map(metric => {
    const match = detailedAnalysis.match(metric.regex);
    return {
      name: metric.name,
      value: match ? parseFloat(match[1]) : 0,
      // Normalize the value for radar chart display
      normalized: 0
    };
  });

  // Filter out metrics with zero values (not found)
  const validMetrics = extractedMetrics.filter(metric => metric.value > 0);

  // If we have valid metrics, normalize them for better radar chart display
  if (validMetrics.length > 0) {
    // Find the maximum value for normalization
    const maxValue = Math.max(...validMetrics.map(m => m.value));
    
    // Normalize values to a 0-100 scale
    validMetrics.forEach(metric => {
      metric.normalized = (metric.value / maxValue) * 100;
    });
  }

  return validMetrics;
};

// Reference data for typical benign and malignant tumors
const getReferenceData = (metrics: Array<{name: string, value: number, normalized: number}>) => {
  // Only include metrics that we were able to extract
  const metricNames = metrics.map(m => m.name);
  
  // Typical values for benign and malignant tumors (normalized to 0-100 scale)
  const referenceValues = {
    Radius: { benign: 40, malignant: 80 },
    Texture: { benign: 50, malignant: 75 },
    Perimeter: { benign: 45, malignant: 85 },
    Area: { benign: 35, malignant: 90 },
    Smoothness: { benign: 60, malignant: 70 },
    Compactness: { benign: 30, malignant: 75 },
    Concavity: { benign: 25, malignant: 80 },
    Symmetry: { benign: 65, malignant: 45 }
  };
  
  // Create the combined data for the radar chart
  return metrics.map(metric => ({
    metric: metric.name,
    Current: metric.normalized,
    Benign: referenceValues[metric.name as keyof typeof referenceValues]?.benign || 0,
    Malignant: referenceValues[metric.name as keyof typeof referenceValues]?.malignant || 0
  }));
};

const TumorMetricsChart: React.FC<TumorMetricsChartProps> = ({ results }) => {
  // Extract metrics from the detailed analysis
  const extractedMetrics = extractMetrics(results.detailedAnalysis);
  
  // If we don't have enough metrics, don't render the chart
  if (extractedMetrics.length < 3) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium mb-2">Tumor Metrics</h4>
        <p className="text-sm text-slate-600">
          Not enough tumor metrics were found in the analysis to generate a comparison chart.
        </p>
      </div>
    );
  }
  
  // Get the combined data for the radar chart
  const radarData = getReferenceData(extractedMetrics);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-md font-medium mb-2">Tumor Metrics Comparison</h4>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          
          <Radar
            name="Current"
            dataKey="Current"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          
          <Radar
            name="Typical Benign"
            dataKey="Benign"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
          
          <Radar
            name="Typical Malignant"
            dataKey="Malignant"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.2}
          />
          
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-slate-500">
        <p>This chart compares the current case metrics with typical profiles of benign and malignant tumors.</p>
        <p>Values are normalized for comparison purposes.</p>
      </div>
    </div>
  );
};

export default TumorMetricsChart;
