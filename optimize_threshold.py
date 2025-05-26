import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import (
    precision_recall_fscore_support, roc_curve, 
    precision_recall_curve, confusion_matrix
)
import matplotlib.pyplot as plt
from pathlib import Path
import pandas as pd

# Configuration
DATA_DIR = Path("data/Breast Cancer Patients MRI's")
VALIDATION_DIR = DATA_DIR / "validation"
MODEL_PATH = "mri_cancer_model.h5"
RESULTS_DIR = Path("threshold_optimization")
RESULTS_DIR.mkdir(exist_ok=True)

# Image parameters
IMG_HEIGHT = 224
IMG_WIDTH = 224
BATCH_SIZE = 32

def load_validation_data():
    """Load validation data"""
    validation_datagen = ImageDataGenerator(rescale=1./255)
    
    validation_generator = validation_datagen.flow_from_directory(
        VALIDATION_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )
    
    return validation_generator

def find_optimal_threshold(y_true, y_prob, metric='f1'):
    """
    Find optimal threshold based on different metrics
    
    Args:
        y_true: True labels
        y_prob: Predicted probabilities
        metric: Metric to optimize ('f1', 'precision', 'recall', 'youden')
    
    Returns:
        optimal_threshold, best_score
    """
    thresholds = np.arange(0.1, 0.9, 0.01)
    scores = []
    
    for threshold in thresholds:
        y_pred = (y_prob >= threshold).astype(int)
        
        if metric == 'f1':
            _, _, f1, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')
            scores.append(f1)
        elif metric == 'precision':
            precision, _, _, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')
            scores.append(precision)
        elif metric == 'recall':
            _, recall, _, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')
            scores.append(recall)
        elif metric == 'youden':
            # Youden's J statistic = Sensitivity + Specificity - 1
            cm = confusion_matrix(y_true, y_pred)
            if cm.shape == (2, 2):
                tn, fp, fn, tp = cm.ravel()
                sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
                specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
                youden_j = sensitivity + specificity - 1
                scores.append(youden_j)
            else:
                scores.append(0)
    
    best_idx = np.argmax(scores)
    optimal_threshold = thresholds[best_idx]
    best_score = scores[best_idx]
    
    return optimal_threshold, best_score, thresholds, scores

def evaluate_threshold(y_true, y_prob, threshold):
    """Evaluate model performance at a specific threshold"""
    y_pred = (y_prob >= threshold).astype(int)
    
    # Calculate metrics
    precision, recall, f1, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    if cm.shape == (2, 2):
        tn, fp, fn, tp = cm.ravel()
        
        # Calculate additional metrics
        accuracy = (tp + tn) / (tp + tn + fp + fn)
        sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
        specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
        ppv = tp / (tp + fp) if (tp + fp) > 0 else 0  # Positive Predictive Value
        npv = tn / (tn + fn) if (tn + fn) > 0 else 0  # Negative Predictive Value
        
        return {
            'threshold': threshold,
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1,
            'sensitivity': sensitivity,
            'specificity': specificity,
            'ppv': ppv,
            'npv': npv,
            'true_positives': tp,
            'true_negatives': tn,
            'false_positives': fp,
            'false_negatives': fn
        }
    else:
        return None

def plot_threshold_optimization(thresholds, scores, metric, optimal_threshold, save_path):
    """Plot threshold optimization curve"""
    plt.figure(figsize=(10, 6))
    plt.plot(thresholds, scores, 'b-', linewidth=2)
    plt.axvline(x=optimal_threshold, color='r', linestyle='--', 
                label=f'Optimal threshold: {optimal_threshold:.3f}')
    plt.xlabel('Threshold')
    plt.ylabel(f'{metric.title()} Score')
    plt.title(f'{metric.title()} vs Threshold')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300, bbox_inches='tight')
    plt.close()

def plot_precision_recall_vs_threshold(y_true, y_prob, save_path):
    """Plot precision and recall vs threshold"""
    precision_curve, recall_curve, thresholds = precision_recall_curve(y_true, y_prob)
    
    plt.figure(figsize=(10, 6))
    plt.plot(thresholds, precision_curve[:-1], 'b-', label='Precision', linewidth=2)
    plt.plot(thresholds, recall_curve[:-1], 'r-', label='Recall', linewidth=2)
    plt.xlabel('Threshold')
    plt.ylabel('Score')
    plt.title('Precision and Recall vs Threshold')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300, bbox_inches='tight')
    plt.close()

def create_threshold_comparison_table(y_true, y_prob):
    """Create a comparison table for different thresholds"""
    thresholds_to_test = [0.3, 0.4, 0.5, 0.6, 0.7]
    
    results = []
    for threshold in thresholds_to_test:
        result = evaluate_threshold(y_true, y_prob, threshold)
        if result:
            results.append(result)
    
    # Find optimal thresholds for different metrics
    optimal_f1_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'f1')
    optimal_precision_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'precision')
    optimal_recall_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'recall')
    optimal_youden_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'youden')
    
    # Add optimal thresholds to results
    for threshold in [optimal_f1_threshold, optimal_precision_threshold, 
                     optimal_recall_threshold, optimal_youden_threshold]:
        result = evaluate_threshold(y_true, y_prob, threshold)
        if result and not any(abs(r['threshold'] - threshold) < 0.01 for r in results):
            results.append(result)
    
    # Sort by threshold
    results.sort(key=lambda x: x['threshold'])
    
    return pd.DataFrame(results)

