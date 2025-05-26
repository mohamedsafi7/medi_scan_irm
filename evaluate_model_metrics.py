import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import (
    classification_report, confusion_matrix,
    precision_recall_fscore_support, roc_auc_score,
    precision_recall_curve, roc_curve
)
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
import pandas as pd
import json
from datetime import datetime

# Configuration
DATA_DIR = Path("data/Breast Cancer Patients MRI's")
VALIDATION_DIR = DATA_DIR / "validation"
MODEL_PATH = "mri_cancer_model.h5"
RESULTS_DIR = Path("evaluation_results")
RESULTS_DIR.mkdir(exist_ok=True)

# Image parameters
IMG_HEIGHT = 224
IMG_WIDTH = 224
BATCH_SIZE = 32

def load_validation_data():
    """Load and prepare validation data"""
    validation_datagen = ImageDataGenerator(rescale=1./255)

    validation_generator = validation_datagen.flow_from_directory(
        VALIDATION_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False  # Important for consistent evaluation
    )

    return validation_generator

def calculate_comprehensive_metrics(model, validation_generator):
    """Calculate comprehensive evaluation metrics"""
    print("Calculating comprehensive metrics...")

    # Get predictions
    predictions = model.predict(validation_generator)
    predicted_classes = np.argmax(predictions, axis=1)
    predicted_probabilities = predictions[:, 1]  # Probability of positive class

    # Get true labels
    true_classes = validation_generator.classes

    # Class names
    class_names = list(validation_generator.class_indices.keys())

    # Calculate metrics
    precision, recall, f1, support = precision_recall_fscore_support(
        true_classes, predicted_classes, average=None
    )

    # Overall metrics
    precision_macro = precision_recall_fscore_support(
        true_classes, predicted_classes, average='macro'
    )[0]
    recall_macro = precision_recall_fscore_support(
        true_classes, predicted_classes, average='macro'
    )[1]
    f1_macro = precision_recall_fscore_support(
        true_classes, predicted_classes, average='macro'
    )[2]

    # Weighted metrics (better for imbalanced datasets)
    precision_weighted = precision_recall_fscore_support(
        true_classes, predicted_classes, average='weighted'
    )[0]
    recall_weighted = precision_recall_fscore_support(
        true_classes, predicted_classes, average='weighted'
    )[1]
    f1_weighted = precision_recall_fscore_support(
        true_classes, predicted_classes, average='weighted'
    )[2]

    # AUC Score
    auc_score = roc_auc_score(true_classes, predicted_probabilities)

    # Confusion Matrix
    cm = confusion_matrix(true_classes, predicted_classes)

    # Specificity and Sensitivity (for medical applications)
    tn, fp, fn, tp = cm.ravel()
    sensitivity = tp / (tp + fn)  # Recall for positive class
    specificity = tn / (tn + fp)  # True negative rate

    # Positive and Negative Predictive Values
    ppv = tp / (tp + fp) if (tp + fp) > 0 else 0  # Precision for positive class
    npv = tn / (tn + fn) if (tn + fn) > 0 else 0  # Negative predictive value

    # Accuracy
    accuracy = (tp + tn) / (tp + tn + fp + fn)

    metrics = {
        'timestamp': datetime.now().isoformat(),
        'model_path': MODEL_PATH,
        'total_samples': len(true_classes),
        'class_distribution': {
            class_names[0]: int(support[0]),
            class_names[1]: int(support[1])
        },
        'confusion_matrix': {
            'true_negative': int(tn),
            'false_positive': int(fp),
            'false_negative': int(fn),
            'true_positive': int(tp)
        },
        'per_class_metrics': {
            class_names[0]: {
                'precision': float(precision[0]),
                'recall': float(recall[0]),
                'f1_score': float(f1[0]),
                'support': int(support[0])
            },
            class_names[1]: {
                'precision': float(precision[1]),
                'recall': float(recall[1]),
                'f1_score': float(f1[1]),
                'support': int(support[1])
            }
        },
        'overall_metrics': {
            'accuracy': float(accuracy),
            'precision_macro': float(precision_macro),
            'recall_macro': float(recall_macro),
            'f1_macro': float(f1_macro),
            'precision_weighted': float(precision_weighted),
            'recall_weighted': float(recall_weighted),
            'f1_weighted': float(f1_weighted),
            'auc_score': float(auc_score),
            'sensitivity': float(sensitivity),
            'specificity': float(specificity),
            'positive_predictive_value': float(ppv),
            'negative_predictive_value': float(npv)
        }
    }

    return metrics, predictions, true_classes, predicted_probabilities

def plot_confusion_matrix(cm, class_names, save_path):
    """Plot and save confusion matrix"""
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names, yticklabels=class_names)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig(save_path, dpi=300, bbox_inches='tight')
    plt.close()

def plot_roc_curve(true_classes, predicted_probabilities, auc_score, save_path):
    """Plot and save ROC curve"""
    fpr, tpr, _ = roc_curve(true_classes, predicted_probabilities)

    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, color='darkorange', lw=2,
             label=f'ROC curve (AUC = {auc_score:.3f})')
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc="lower right")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300, bbox_inches='tight')
    plt.close()

def plot_precision_recall_curve(true_classes, predicted_probabilities, save_path):
    """Plot and save Precision-Recall curve"""
    precision_curve, recall_curve, _ = precision_recall_curve(true_classes, predicted_probabilities)

    plt.figure(figsize=(8, 6))
    plt.plot(recall_curve, precision_curve, color='blue', lw=2)
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300, bbox_inches='tight')
    plt.close()

