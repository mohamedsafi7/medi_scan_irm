import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AnalysisResult, SimilarCase } from '../../types/types';
import TumorMetricsChart from './TumorMetricsChart';
import TemporalAnalysisChart from './TemporalAnalysisChart';
import RiskGaugeChart from './RiskGaugeChart';
import KeyMetricsComparisonChart from './KeyMetricsComparisonChart';
import CaseComparisonChart from './CaseComparisonChart';

interface AnalysisChartProps {
  results: AnalysisResult;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalysisChart: React.FC<AnalysisChartProps> = ({ results }) => {
  // Prepare confidence data for visualization
  const confidenceData = [
    {
      name: 'Confidence',
      value: Math.round(results.confidenceScore * 100),
      fill: results.prediction === 'Positive'
        ? (results.confidenceScore > 0.7 ? '#ef4444' : '#f59e0b')
        : '#22c55e'
    },
    {
      name: 'Remaining',
      value: 100 - Math.round(results.confidenceScore * 100),
      fill: '#e5e7eb'
    }
  ];

  // Prepare similar cases data if available
  const similarCasesData = results.similarCases
    ? results.similarCases.map((caseItem: SimilarCase) => ({
        name: `Case ${caseItem.id}`,
        similarity: caseItem.similarity || 0,
        diagnosis: caseItem.diagnosis === 'M' ? 'Malignant' : 'Benign'
      }))
    : [];

  // Prepare recommendations data
  const recommendationsData = results.recommendations.map((rec, index) => ({
    name: `Rec ${index + 1}`,
    value: 1,
    fullText: rec
  }));

  return (
    <div className="analysis-chart-container">
      <h3 className="text-lg font-semibold mb-4">Analysis Visualization</h3>

      {/* First row of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Confidence Score Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-md font-medium mb-2">Confidence Score</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={confidenceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => name === 'Confidence' ? `${value}%` : ''}
              >
                {confidenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className={`font-medium ${
              results.prediction === 'Positive' ? 'text-red-600' : 'text-green-600'
            }`}>
              {results.prediction} Result
            </span>
          </div>
        </div>

        {/* Risk Gauge Chart */}
        <RiskGaugeChart results={results} />
      </div>

      {/* Second row of charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Similar Cases Chart (if available) */}
        {similarCasesData.length > 0 ? (
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium mb-2">Similar Cases</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={similarCasesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Similarity %', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  formatter={(value, name, props) => [`${value}%`, 'Similarity']}
                  labelFormatter={(value) => `${value} (${similarCasesData.find(item => item.name === value)?.diagnosis})`}
                />
                <Bar
                  dataKey="similarity"
                  fill="#3b82f6"
                  name="Similarity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <TumorMetricsChart results={results} />
        )}

        {/* Temporal Analysis Chart */}
        <TemporalAnalysisChart results={results} />
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Show Tumor Metrics if we have similar cases (otherwise it's shown in the second row) */}
        {similarCasesData.length > 0 && (
          <TumorMetricsChart results={results} />
        )}
      </div>

      {/* Fourth row - Key Metrics Comparison */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <KeyMetricsComparisonChart results={results} />
      </div>

      {/* Fifth row - Case Comparison */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <CaseComparisonChart results={results} />
      </div>

      {/* Recommendations Summary */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium mb-2">Recommendations</h4>
        <ul className="list-disc pl-5 space-y-1">
          {results.recommendations.map((rec, index) => (
            <li key={index} className="text-sm">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisChart;
