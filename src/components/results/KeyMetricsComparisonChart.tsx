import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { AnalysisResult } from '../../types/types';

interface KeyMetricsComparisonChartProps {
  results: AnalysisResult;
}

// The two most important metrics for cancer detection based on medical literature
const KEY_METRICS = [
  {
    name: 'Radius',
    regex: /radius(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    benignThreshold: 15,
    malignantThreshold: 18
  },
  {
    name: 'Texture',
    regex: /texture(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    benignThreshold: 18,
    malignantThreshold: 22
  },
  {
    name: 'Area',
    regex: /area(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    benignThreshold: 500,
    malignantThreshold: 700
  },
  {
    name: 'Concavity',
    regex: /concavity(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    benignThreshold: 0.05,
    malignantThreshold: 0.1
  }
];

const KeyMetricsComparisonChart: React.FC<KeyMetricsComparisonChartProps> = ({ results }) => {
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  useEffect(() => {
    // Extract metrics from the detailed analysis
    const extractedMetrics = KEY_METRICS.map(metric => {
      const match = results.detailedAnalysis.match(metric.regex);
      return {
        name: metric.name,
        value: match ? parseFloat(match[1]) : null,
        benignThreshold: metric.benignThreshold,
        malignantThreshold: metric.malignantThreshold
      };
    }).filter(metric => metric.value !== null);

    // Select the top 2 metrics that have values
    const topMetrics = extractedMetrics.slice(0, 2);

    // If we don't have at least 2 metrics, add dummy ones
    if (topMetrics.length < 2) {
      // Add the first missing metrics as placeholders
      const missingMetrics = KEY_METRICS.filter(
        metric => !topMetrics.some(m => m.name === metric.name)
      ).slice(0, 2 - topMetrics.length);

      missingMetrics.forEach(metric => {
        topMetrics.push({
          name: metric.name,
          value: 0, // Placeholder value
          benignThreshold: metric.benignThreshold,
          malignantThreshold: metric.malignantThreshold,
          isPlaceholder: true
        });
      });
    }

    // Format data for the chart
    const formattedData = topMetrics.map(metric => ({
      metric: metric.name,
      Current: metric.isPlaceholder ? null : metric.value,
      'Benign Threshold': metric.benignThreshold,
      'Malignant Threshold': metric.malignantThreshold
    }));

    setComparisonData(formattedData);
    setSelectedMetrics(topMetrics.map(m => m.name));
  }, [results.detailedAnalysis]);

  // If we don't have any metrics, show a message
  if (comparisonData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium mb-2">Key Metrics Comparison</h4>
        <p className="text-sm text-slate-600">
          No key metrics were found in the analysis to generate a comparison chart.
        </p>
      </div>
    );
  }

  // Create a custom tooltip that explains the significance of the metrics
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const metricName = label;
      const currentValue = payload.find((p: any) => p.name === 'Current')?.value;
      const benignThreshold = payload.find((p: any) => p.name === 'Benign Threshold')?.value;
      const malignantThreshold = payload.find((p: any) => p.name === 'Malignant Threshold')?.value;

      let interpretation = '';
      if (currentValue !== null) {
        if (currentValue < benignThreshold) {
          interpretation = `Value is below the typical benign threshold, suggesting lower risk.`;
        } else if (currentValue >= malignantThreshold) {
          interpretation = `Value is at or above the typical malignant threshold, suggesting higher risk.`;
        } else {
          interpretation = `Value is between benign and malignant thresholds, suggesting moderate risk.`;
        }
      }

      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{metricName}</p>
          {currentValue !== null ? (
            <>
              <p className="text-sm">Current value: <span className="font-medium">{currentValue}</span></p>
              <p className="text-sm">Benign threshold: {benignThreshold}</p>
              <p className="text-sm">Malignant threshold: {malignantThreshold}</p>
              <p className="text-sm mt-1 text-blue-600">{interpretation}</p>
            </>
          ) : (
            <p className="text-sm text-amber-600">No value detected in analysis</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-slate-800">Key Cancer Detection Metrics</h4>
        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          CSV Comparison
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-slate-700">
          This chart compares the current case metrics with established thresholds for benign and malignant tumors
          based on the Cancer_Data.csv dataset.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={comparisonData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            dataKey="metric"
            type="category"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            iconType="circle"
          />
          <Bar
            dataKey="Current"
            fill="#3b82f6"
            name="Current Value"
            radius={[0, 4, 4, 0]}
            animationDuration={1500}
            barSize={20}
          />
          <Bar
            dataKey="Benign Threshold"
            fill="#10b981"
            name="Benign Threshold"
            radius={[0, 4, 4, 0]}
            animationDuration={1500}
            barSize={20}
          />
          <Bar
            dataKey="Malignant Threshold"
            fill="#ef4444"
            name="Malignant Threshold"
            radius={[0, 4, 4, 0]}
            animationDuration={1500}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-700 mb-2">Key metrics for cancer detection:</p>
        <ul className="list-disc pl-5 space-y-1">
          {selectedMetrics.map((metric, index) => (
            <li key={index} className="text-sm text-slate-600">
              <span className="font-medium text-slate-800">{metric}:</span> {getMetricDescription(metric)}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-amber-600 font-medium">
          Values above the malignant threshold are associated with higher cancer risk.
        </p>
      </div>
    </div>
  );
};

// Helper function to get descriptions for each metric
const getMetricDescription = (metricName: string): string => {
  switch (metricName) {
    case 'Radius':
      return 'Mean distance from center to perimeter points';
    case 'Texture':
      return 'Standard deviation of gray-scale values';
    case 'Area':
      return 'Total area of the cell nucleus';
    case 'Concavity':
      return 'Severity of concave portions of the contour';
    default:
      return 'Important feature for cancer detection';
  }
};

export default KeyMetricsComparisonChart;
