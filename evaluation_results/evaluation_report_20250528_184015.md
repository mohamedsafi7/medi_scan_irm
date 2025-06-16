
# MediScan AI Model Evaluation Report
Generated on: 2025-05-28T18:40:11.680675
Model: mri_cancer_model.h5

## Dataset Information
- Total samples: 80
- Class distribution:
  - Healthy: 40 samples
  - Sick: 40 samples

## Confusion Matrix
- True Negatives (Healthy correctly identified): 24
- False Positives (Healthy misclassified as Sick): 16
- False Negatives (Sick misclassified as Healthy): 30
- True Positives (Sick correctly identified): 10

## Key Medical Metrics
- **Sensitivity (Recall)**: 0.250
  - Ability to correctly identify sick patients
- **Specificity**: 0.600
  - Ability to correctly identify healthy patients
- **Positive Predictive Value (Precision)**: 0.385
  - When model predicts sick, probability it's correct
- **Negative Predictive Value**: 0.444
  - When model predicts healthy, probability it's correct

## Overall Performance Metrics
- **Accuracy**: 0.425
- **AUC Score**: 0.453
- **F1 Score (Weighted)**: 0.407
- **Precision (Weighted)**: 0.415
- **Recall (Weighted)**: 0.425

## Per-Class Performance
### Healthy Class:
- Precision: 0.444
- Recall: 0.600
- F1-Score: 0.511

### Sick Class:
- Precision: 0.385
- Recall: 0.250
- F1-Score: 0.303

## Recommendations for Optimization

- ⚠️  LOW SENSITIVITY: Consider adjusting decision threshold to reduce false negatives
- ⚠️  LOW SPECIFICITY: Consider improving model to reduce false positives
- ⚠️  LOW AUC: Model needs significant improvement in discriminative ability