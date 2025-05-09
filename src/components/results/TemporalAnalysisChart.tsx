import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { AnalysisResult } from '../../types/types';

interface TemporalAnalysisChartProps {
  results: AnalysisResult;
}

const TemporalAnalysisChart: React.FC<TemporalAnalysisChartProps> = ({ results }) => {
  // Generate simulated temporal data based on the current analysis
  const generateTemporalData = () => {
    const currentConfidence = results.confidenceScore * 100;
    const isPredictionPositive = results.prediction === 'Positive';
    
    // Create data points for a timeline
    // For positive cases: show potential treatment response (decreasing confidence)
    // For negative cases: show monitoring scenario (stable low confidence)
    
    if (isPredictionPositive) {
      return [
        { month: 'Current', confidence: currentConfidence },
        { month: 'Month 1', confidence: Math.max(currentConfidence - 10, currentConfidence * 0.9) },
        { month: 'Month 3', confidence: Math.max(currentConfidence - 25, currentConfidence * 0.7) },
        { month: 'Month 6', confidence: Math.max(currentConfidence - 40, currentConfidence * 0.5) },
        { month: 'Month 9', confidence: Math.max(currentConfidence - 55, currentConfidence * 0.3) },
        { month: 'Month 12', confidence: Math.max(currentConfidence - 65, currentConfidence * 0.2) },
      ];
    } else {
      // For negative predictions, show stable monitoring
      return [
        { month: 'Current', confidence: currentConfidence },
        { month: 'Month 3', confidence: currentConfidence * 0.95 },
        { month: 'Month 6', confidence: currentConfidence * 0.9 },
        { month: 'Month 9', confidence: currentConfidence * 0.85 },
        { month: 'Month 12', confidence: currentConfidence * 0.8 },
      ];
    }
  };

  const temporalData = generateTemporalData();
  const isPredictionPositive = results.prediction === 'Positive';
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-md font-medium mb-2">Temporal Analysis Projection</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={temporalData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            label={{ value: 'Confidence %', angle: -90, position: 'insideLeft' }} 
            domain={[0, 100]}
          />
          <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Confidence']} />
          <Legend />
          <ReferenceLine 
            y={50} 
            stroke="#ff7300" 
            strokeDasharray="3 3" 
            label={{ value: 'Threshold', position: 'right' }} 
          />
          <Line 
            type="monotone" 
            dataKey="confidence" 
            name={isPredictionPositive ? "Projected Response" : "Monitoring Projection"}
            stroke={isPredictionPositive ? "#ef4444" : "#10b981"} 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-slate-500">
        <p className="font-medium">
          {isPredictionPositive 
            ? "Projected confidence trend with treatment (hypothetical)" 
            : "Projected confidence trend with regular monitoring (hypothetical)"}
        </p>
        <p>
          This chart shows a simulated projection of how the confidence score might change over time 
          {isPredictionPositive 
            ? " with appropriate medical intervention." 
            : " with regular monitoring."}
        </p>
        <p className="mt-1 text-amber-600 font-medium">
          Note: This is a hypothetical projection for educational purposes only and should not be used for medical decisions.
        </p>
      </div>
    </div>
  );
};

export default TemporalAnalysisChart;
