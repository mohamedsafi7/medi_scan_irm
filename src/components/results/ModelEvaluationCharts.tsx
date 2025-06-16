import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Target, BarChart3, Activity } from 'lucide-react';

interface ModelEvaluationChartsProps {}

const ModelEvaluationCharts: React.FC<ModelEvaluationChartsProps> = () => {
  const [evaluationData, setEvaluationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load evaluation metrics from the generated JSON file
    const loadEvaluationData = async () => {
      try {
        // In a real implementation, you would fetch this from your backend
        // For now, we'll simulate the data based on the evaluation results
        const mockData = {
          timestamp: new Date().toISOString(),
          total_samples: 80,
          class_distribution: {
            Healthy: 40,
            Sick: 40
          },
          confusion_matrix: {
            true_negative: 24,
            false_positive: 16,
            false_negative: 30,
            true_positive: 10
          },
          overall_metrics: {
            accuracy: 0.425,
            sensitivity: 0.250,
            specificity: 0.600,
            auc_score: 0.453,
            f1_weighted: 0.407,
            precision_weighted: 0.425,
            recall_weighted: 0.425,
            positive_predictive_value: 0.385,
            negative_predictive_value: 0.444
          }
        };

        setEvaluationData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load evaluation data');
        setLoading(false);
      }
    };

    loadEvaluationData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading evaluation data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  const { confusion_matrix, overall_metrics, class_distribution } = evaluationData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">🔬 Model Performance Evaluation</h4>
        <p className="text-blue-700 text-sm">
          Comprehensive analysis of the MRI cancer detection model performance based on validation data.
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">
                {(overall_metrics.accuracy * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Sensitivity</p>
              <p className="text-2xl font-bold text-green-600">
                {(overall_metrics.sensitivity * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">Specificity</p>
              <p className="text-2xl font-bold text-purple-600">
                {(overall_metrics.specificity * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-600">AUC Score</p>
              <p className="text-2xl font-bold text-orange-600">
                {overall_metrics.auc_score.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h5 className="text-lg font-semibold mb-4">📊 Confusion Matrix</h5>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">Predicted</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs text-gray-500">Healthy</div>
              <div className="text-xs text-gray-500">Sick</div>
            </div>
          </div>
          <div></div>

          <div className="flex items-center">
            <div className="text-xs text-gray-500 transform -rotate-90 mr-2">Actual</div>
            <div className="grid grid-rows-2 gap-2">
              <div className="text-xs text-gray-500">Healthy</div>
              <div className="text-xs text-gray-500">Sick</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-100 border-2 border-green-300 p-4 rounded text-center">
              <div className="text-lg font-bold text-green-800">{confusion_matrix.true_negative}</div>
              <div className="text-xs text-green-600">True Negative</div>
            </div>
            <div className="bg-red-100 border-2 border-red-300 p-4 rounded text-center">
              <div className="text-lg font-bold text-red-800">{confusion_matrix.false_positive}</div>
              <div className="text-xs text-red-600">False Positive</div>
            </div>
            <div className="bg-red-100 border-2 border-red-300 p-4 rounded text-center">
              <div className="text-lg font-bold text-red-800">{confusion_matrix.false_negative}</div>
              <div className="text-xs text-red-600">False Negative</div>
            </div>
            <div className="bg-green-100 border-2 border-green-300 p-4 rounded text-center">
              <div className="text-lg font-bold text-green-800">{confusion_matrix.true_positive}</div>
              <div className="text-xs text-green-600">True Positive</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h5 className="text-lg font-semibold mb-4">📈 Dataset Distribution</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Samples:</span>
              <span className="font-semibold">{evaluationData.total_samples}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Healthy Cases:</span>
              <span className="font-semibold text-green-600">{class_distribution.Healthy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sick Cases:</span>
              <span className="font-semibold text-red-600">{class_distribution.Sick}</span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-l-full"
                  style={{ width: `${(class_distribution.Healthy / evaluationData.total_samples) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Healthy ({((class_distribution.Healthy / evaluationData.total_samples) * 100).toFixed(1)}%)</span>
                <span>Sick ({((class_distribution.Sick / evaluationData.total_samples) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h5 className="text-lg font-semibold mb-4">🎯 Medical Metrics</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Positive Predictive Value:</span>
              <span className="font-semibold">{(overall_metrics.positive_predictive_value * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Negative Predictive Value:</span>
              <span className="font-semibold">{(overall_metrics.negative_predictive_value * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">F1 Score (Weighted):</span>
              <span className="font-semibold">{overall_metrics.f1_weighted.toFixed(3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Precision (Weighted):</span>
              <span className="font-semibold">{overall_metrics.precision_weighted.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Evaluation Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="text-md font-semibold mb-3">📈 ROC Curve</h5>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <img
              src="/evaluation_results/roc_curve.png"
              alt="ROC Curve"
              className="w-full h-48 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-sm">
              ROC Curve visualization<br/>
              (Run evaluation script to generate)
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="text-md font-semibold mb-3">📊 Precision-Recall Curve</h5>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <img
              src="/evaluation_results/precision_recall_curve.png"
              alt="Precision-Recall Curve"
              className="w-full h-48 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-sm">
              Precision-Recall Curve<br/>
              (Run evaluation script to generate)
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="text-md font-semibold mb-3">🎯 Confusion Matrix</h5>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <img
              src="/evaluation_results/confusion_matrix.png"
              alt="Confusion Matrix"
              className="w-full h-48 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-sm">
              Confusion Matrix Heatmap<br/>
              (Run evaluation script to generate)
            </div>
          </div>
        </div>
      </div>

      {/* Threshold Optimization Charts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h5 className="text-lg font-semibold mb-4">🎯 Threshold Optimization Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="text-md font-medium mb-2">F1 Score Optimization</h6>
            <img
              src="/threshold_optimization/f1_optimization.png"
              alt="F1 Optimization"
              className="w-full h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-xs text-center">
              F1 Score vs Threshold<br/>
              (Run optimization script)
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="text-md font-medium mb-2">Precision Optimization</h6>
            <img
              src="/threshold_optimization/precision_optimization.png"
              alt="Precision Optimization"
              className="w-full h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-xs text-center">
              Precision vs Threshold<br/>
              (Run optimization script)
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="text-md font-medium mb-2">Recall Optimization</h6>
            <img
              src="/threshold_optimization/recall_optimization.png"
              alt="Recall Optimization"
              className="w-full h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-xs text-center">
              Recall vs Threshold<br/>
              (Run optimization script)
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="text-md font-medium mb-2">Youden's J Optimization</h6>
            <img
              src="/threshold_optimization/youden_optimization.png"
              alt="Youden Optimization"
              className="w-full h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-xs text-center">
              Youden's J vs Threshold<br/>
              (Run optimization script)
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
            <h6 className="text-md font-medium mb-2">Precision-Recall vs Threshold</h6>
            <img
              src="/threshold_optimization/precision_recall_vs_threshold.png"
              alt="Precision-Recall vs Threshold"
              className="w-full h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-gray-500 text-xs text-center">
              Precision & Recall vs Threshold<br/>
              (Run optimization script)
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h6 className="text-md font-semibold text-blue-800 mb-2">🎯 Optimal Thresholds</h6>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Medical (High Sensitivity):</span>
              <div className="font-bold">0.100</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Balanced (F1):</span>
              <div className="font-bold">0.220</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Default:</span>
              <div className="font-bold">0.500</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Recommended:</span>
              <div className="font-bold text-green-600">0.100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Performance Analysis</h5>
        <div className="text-yellow-700 text-sm space-y-2">
          <p><strong>Current Model Performance:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accuracy: {(overall_metrics.accuracy * 100).toFixed(1)}% - Below optimal threshold for medical applications</li>
            <li>Sensitivity: {(overall_metrics.sensitivity * 100).toFixed(1)}% - Low sensitivity may miss cancer cases (critical issue)</li>
            <li>Specificity: {(overall_metrics.specificity * 100).toFixed(1)}% - Moderate specificity, some false positives expected</li>
            <li>AUC Score: {overall_metrics.auc_score.toFixed(3)} - Poor discriminative ability, model needs improvement</li>
          </ul>
          <p className="mt-3"><strong>Recommendations:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Increase training data size and diversity</li>
            <li>Implement data augmentation techniques</li>
            <li>Consider ensemble methods or transfer learning</li>
            <li>Optimize decision threshold for higher sensitivity in medical context</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelEvaluationCharts;
