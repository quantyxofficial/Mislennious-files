---
id: trust
title: Trust, Calibration & Production-Readiness
description: "Is your model safe to ship? Calibration, drift, and the 0–100 Trust Score."
order: 14
---

## Accuracy Is Necessary, Not Sufficient

A model can be accurate and still *unsafe to deploy.* This is the gap between a Kaggle notebook and a production system — and the lesson that takes most people a painful incident to learn. Before a model touches real decisions, you have to ask questions that accuracy alone can't answer:

- When it says "90% confident," is it *actually* right 90% of the time?
- Does it fail catastrophically on certain subgroups?
- Will it still work next month when the data shifts?
- How robust is it to small perturbations in the input?

A model that's 85% accurate but **honest about its uncertainty** is far safer than one that's 88% accurate and confidently wrong. Let's make that concrete.

## Calibration: Do the Probabilities Mean Anything?

A model is **well-calibrated** if its stated confidence matches reality: of all the times it says "70% sure," it should be right about 70% of the time. Many models — especially boosted trees and SVMs — are **overconfident**: they say "99% sure" and are right only 80% of the time.

Why this matters enormously: if you act on the probabilities — auto-approving loans above 90% confidence, flagging fraud above 95% — miscalibrated probabilities lead directly to bad decisions. The number on the dashboard is a lie.

### Detecting and fixing it

You measure calibration by bucketing predictions by confidence and checking the actual accuracy in each bucket. The fix is a post-processing step — **Platt scaling** (sigmoid) or **isotonic regression** — that remaps the raw scores to honest probabilities:

```python
from sklearn.calibration import CalibratedClassifierCV
calibrated = CalibratedClassifierCV(model, method="sigmoid", cv=5)
calibrated.fit(X_train, y_train)
```

KaizenStat does this **automatically.** After training, it checks `mean(confidence) − accuracy`; if the gap exceeds 0.10, it wraps the model in Platt scaling for you:

```
Applied Platt calibration — model was overconfident
```

Your predictions stay the same, but now "90% confident" actually means 90%.

## The Trust Score

KaizenStat distills production-readiness into a single **0–100 Trust Score** combining four pillars:

| Pillar | What it measures |
|---|---|
| **Confidence** | How decisive and certain the model's predictions are |
| **Robustness** | How stable predictions are under small input perturbations |
| **Calibration** | How well stated confidence matches real accuracy |
| **Failure slices** | Whether any subgroup fails badly (from Chapter 13) |

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
doctor.train()
report = doctor.trust_score()

report.score        # → 78 / 100
report.confidence   # → sub-score
report.calibration  # → sub-score
report.summary      # → plain-English readiness verdict
```

Read it like a credit score for your model. **80+** → ship with confidence. **60–80** → usable, but watch the weak pillar. **Below 60** → not production-ready; the report tells you which pillar to fix first. It turns the fuzzy question "is this good enough?" into an inspectable number with reasons behind it.

## Drift: The Slow Death of Deployed Models

A model trained on last year's data assumes the world still looks like last year. It rarely does — prices rise, behavior shifts, new products launch. As live data **drifts** away from the training distribution, accuracy silently erodes. Nothing crashes; the model just quietly gets worse, and you don't notice until a business metric tanks.

Catch it with the Kolmogorov–Smirnov drift test from Chapter 3, run on a schedule against fresh production data:

```python
drifted = doctor.detect_drift(reference_data, live_data)
# → {"income": 0.0021, "avg_purchase": 0.038}   (p < 0.05 = significant drift)
```

When meaningful drift appears, **retrain on recent data.** A production ML system isn't "trained once" — it's *monitored and refreshed*, and drift detection is the trigger.

## The Production Checklist

Before any model goes live, confirm:

1. ✅ **No leakage** — `validate()` passes (Chapter 3). Non-negotiable.
2. ✅ **Honest evaluation** — the right metric (F1/AUC), cross-validated, on a held-out test set (Chapter 10).
3. ✅ **No high-severity issues** — `debug_model()` is clean (Chapter 13).
4. ✅ **Calibrated probabilities** — confidence matches accuracy (this chapter).
5. ✅ **Trust score ≥ your bar** — typically 75+ for important decisions.
6. ✅ **Drift monitoring in place** — a scheduled `detect_drift()` against live data.
7. ✅ **The pipeline is the artifact** — preprocessing exported *with* the model (Chapter 4).

KaizenStat's `run()` walks the first five for you and reports each; `report()` produces a shareable HTML summary for stakeholders and auditors:

```python
doctor.report(output_path="model_card.html", open_browser=True)
```

A model that passes this checklist is one you can defend — to your team, your users, and a regulator. That's the real finish line of a machine learning project, and it's why we measure *trust*, not just accuracy.

We've covered the full tabular journey. Next, a short bonus: the exact same pipeline applied to *text* — where, remarkably, nothing about the API changes.
