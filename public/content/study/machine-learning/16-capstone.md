---
id: capstone
title: "Capstone: Customer Churn End-to-End"
description: Ship a real model from raw CSV to deployable .joblib — the full KaizenStat workflow.
order: 16
---

## The Project

Time to put all sixteen chapters together on a real problem. A telecom company wants to know **which customers are about to churn** so it can intervene with retention offers. You have `customers.csv` — demographics, account details, usage, and a `churn` column (Yes/No). Your job: ship a model that flags at-risk customers, with probabilities the business can act on.

This is the exact workflow a professional data scientist runs. We'll do it twice: first the **AutoPilot** way (one call), then the **deliberate** way (step by step, understanding each decision). Both are real; you'll choose based on how much control you need.

## Path A — AutoPilot (the 4-line version)

For a fast, strong baseline that handles every step correctly, this is genuinely all you need:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
doctor.run()                                  # health → fix → train → debug → improve → report
model = doctor.quick_train(tune=True)         # tuned, production-ready pipeline
doctor.export_model("churn_model.joblib")     # ship it
```

`run()` prints a full diagnosis; `quick_train(tune=True)` returns a tuned pipeline; `export_model` saves it. For many real projects, this *is* the project. But let's now walk it deliberately, so you see — and control — every decision.

## Path B — The Deliberate Workflow

### Step 1 — Load and inspect

```python
from kaizenstat import DataDoctor

doctor = DataDoctor()
doctor.load("customers.csv")    # auto-shows shape, dtypes, and a preview
doctor.fit(target="churn")      # registers the target, detects task = classification
```

```
Dataset registered  │  7,043 rows × 21 columns  │  Task: classification  │  Mode: TABULAR
```

### Step 2 — Health check (Chapter 3)

```python
health = doctor.health()
print(health.score, health.grade)    # → 76.0  "C"
```

A C grade means problems worth fixing first. The breakdown flags missing values in `total_charges` and a high-cardinality `customer_id`. **Fix before training — never optimize on a broken foundation.**

### Step 3 — Validate for leakage (Chapter 3)

```python
report = doctor.validate()
print(report.passed)    # → True (no leakage) — or it would name the culprit column
```

This is the gate. If `validate()` flagged a leaking feature, we'd drop it here, before it inflates every downstream number into fiction.

### Step 4 — Fix the data (Chapter 4)

```python
doctor.fix(safe=True, preview_only=True)   # preview the plan, touch nothing
```

```
FixPlan — 3 actions
[LOW]  Coerce 'total_charges'  →  text → numeric
[LOW]  Impute 'total_charges'  →  median fill (11 nulls)
[LOW]  Drop 'customer_id'      →  high-cardinality ID, no signal
```

```python
doctor.fix(safe=True)    # apply LOW-risk fixes
```

### Step 5 — Train and benchmark (Chapters 5–8)

```python
result = doctor.train(cv=5, tune=True)
print(result.model_name, result.test_score)    # → "LightGBM"  0.81
```

KaizenStat benchmarked the whole model pool with 5-fold cross-validation, picked LightGBM, and ran progressive tuning on it. Note it auto-added `class_weight="balanced"` because churn is the minority class.

### Step 6 — Evaluate honestly (Chapter 10)

Accuracy isn't enough on imbalanced churn — we care about **recall** on churners (catching the customers about to leave):

```python
print(result.cv_score, "±", result.cv_std)    # → 0.80 ± 0.02  (strong and stable)
doctor.report(open_browser=True)               # confusion matrix, per-class F1, ROC-AUC
```

### Step 7 — Debug (Chapter 13)

```python
debug = doctor.debug_model()
print(debug.label, debug.severity)    # → "class_imbalance"  "MEDIUM"
for b in debug.why_bullets:
    print(b)
```

It surfaces a failure slice — recall is weak for month-to-month contract customers — pointing us at exactly where to improve.

### Step 8 — Improve (Chapter 13)

```python
for s in doctor.improve().suggestions:
    print(f"[{s.impact}] {s.action} — {s.expected_gain}")
```

```
[HIGH]   Ensemble / AutoML  → train_auto(tune=True, ensemble=True)  → +8–14% accuracy
[HIGH]   Class Imbalance    → already balanced; consider SMOTE       → +20–30% minority recall
```

So we take the top suggestion — go to a stacking ensemble:

```python
result = doctor.train_auto(cv=3, tune=True, ensemble=True)
print(result.model_name)    # → "Stack(LightGBM+XGBoost+ExtraTreesClassifier)"
print(result.test_score)    # → 0.84   (up from 0.81)
```

### Step 9 — Trust check (Chapter 14)

```python
trust = doctor.trust_score()
print(trust.score)    # → 79 / 100
```

KaizenStat auto-applied Platt calibration during training, so the churn *probabilities* are honest — the business can safely target everyone above, say, 60% churn risk.

### Step 10 — Ship it (Chapters 2 & 14)

```python
doctor.export_model("churn_model.joblib")      # the full pipeline, preprocessing included
doctor.codegen(output_path="pipeline.py")      # standalone script, no KaizenStat dependency
```

In production, load and serve — passing **raw** customer rows, exactly as they come from the database:

```python
import joblib, pandas as pd
model = joblib.load("churn_model.joblib")

at_risk = pd.read_csv("todays_customers.csv")
risk_scores = model.predict_proba(at_risk)[:, 1]    # probability of churn per customer
# → route everyone above 0.60 to the retention team
```

## What You Accomplished

You took a raw, imperfect CSV and shipped a **calibrated, ensemble, production-ready churn model** — and you understand every step:

- ✅ Diagnosed data health and ruled out leakage *before* trusting any score.
- ✅ Cleaned the data safely, without silently mangling the original.
- ✅ Benchmarked a full pool of models and tuned the winner.
- ✅ Evaluated with the *right* metric for an imbalanced problem.
- ✅ Debugged the failure, found the weak slice, and acted on the top suggestion.
- ✅ Upgraded to a stacking ensemble and verified production-readiness with a Trust Score.
- ✅ Exported a self-contained pipeline that serves raw data with no train/serve skew.

## Where to Go Next

You now have both the *understanding* and the *tools* to ship real machine learning. To keep growing:

- **Practice** — head to the problem set for this course and test every concept hands-on.
- **Go deeper** — explore the KaizenStat docs for the full API: `feature_impact()`, `detect_drift()`, custom checks via `add_check()`, and the `kz` command-line interface.
- **Build your own** — take a dataset you care about and run the ten-step workflow end to end. That first independent project is where it all clicks.

You started this course unable to train a model. You're finishing it able to *ship* one — and to defend it. That's the difference between knowing *about* machine learning and *doing* it. Congratulations.
