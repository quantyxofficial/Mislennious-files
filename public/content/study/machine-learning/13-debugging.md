---
id: debugging
title: Debugging a Failing Model
description: "Root-cause analysis — failure slices, data-vs-model blame, and what to fix next."
order: 13
---

## The Question Nobody Teaches You to Ask

Most courses end at "here's your accuracy score." But in the real world, your first model is usually *disappointing* — 0.71 when you needed 0.85 — and the hard, valuable skill is answering: **why is it failing, and what do I change?** Randomly swapping algorithms and re-tuning is how beginners burn weeks. Professionals *diagnose*. This chapter is that diagnostic process — and it's where KaizenStat is genuinely unique among ML libraries.

## Is It the Data or the Model?

The first and most important fork. A weak model can mean two very different things:

- **Model problem** — your data is fine, but you picked a weak algorithm or bad hyperparameters. Fix: try a stronger model, tune, ensemble.
- **Data problem** — the signal simply isn't in your features. No algorithm can predict the unpredictable. Fix: collect better features, fix labels, gather more data.

Confusing these wastes enormous effort. If it's a *data* problem, no amount of tuning XGBoost will save you — you'll grind for days for a 1% gain when the real answer was "add a feature."

### How to tell them apart

Fit a strong baseline (a Random Forest) on your data. The logic:

- If even the baseline scores poorly (< 0.60) → the **data** lacks signal. Stop tuning; go get better features.
- If the baseline scores well (≥ 0.70) but your model is much lower → it's a **model** problem. Tune or ensemble.

KaizenStat runs exactly this check inside `debug_model()` and tells you the verdict in plain language.

## Failure Slices: Where Exactly Does It Break?

A model that's 81% accurate *overall* is not 81% accurate *everywhere*. It might be 90% on most customers and 52% on customers from one city — and that hidden failure pocket is often the whole problem. Aggregate metrics paper over it. **Failure-slice analysis** breaks accuracy down by subgroup to expose where the model collapses:

```
Failure Slice: city
Overall 81%, but  city='NY': 52% (34 samples)   city='Chicago': 65% (28 samples)
```

Now you know *exactly* where to act — collect more NY samples, or engineer a feature that helps the model there. This is how fairness bugs and silent production failures get caught before they ship.

## Feature Impact: What's Actually Driving Predictions?

To understand a model, measure how much it *needs* each feature. **Counterfactual feature impact** removes each feature and measures how far accuracy drops — a big drop means the feature was load-bearing:

```python
impacts = doctor.feature_impact(top_n=10)
# → {"credit_score": 0.18, "income": 0.11, "tenure": 0.04, ...}
```

This does two jobs: it reveals which features matter (focus your engineering there), and it can expose **leakage** — if one feature is doing *all* the work, it may be cheating (recall Chapter 3).

## The Full Diagnosis: debug_model()

KaizenStat folds every technique above into one call. It runs `train()` first if needed, then delivers a complete root-cause report:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
doctor.train()
result = doctor.debug_model()

result.label               # → "overfitting" / "underfitting" / "class_imbalance" / ...
result.severity            # → "HIGH" / "MEDIUM" / "LOW"
result.confidence          # → 0.85   (how sure the diagnosis is)
result.diagnosis           # → plain-English description of the problem
result.root_cause          # → the underlying cause
result.why_bullets         # → evidence: ["Train 0.94 vs test 0.80 — 14% gap", ...]
result.feature_importances # → ranked feature contributions
result.issues              # → failure slices + data-vs-model blame
```

It diagnoses across 13 distinct labels — overfitting, underfitting, imbalance, leakage, weak features, unstable CV, and more — and **runs the failure-slice and data-vs-model checks automatically.** Instead of staring at a number, you get a doctor's chart: what's wrong, how sure, why, and where.

## From Diagnosis to Prescription: improve()

A diagnosis is only useful if it tells you what to *do*. `improve()` converts the debug findings into a ranked, quantified action list:

```python
report = doctor.improve()
for s in report.suggestions:
    print(f"[{s.impact}] {s.action} — {s.expected_gain}")
```

```
[HIGH]   Ensemble / AutoML   → train_auto(tune=True, ensemble=True)
                               Expected: +8–14% accuracy from stacking + tuning
[HIGH]   Class Imbalance     → apply class_weight='balanced' or SMOTE
                               Expected: +20–30% minority-class recall and F1
[HIGH]   Subgroup Fix: city  → collect more samples for failing slice 'city'
                               Expected: +3–8% overall F1
[MEDIUM] Calibration         → check trust_score(); apply Platt scaling
                               Expected: +0.03–0.08 calibration gap reduction
```

These aren't generic platitudes — the gain estimates are derived from *your actual metrics* (your real imbalance ratio, your real gap-to-target). It's a prioritized to-do list, with the highest-leverage fix at the top.

## The Debugging Loop

Put together, the professional workflow is a loop, not a straight line:

```
train → debug_model → read the diagnosis → apply the top improve() suggestion → retrain → repeat
```

Each pass closes the highest-impact gap. You stop when the model clears your target metric *and* `debug_model()` reports no high-severity issues. That disciplined loop — diagnose, fix the biggest thing, remeasure — is what separates shipping a real model from endlessly fiddling.

Your model now performs well and you understand its weaknesses. One question remains before production: is it actually *safe to ship*? That's about trust and calibration — the next chapter.
