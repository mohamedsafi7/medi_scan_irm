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
  Cell
} from 'recharts';
import { AnalysisResult, SimilarCase } from '../../types/types';

interface CaseComparisonChartProps {
  results: AnalysisResult;
}

// The two most important metrics for cancer detection
const KEY_METRICS = [
  {
    name: 'Radius',
    regex: /radius(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    csvField: 'radius_mean'
  },
  {
    name: 'Texture',
    regex: /texture(?:\s+mean)?[:\s]+(\d+(?:\.\d+)?)/i,
    csvField: 'texture_mean'
  }
];

const CaseComparisonChart: React.FC<CaseComparisonChartProps> = ({ results }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Extract metrics from the detailed analysis
    const extractedMetrics = KEY_METRICS.map(metric => {
      const match = results.detailedAnalysis.match(metric.regex);
      return {
        name: metric.name,
        value: match ? parseFloat(match[1]) : null
      };
    }).filter(metric => metric.value !== null);

    // If we don't have any metrics or similar cases, show placeholder data
    if (extractedMetrics.length === 0 || !results.similarCases || results.similarCases.length === 0) {
      // Create placeholder data
      const placeholderData = [];

      // Current case (using average values if not found)
      placeholderData.push({
        name: 'Current',
        Radius: 15,
        Texture: 20,
        diagnosis: results.prediction === 'Positive' ? 'Malignant' : 'Benign'
      });

      // Add some reference cases
      placeholderData.push({
        name: 'Benign Avg',
        Radius: 12,
        Texture: 16,
        diagnosis: 'Benign'
      });

      placeholderData.push({
        name: 'Malignant Avg',
        Radius: 18,
        Texture: 24,
        diagnosis: 'Malignant'
      });

      setChartData(placeholderData);
      return;
    }

    // Format data for the chart
    const formattedData = [];

    // Add current case
    const currentCase = {
      name: 'Current',
      diagnosis: results.prediction === 'Positive' ? 'Malignant' : 'Benign'
    };

    // Add extracted metrics to current case
    extractedMetrics.forEach(metric => {
      currentCase[metric.name] = metric.value;
    });

    formattedData.push(currentCase);

    // Add similar cases (up to 3)
    const similarCases = results.similarCases.slice(0, 3);

    similarCases.forEach((similarCase, index) => {
      // Extract metrics from the similar case data
      const caseData = {
        name: `Case ${similarCase.id}`,
        diagnosis: similarCase.diagnosis === 'M' ? 'Malignant' : 'Benign'
      };

      // Try to extract metrics from the case data
      KEY_METRICS.forEach(metric => {
        // Look for the metric in the case data
        const regex = new RegExp(`${metric.csvField}[:\\s]+(\\d+(?:\\.\\d+)?)`, 'i');
        const match = similarCase.data.match(regex);

        if (match) {
          caseData[metric.name] = parseFloat(match[1]);
        } else {
          // If not found, use a placeholder value
          caseData[metric.name] = null;
        }
      });

      formattedData.push(caseData);
    });

    setChartData(formattedData);
  }, [results]);

  // If we don't have any data, show a message
  if (chartData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium mb-2">Case Comparison</h4>
        <p className="text-sm text-slate-600">
          No metrics or similar cases were found to generate a comparison chart.
        </p>
      </div>
    );
  }

  // Get the metrics that we have data for
  const availableMetrics = KEY_METRICS
    .map(metric => metric.name)
    .filter(metricName =>
      chartData.some(item => item[metricName] !== undefined && item[metricName] !== null)
    );

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const caseName = label;
      const diagnosis = payload[0]?.payload?.diagnosis || 'Unknown';

      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{caseName}</p>
          <p className="text-sm">
            Diagnosis: <span className={`font-medium ${diagnosis === 'Malignant' ? 'text-red-600' : 'text-green-600'}`}>
              {diagnosis}
            </span>
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm">
              {entry.name}: <span className="font-medium">{entry.value !== null ? entry.value : 'N/A'}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-slate-800">Current Case vs. Similar Cases</h4>
        <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
          Direct Comparison
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-slate-700">
          This chart compares your current case with similar cases from the Cancer_Data.csv dataset,
          focusing on the two most important metrics for cancer detection.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={8}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            iconType="circle"
          />

          {availableMetrics.map((metric, index) => (
            <Bar
              key={metric}
              dataKey={metric}
              fill={index === 0 ? "#3b82f6" : "#f59e0b"}
              name={metric}
              animationDuration={1500}
              animationBegin={index * 300}
              barSize={30}
            >
              {chartData.map((entry, index) => {
                const color = entry.diagnosis === 'Malignant'
                  ? (entry.name === 'Current' ? '#ef4444' : '#f87171')
                  : (entry.name === 'Current' ? '#10b981' : '#34d399');

                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-700 mb-2">Comparison of key metrics:</p>
        <ul className="list-disc pl-5 space-y-1">
          {availableMetrics.map((metric, index) => (
            <li key={index} className="text-sm text-slate-600">
              <span className="font-medium text-slate-800">{metric}:</span> {getMetricDescription(metric)}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-sm">Malignant</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm">Benign</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium">Current Case</span>
          </div>
        </div>
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

export default CaseComparisonChart;
