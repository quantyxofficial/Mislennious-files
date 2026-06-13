---
id: evaluation
title: Model Evaluation Done Right
description: "Beyond accuracy — precision, recall, F1, ROC-AUC, and the confusion matrix."
order: 10
---

## Accuracy Is a Liar

We've warned about it twice; now we prove it. **Accuracy** is the fraction of predictions you got right — and on imbalanced data it is dangerously misleading. Detecting a disease that affects 1% of patients? A model that says "healthy" to everyone is **99% accurate** and catches *zero* sick people. Accuracy gave it an A+ for being useless.

Real evaluation means asking *what kind* of mistakes the model makes, and whether those mistakes are the ones you can afford. That starts with the confusion matrix.

## The Confusion Matrix

Every classification prediction lands in one of four boxes:

```
                    Predicted: No        Predicted: Yes
Actual: No      True Negative (TN)    False Positive (FP)
Actual: Yes     False Negative (FN)   True Positive (TP)
```

- **True Positive** — predicted yes, was yes. ✓
- **True Negative** — predicted no, was no. ✓
- **False Positive** — predicted yes, was no. A *false alarm.*
- **False Negative** — predicted no, was yes. A *miss.*

Everything else is built from these four numbers. The crucial insight: **FP and FN are different kinds of wrong, and they usually cost different amounts.**

```python
from sklearn.metrics import confusion_matrix
print(confusion_matrix(y_test, predictions))
```

## Precision vs. Recall

These are the two metrics that actually matter, and understanding the difference is what separates a real practitioner from a beginner.

**Precision** — of everything you *flagged* as positive, how much was truly positive?

```
Precision = TP / (TP + FP)
"When the model says YES, how often is it right?"
```

**Recall** (sensitivity) — of everything that *was* positive, how much did you *catch*?

```
Recall = TP / (TP + FN)
"Of all the real YES cases, how many did we find?"
```

### The tradeoff, with stakes

You almost always sacrifice one for the other, and which you favor depends entirely on the cost of each mistake:

- **Cancer screening** → maximize **recall.** A false alarm means an extra test; a miss means a death. Catch every possible case.
- **Spam filter** → maximize **precision.** A false alarm means a real email lost to the junk folder; a miss is just one more spam you scroll past. Be sure before you flag.

There is no universally "best" metric — only the right one for *your* costs. Choosing it is a business decision, not a math one.

## F1-Score: The Balance

When you need a single number that balances precision and recall, use the **F1-score** — their harmonic mean:

```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

The harmonic mean punishes imbalance: you can't game F1 by maxing one metric and tanking the other. **F1 is the right default headline metric for imbalanced classification** — far more honest than accuracy.

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, predictions))
#               precision    recall  f1-score   support
#            0       0.95      0.98      0.96       900
#            1       0.71      0.55      0.62       100   ← the rare class — the truth
```

That per-class breakdown is where the real story lives. Overall accuracy here might be 94%, but the minority class F1 of 0.62 tells you the model is mediocre at the thing you actually care about.

## ROC-AUC: Performance Across All Thresholds

Remember that classifiers output *probabilities*, and 0.5 is just a default threshold. The **ROC curve** plots the true-positive rate against the false-positive rate across *every* possible threshold. The **AUC** (Area Under the Curve) summarizes it in one number:

- **AUC = 1.0** → perfect separation of the classes.
- **AUC = 0.5** → no better than a coin flip.
- **AUC = 0.85** → a strong, useful model.

AUC is threshold-independent, so it measures the model's underlying *ranking* ability — does it give higher scores to true positives? — regardless of where you draw the line.

```python
from sklearn.metrics import roc_auc_score
auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
```

## Cross-Validation: Don't Trust One Split

A single train/test split can be lucky or unlucky. **K-fold cross-validation** splits the data into k parts, trains on k−1 and tests on the held-out fold, rotating through all k. You get k scores — their **mean** is a trustworthy estimate and their **standard deviation** tells you how stable the model is.

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5, scoring="f1")
print(f"{scores.mean():.3f} ± {scores.std():.3f}")
```

A high mean with a *low* std is what you want — good and consistent. High variance across folds is a warning sign of an unstable model or too-small data.

## Regression Metrics Recap

For numeric targets, accuracy/precision/recall don't apply. Use **MAE** (average error in real units), **RMSE** (penalizes big misses), and **R²** (fraction of variance explained), as covered in the linear regression chapter.

## KaizenStat Reports the Right Metrics Automatically

You don't assemble these by hand. `train()` returns the metrics that matter for your task, cross-validated, and `report()` lays out the full evaluation:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("transactions.csv", target="is_fraud")
result = doctor.train(cv=5)

result.cv_score      # → mean cross-validated score
result.cv_std        # → stability across folds
result.test_score    # → held-out test performance

doctor.report(open_browser=True)   # full HTML report: confusion matrix, per-class metrics, ROC
```

Because KaizenStat knows your target is imbalanced, it leads with F1 and per-class recall — not the accuracy number that would flatter a useless model. It evaluates the way a careful practitioner would, by default.

Now we turn to the deepest idea in all of ML — the reason evaluation is so fraught in the first place — overfitting and the bias-variance tradeoff.
