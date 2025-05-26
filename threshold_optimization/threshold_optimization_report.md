
# Threshold Optimization Report

## Optimal Thresholds for Different Metrics

### F1 Score Optimization
- **Optimal Threshold**: 0.220
- **Best F1 Score**: 0.702
- **Recommendation**: Use this threshold for balanced precision and recall

### Precision Optimization  
- **Optimal Threshold**: 0.280
- **Best Precision**: 0.562
- **Recommendation**: Use this threshold to minimize false positives

### Recall Optimization
- **Optimal Threshold**: 0.100
- **Best Recall**: 1.000
- **Recommendation**: Use this threshold to minimize false negatives (critical in medical diagnosis)

### Youden's J Statistic Optimization
- **Optimal Threshold**: 0.280
- **Best Youden's J**: 0.200
- **Recommendation**: Use this threshold for optimal balance of sensitivity and specificity

## Medical Context Recommendations

For breast cancer detection, **high sensitivity (recall) is typically more important** than high precision because:
- Missing a cancer case (false negative) is more dangerous than a false alarm (false positive)
- False positives can be caught in follow-up examinations
- False negatives may lead to delayed treatment

**Recommended threshold for medical use**: 0.100 (optimized for recall)

## Threshold Comparison Table

The following table shows performance metrics at different thresholds:


 threshold  accuracy  precision  recall  f1_score  sensitivity  specificity      ppv      npv  true_positives  true_negatives  false_positives  false_negatives
      0.10    0.5000   0.500000   1.000  0.666667        1.000        0.000 0.500000 0.000000              40               0               40                0
      0.22    0.5750   0.540541   1.000  0.701754        1.000        0.150 0.540541 1.000000              40               6               34                0
      0.28    0.6000   0.562500   0.900  0.692308        0.900        0.300 0.562500 0.750000              36              12               28                4
      0.30    0.5875   0.557377   0.850  0.673267        0.850        0.325 0.557377 0.684211              34              13               27                6
      0.40    0.4625   0.465116   0.500  0.481928        0.500        0.425 0.465116 0.459459              20              17               23               20
      0.50    0.4250   0.384615   0.250  0.303030        0.250        0.600 0.384615 0.444444              10              24               16               30
      0.60    0.3750   0.187500   0.075  0.107143        0.075        0.675 0.187500 0.421875               3              27               13               37
      0.70    0.3750   0.000000   0.000  0.000000        0.000        0.750 0.000000 0.428571               0              30               10               40