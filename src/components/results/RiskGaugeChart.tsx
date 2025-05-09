import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { AnalysisResult } from '../../types/types';

interface RiskGaugeChartProps {
  results: AnalysisResult;
}

const RiskGaugeChart: React.FC<RiskGaugeChartProps> = ({ results }) => {
  // Calculate risk score based on prediction and confidence
  const calculateRiskScore = () => {
    const confidenceScore = results.confidenceScore * 100;
    
    if (results.prediction === 'Positive') {
      // For positive predictions, risk is directly related to confidence
      return confidenceScore;
    } else {
      // For negative predictions, risk is inversely related to confidence
      // A high confidence negative result means low risk
      return Math.max(5, 100 - confidenceScore);
    }
  };

  const riskScore = calculateRiskScore();
  
  // Determine risk category
  const getRiskCategory = (score: number) => {
    if (score < 20) return 'Very Low';
    if (score < 40) return 'Low';
    if (score < 60) return 'Moderate';
    if (score < 80) return 'High';
    return 'Very High';
  };
  
  const riskCategory = getRiskCategory(riskScore);
  
  // Get color based on risk score
  const getRiskColor = (score: number) => {
    if (score < 20) return '#10b981'; // green
    if (score < 40) return '#22d3ee'; // cyan
    if (score < 60) return '#f59e0b'; // amber
    if (score < 80) return '#f97316'; // orange
    return '#ef4444'; // red
  };
  
  const riskColor = getRiskColor(riskScore);
  
  // Create data for the gauge chart
  const createGaugeData = () => {
    // We'll create a semi-circle gauge
    const gaugeData = [];
    
    // The filled portion representing the risk score
    gaugeData.push({
      name: 'Risk',
      value: riskScore,
      color: riskColor
    });
    
    // The empty portion to complete the gauge
    gaugeData.push({
      name: 'Remaining',
      value: 100 - riskScore,
      color: '#e5e7eb' // light gray
    });
    
    return gaugeData;
  };
  
  const gaugeData = createGaugeData();
  
  // Create the tick marks for the gauge
  const createTickMarks = () => {
    return [
      { name: 'Very Low', value: 10, color: '#10b981' },
      { name: 'Low', value: 30, color: '#22d3ee' },
      { name: 'Moderate', value: 50, color: '#f59e0b' },
      { name: 'High', value: 70, color: '#f97316' },
      { name: 'Very High', value: 90, color: '#ef4444' }
    ];
  };
  
  const tickMarks = createTickMarks();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-md font-medium mb-2">Risk Assessment</h4>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {gaugeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Needle */}
        <div 
          className="absolute"
          style={{
            left: '50%',
            bottom: '0',
            width: '4px',
            height: '65px',
            backgroundColor: '#334155',
            transform: `translateX(-50%) rotate(${180 - (riskScore * 1.8)}deg)`,
            transformOrigin: 'bottom center',
            borderRadius: '4px 4px 0 0',
            transition: 'transform 0.5s ease-out'
          }}
        />
        
        {/* Tick marks */}
        <div className="flex justify-between px-4 mt-2">
          {tickMarks.map((tick, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="h-3 w-1 mb-1"
                style={{ backgroundColor: tick.color }}
              />
              <span 
                className="text-xs"
                style={{ color: tick.color }}
              >
                {tick.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold" style={{ color: riskColor }}>
          {riskCategory} Risk
        </div>
        <div className="text-sm text-slate-600">
          Risk Score: {riskScore.toFixed(1)}%
        </div>
      </div>
      
      <div className="mt-2 text-xs text-slate-500">
        <p>
          This risk assessment is based on the AI analysis and should be interpreted by a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default RiskGaugeChart;
