---
id: logistic-regression
title: Logistic Regression
description: The workhorse of classification — sigmoid, decision boundaries, and probabilities.
order: 6
---

## From Numbers to Categories

Despite the name, **logistic regression is a classification algorithm.** It answers yes/no questions: *Will this customer churn? Is this email spam? Is this transaction fraud?* It's the most widely deployed classifier in industry — fast, interpretable, and shockingly hard to beat as a baseline.

## The Problem With Using a Line

Why not just use linear regression for a yes/no target coded as 0 and 1? Because a straight line shoots off to `+∞` and `−∞` — it would predict "probability 1.7" or "−0.3", which is nonsense. We need to **squash** the output into the valid probability range of 0 to 1. Enter the sigmoid.

## The Sigmoid Function

Logistic regression takes the familiar linear combination `z = w₁x₁ + w₂x₂ + ... + b` and passes it through the **sigmoid** (logistic) function:

```
sigmoid(z) = 1 / (1 + e^(−z))
```

The sigmoid is an S-shaped curve that maps any number to a value between 0 and 1:

- Large positive `z` → output near **1** (confident "yes")
- Large negative `z` → output near **0** (confident "no")
- `z = 0` → output exactly **0.5** (maximally uncertain)

So the model outputs a **probability**, not a hard label. To get a class, you threshold it:

```
probability ≥ 0.5  →  class 1 (yes)
probability < 0.5  →  class 0 (no)
```

That 0.5 threshold is a *choice*, not a law — and tuning it is one of the most practical levers you have, which we'll see in the evaluation chapter.

## The Decision Boundary

Geometrically, logistic regression draws a straight **decision boundary** through feature space. On one side it predicts "yes," on the other "no." With two features it's a line; with three, a plane; with many, a hyperplane. The boundary is linear — which is logistic regression's strength (simple, stable) and its limit (it can't carve out curved or interlocking regions; trees handle those).

## How It Learns: Log Loss

Linear regression minimized squared error. Classification minimizes **log loss** (cross-entropy), which rewards confident *correct* predictions and savagely punishes confident *wrong* ones:

```
If the true answer is "yes" (1):
   model said 0.99  →  tiny loss   (confident and right)
   model said 0.01  →  huge loss   (confident and wrong)
```

This is exactly the behavior you want — a model that's certain and mistaken is dangerous, so training pushes hard against it. The same gradient-descent machinery from the last chapter finds the weights that minimize this loss.

## Implementation

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

model.predict(X_test)          # → hard labels:  [0, 1, 1, 0, ...]
model.predict_proba(X_test)    # → probabilities: [[0.8, 0.2], [0.3, 0.7], ...]
```

`predict_proba` is the underrated hero here. A spam filter that says "97% spam" is far more useful than one that just says "spam" — you can route the borderline cases for review.

## Interpreting the Coefficients

Like linear regression, the learned weights are readable. A **positive** coefficient means that feature pushes toward class 1; **negative** pushes toward class 0; larger magnitude means stronger influence. This interpretability is why regulated industries (lending, insurance, healthcare) lean on logistic regression — you can explain *why* a prediction was made.

## The Imbalance Trap

Suppose only 2% of transactions are fraud. A lazy model that predicts "not fraud" every single time is **98% accurate** — and completely worthless. This is the classic failure mode of classification on imbalanced data, and accuracy hides it. The fixes:

- Set `class_weight="balanced"` so the model is penalized more for missing the rare class.
- Resample (oversample the minority, e.g. SMOTE; or undersample the majority).
- **Stop trusting accuracy** — use precision, recall, and F1 (next-but-one chapter).

```python
model = LogisticRegression(class_weight="balanced", max_iter=1000)
```

## With KaizenStat

When your target has discrete classes, `DataDoctor` detects a *classification* task, includes logistic regression in its benchmark, and — crucially — **flags imbalance before it fools you**:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("transactions.csv", target="is_fraud")
doctor.health()    # → "⚠ Class imbalance: minority class is 2.1%"
result = doctor.train()

result.task          # → "classification"
result.model_name    # → the winning classifier
result.test_score    # → accuracy (but you'll want F1 — see Chapter 10)
```

KaizenStat automatically adds `class_weight="balanced"` for imbalanced targets and reports per-class metrics, so the 98%-accurate-but-useless model never sneaks past you. Logistic regression is the honest baseline; in the next two chapters we meet the models that beat it on complex, non-linear data.