def generate_optimization_report(df, y_true, y_prob):
    """Generate a comprehensive threshold optimization report"""
    # Find optimal thresholds
    optimal_f1_threshold, best_f1, _, _ = find_optimal_threshold(y_true, y_prob, 'f1')
    optimal_precision_threshold, best_precision, _, _ = find_optimal_threshold(y_true, y_prob, 'precision')
    optimal_recall_threshold, best_recall, _, _ = find_optimal_threshold(y_true, y_prob, 'recall')
    optimal_youden_threshold, best_youden, _, _ = find_optimal_threshold(y_true, y_prob, 'youden')
    
    report = f"""
# Threshold Optimization Report

## Optimal Thresholds for Different Metrics

### F1 Score Optimization
- **Optimal Threshold**: {optimal_f1_threshold:.3f}
- **Best F1 Score**: {best_f1:.3f}
- **Recommendation**: Use this threshold for balanced precision and recall

### Precision Optimization  
- **Optimal Threshold**: {optimal_precision_threshold:.3f}
- **Best Precision**: {best_precision:.3f}
- **Recommendation**: Use this threshold to minimize false positives

### Recall Optimization
- **Optimal Threshold**: {optimal_recall_threshold:.3f}
- **Best Recall**: {best_recall:.3f}
- **Recommendation**: Use this threshold to minimize false negatives (critical in medical diagnosis)

### Youden's J Statistic Optimization
- **Optimal Threshold**: {optimal_youden_threshold:.3f}
- **Best Youden's J**: {best_youden:.3f}
- **Recommendation**: Use this threshold for optimal balance of sensitivity and specificity

## Medical Context Recommendations

For breast cancer detection, **high sensitivity (recall) is typically more important** than high precision because:
- Missing a cancer case (false negative) is more dangerous than a false alarm (false positive)
- False positives can be caught in follow-up examinations
- False negatives may lead to delayed treatment

**Recommended threshold for medical use**: {optimal_recall_threshold:.3f} (optimized for recall)

## Threshold Comparison Table

The following table shows performance metrics at different thresholds:
"""
    
    return report

def main():
    """Main threshold optimization function"""
    print("Starting threshold optimization...")
    
    # Check if model exists
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model file {MODEL_PATH} not found!")
        print("Please train the model first.")
        return
    
    # Load model
    print(f"Loading model from {MODEL_PATH}...")
    model = load_model(MODEL_PATH)
    
    # Load validation data
    print("Loading validation data...")
    validation_generator = load_validation_data()
    
    # Get predictions
    print("Getting model predictions...")
    predictions = model.predict(validation_generator)
    y_prob = predictions[:, 1]  # Probability of positive class (sick)
    y_true = validation_generator.classes
    
    print(f"Total samples: {len(y_true)}")
    print(f"Positive samples: {sum(y_true)}")
    print(f"Negative samples: {len(y_true) - sum(y_true)}")
    
    # Create comparison table
    print("Creating threshold comparison table...")
    df = create_threshold_comparison_table(y_true, y_prob)
    
    # Save comparison table
    df.to_csv(RESULTS_DIR / "threshold_comparison.csv", index=False)
    print(f"Threshold comparison saved to {RESULTS_DIR / 'threshold_comparison.csv'}")
    
    # Generate plots
    print("Generating optimization plots...")
    
    # Plot optimization curves for different metrics
    metrics = ['f1', 'precision', 'recall', 'youden']
    for metric in metrics:
        optimal_threshold, best_score, thresholds, scores = find_optimal_threshold(y_true, y_prob, metric)
        plot_threshold_optimization(thresholds, scores, metric, optimal_threshold, 
                                  RESULTS_DIR / f"{metric}_optimization.png")
    
    # Plot precision-recall vs threshold
    plot_precision_recall_vs_threshold(y_true, y_prob, RESULTS_DIR / "precision_recall_vs_threshold.png")
    
    # Generate report
    print("Generating optimization report...")
    report = generate_optimization_report(df, y_true, y_prob)
    
    # Save report
    report_file = RESULTS_DIR / "threshold_optimization_report.md"
    with open(report_file, 'w') as f:
        f.write(report)
        f.write("\n\n")
        f.write(df.to_string(index=False))
    
    print(f"\n{'='*60}")
    print("THRESHOLD OPTIMIZATION COMPLETE!")
    print(f"{'='*60}")
    print(f"Results saved in: {RESULTS_DIR}")
    print(f"- Comparison table: threshold_comparison.csv")
    print(f"- Optimization report: threshold_optimization_report.md")
    print(f"- Optimization plots: *_optimization.png")
    
    # Print key recommendations
    optimal_recall_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'recall')
    optimal_f1_threshold, _, _, _ = find_optimal_threshold(y_true, y_prob, 'f1')
    
    print(f"\n🎯 KEY RECOMMENDATIONS:")
    print(f"For medical diagnosis (high sensitivity): Use threshold {optimal_recall_threshold:.3f}")
    print(f"For balanced performance: Use threshold {optimal_f1_threshold:.3f}")
    print(f"Default threshold (0.5) may not be optimal!")

if __name__ == "__main__":
    main()
