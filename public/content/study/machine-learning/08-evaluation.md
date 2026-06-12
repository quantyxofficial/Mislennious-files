---
id: evaluation
title: Model Evaluation
description: Beyond Accuracy - Precision, Recall, and F1-Score.
order: 8
---

## Is 99% Accuracy Good?

Not if 99% of your transactions are Legit and only 1% are Fraud.
A model that predicts "All Legit" has 99% accuracy but misses every fraud.

### The Confusion Matrix

| | Predicted Negative | Predicted Positive |
|---|---|---|
| **Actual Negative** | True Negative (TN) | False Positive (FP) |
| **Actual Positive** | False Negative (FN) | True Positive (TP) |

### Key Metrics

1.  **Precision**: Of all predicted positives, how many were real? (Avoid False Alarms).
    *   `TP / (TP + FP)`
2.  **Recall**: Of all real positives, how many did we catch? (Avoid Missed Cases).
    *   `TP / (TP + FN)`
3.  **F1-Score**: The harmonic mean of Precision and Recall. The best balance.

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))
```