def generate_detailed_report(metrics):
    """Generate a detailed text report"""
    report = f"""
# MediScan AI Model Evaluation Report
Generated on: {metrics['timestamp']}
Model: {metrics['model_path']}

## Dataset Information
- Total samples: {metrics['total_samples']}
- Class distribution:
  - Healthy: {metrics['class_distribution']['Healthy']} samples
  - Sick: {metrics['class_distribution']['Sick']} samples

## Confusion Matrix
- True Negatives (Healthy correctly identified): {metrics['confusion_matrix']['true_negative']}
- False Positives (Healthy misclassified as Sick): {metrics['confusion_matrix']['false_positive']}
- False Negatives (Sick misclassified as Healthy): {metrics['confusion_matrix']['false_negative']}
- True Positives (Sick correctly identified): {metrics['confusion_matrix']['true_positive']}

## Key Medical Metrics
- **Sensitivity (Recall)**: {metrics['overall_metrics']['sensitivity']:.3f}
  - Ability to correctly identify sick patients
- **Specificity**: {metrics['overall_metrics']['specificity']:.3f}
  - Ability to correctly identify healthy patients
- **Positive Predictive Value (Precision)**: {metrics['overall_metrics']['positive_predictive_value']:.3f}
  - When model predicts sick, probability it's correct
- **Negative Predictive Value**: {metrics['overall_metrics']['negative_predictive_value']:.3f}
  - When model predicts healthy, probability it's correct

## Overall Performance Metrics
- **Accuracy**: {metrics['overall_metrics']['accuracy']:.3f}
- **AUC Score**: {metrics['overall_metrics']['auc_score']:.3f}
- **F1 Score (Weighted)**: {metrics['overall_metrics']['f1_weighted']:.3f}
- **Precision (Weighted)**: {metrics['overall_metrics']['precision_weighted']:.3f}
- **Recall (Weighted)**: {metrics['overall_metrics']['recall_weighted']:.3f}

## Per-Class Performance
### Healthy Class:
- Precision: {metrics['per_class_metrics']['Healthy']['precision']:.3f}
- Recall: {metrics['per_class_metrics']['Healthy']['recall']:.3f}
- F1-Score: {metrics['per_class_metrics']['Healthy']['f1_score']:.3f}

### Sick Class:
- Precision: {metrics['per_class_metrics']['Sick']['precision']:.3f}
- Recall: {metrics['per_class_metrics']['Sick']['recall']:.3f}
- F1-Score: {metrics['per_class_metrics']['Sick']['f1_score']:.3f}

## Recommendations for Optimization
"""

    # Add specific recommendations based on metrics
    sensitivity = metrics['overall_metrics']['sensitivity']
    specificity = metrics['overall_metrics']['specificity']

    if sensitivity < 0.8:
        report += "\n- ⚠️  LOW SENSITIVITY: Consider adjusting decision threshold to reduce false negatives"
    if specificity < 0.8:
        report += "\n- ⚠️  LOW SPECIFICITY: Consider improving model to reduce false positives"
    if metrics['overall_metrics']['auc_score'] < 0.8:
        report += "\n- ⚠️  LOW AUC: Model needs significant improvement in discriminative ability"

    return report

def main():
    """Main evaluation function"""
    print("Starting comprehensive model evaluation...")

    # Check if model exists
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model file {MODEL_PATH} not found!")
        print("Please train the model first using train_mri_model.py")
        return

    # Load model
    print(f"Loading model from {MODEL_PATH}...")
    model = load_model(MODEL_PATH)

    # Load validation data
    print("Loading validation data...")
    validation_generator = load_validation_data()

    # Calculate metrics
    metrics, predictions, true_classes, predicted_probabilities = calculate_comprehensive_metrics(
        model, validation_generator
    )

    # Save metrics to JSON
    metrics_file = RESULTS_DIR / f"metrics_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(metrics_file, 'w') as f:
        json.dump(metrics, f, indent=2)
    print(f"Metrics saved to {metrics_file}")

    # Generate and save plots
    class_names = list(validation_generator.class_indices.keys())
    cm = confusion_matrix(true_classes, np.argmax(predictions, axis=1))

    plot_confusion_matrix(cm, class_names, RESULTS_DIR / "confusion_matrix.png")
    plot_roc_curve(true_classes, predicted_probabilities,
                   metrics['overall_metrics']['auc_score'], RESULTS_DIR / "roc_curve.png")
    plot_precision_recall_curve(true_classes, predicted_probabilities,
                                RESULTS_DIR / "precision_recall_curve.png")

    # Generate detailed report
    report = generate_detailed_report(metrics)
    report_file = RESULTS_DIR / f"evaluation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"\n{'='*60}")
    print("EVALUATION COMPLETE!")
    print(f"{'='*60}")
    print(f"Results saved in: {RESULTS_DIR}")
    print(f"- Metrics: {metrics_file.name}")
    print(f"- Report: {report_file.name}")
    print(f"- Confusion Matrix: confusion_matrix.png")
    print(f"- ROC Curve: roc_curve.png")
    print(f"- Precision-Recall Curve: precision_recall_curve.png")

    # Print key metrics
    print(f"\n📊 KEY METRICS:")
    print(f"Accuracy: {metrics['overall_metrics']['accuracy']:.3f}")
    print(f"Sensitivity: {metrics['overall_metrics']['sensitivity']:.3f}")
    print(f"Specificity: {metrics['overall_metrics']['specificity']:.3f}")
    print(f"AUC Score: {metrics['overall_metrics']['auc_score']:.3f}")
    print(f"F1 Score: {metrics['overall_metrics']['f1_weighted']:.3f}")

if __name__ == "__main__":
    main()
