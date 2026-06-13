---
id: data-quality
title: Data Quality & Leakage
description: Why 80% of ML is data — health scores, leakage detection, and the trap of fake accuracy.
order: 3
---

## The Uncomfortable Truth

Beginners obsess over which algorithm to use. Professionals know the secret: **the algorithm is rarely the bottleneck — the data is.** A mediocre model on clean, honest data beats a brilliant model on broken data every time. This is why the famous saying survives:

> Garbage in, garbage out.

This chapter is about catching garbage *before* it poisons your model. It's the single highest-leverage skill in machine learning, and it's where KaizenStat earns its keep.

## The Data Health Score

KaizenStat's `health()` method scores your dataset from **0 to 100** across quality dimensions, then explains each penalty:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
result = doctor.health()

result.score        # → 71.0
result.grade        # → "C"
result.risk_level   # → "MEDIUM"
result.summary      # → human-readable breakdown
```

The score drops for the problems that quietly wreck models:

| Penalty | What it catches |
|---|---|
| Missing values | Columns full of nulls the model can't use |
| Duplicate rows | Inflate your test score with leaked copies |
| Constant columns | Features that carry zero information |
| High cardinality | ID-like columns that memorize rather than generalize |
| Outliers | Extreme values that distort linear models |
| Class imbalance | A target where one class is rare |
| Skewed distributions | Features that violate model assumptions |
| Type mismatches | Numbers stored as text, dates as strings |

A grade of A–B means you can train with confidence. A C or below means **fix first, train later** — otherwise you're optimizing on a broken foundation.

## The #1 Killer: Data Leakage

If you remember one thing from this entire course, make it this. **Leakage is when information from the answer sneaks into your features.** The model "cheats" by reading the answer in disguise, scores near-perfect in testing — and then collapses in the real world, where that information isn't available yet.

### A concrete example

You're predicting whether a customer will churn. Your dataset includes a column `account_closed_date`. Sounds harmless — but a customer only has a closing date *because* they churned. The model learns "closing date is filled in → churn = yes" and hits 99% accuracy. In production, you're trying to predict churn *before* it happens, so that column is always empty. Your "99% model" is useless.

```
❌ Others:    "Found the best model → Accuracy: 1.0"
✅ KaizenStat: "This result is fake. Your data is leaking."
```

### Catching it automatically

`validate()` flags any feature suspiciously correlated with the target (correlation > 0.98) and explains it in plain English:

```python
report = doctor.validate()

report.passed   # → False
report.issues   # → list of issues, including leakage
```

```
🚨 Leakage detected in: ['account_closed_date']
   This feature is almost perfectly correlated with the target.
   It likely contains information unavailable at prediction time.
   Remove it before training.
```

A real-world rule of thumb: **if a feature looks too good, it's probably leaking.** Ask yourself for every column — *"Would I actually know this value at the moment I need to make the prediction?"* If the answer is no, drop it.

## Other Validation Checks

`validate()` runs a full statistical audit, not just leakage:

- **Normality** (Shapiro-Wilk) — flags columns that aren't normally distributed, which matters for linear models.
- **Multicollinearity** (VIF) — flags features that are redundant with each other, which makes linear coefficients unstable.
- **Skewness** — flags heavily lopsided distributions that may need a log transform.
- **Feature–target leakage** — the killer above.

```python
report = doctor.validate()
for issue in report.issues:
    print(issue.severity, issue.message)
```

## Drift: When Today's Data Stops Looking Like Yesterday's

A model is only valid on data that resembles what it trained on. If your production data *drifts* — incomes rise, behavior shifts, a new product launches — accuracy silently decays. KaizenStat detects drift with a Kolmogorov–Smirnov test comparing two splits:

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns=["churn"])
X_train, X_test = train_test_split(X, test_size=0.2)

drifted = doctor.detect_drift(X_train, X_test)
# → {"income": 0.0021, "age": 0.041}   (p < 0.05 = significant drift)
```

Any feature with `p < 0.05` has shifted meaningfully. In production you'd run this monthly against fresh data and retrain when drift appears.

## The Professional's Mindset

Before training *anything*, a serious practitioner asks three questions:

1. **Is the data healthy?** → `doctor.health()`
2. **Is it honest (no leakage)?** → `doctor.validate()`
3. **Will it stay valid over time?** → `doctor.detect_drift()`

Only when all three pass do you move to modeling. In the next chapter we'll take the problems `health()` surfaced and *fix* them — safely, and without ever silently mangling your original data.
