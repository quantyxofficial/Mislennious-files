---
id: ensembles
title: "Ensembles: Forests & Boosting"
description: Random Forests, Gradient Boosting, XGBoost, LightGBM — and why ensembles win.
order: 8
---

## The Wisdom of Crowds

Ask one expert and you get one biased opinion. Ask a thousand diverse people and average their answers, and the crowd is often startlingly accurate — individual errors cancel out. **Ensemble learning** applies this to ML: combine many imperfect models into one strong one. For tabular data — spreadsheets, databases, the bread and butter of business ML — ensembles of decision trees are, full stop, the **state of the art.** They win Kaggle competitions and run production systems everywhere.

There are two great families: **bagging** (Random Forests) and **boosting** (Gradient Boosting, XGBoost, LightGBM).

## Bagging: Random Forests

A single tree overfits and is unstable. A **Random Forest** fixes both by training *hundreds* of trees and letting them vote. Two tricks make the trees diverse — and diversity is the whole point:

1. **Bootstrap sampling** — each tree trains on a random sample (with replacement) of the rows. Every tree sees a slightly different dataset.
2. **Feature randomness** — at each split, each tree may only consider a random subset of features. This stops every tree from latching onto the same dominant feature.

Then they vote: for classification, majority wins; for regression, average the predictions.

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=200,     # number of trees in the forest
    max_depth=None,       # individual trees can grow deep — the forest controls variance
    n_jobs=-1,            # use all CPU cores
    random_state=42,
)
model.fit(X_train, y_train)
```

**Why it works:** each tree overfits in its *own* direction. Averaged together, the random errors cancel while the real signal — which every tree agrees on — survives. You get the expressiveness of deep trees without the overfitting of one deep tree. Random Forests are robust, need little tuning, and are a fantastic default.

## Boosting: Learning From Mistakes

Boosting takes a different, sequential strategy. Instead of training trees independently and averaging, it builds them **one at a time, each correcting the errors of the last:**

```
Tree 1: makes predictions, gets some wrong
Tree 2: focuses on what Tree 1 got wrong
Tree 3: focuses on what Trees 1+2 still get wrong
...     each tree patches the remaining mistakes
```

Each new tree is fit to the **residual errors** of the ensemble so far. The trees are deliberately *weak* (shallow), but chained together they form an extremely strong predictor. Boosting usually edges out Random Forests in raw accuracy — at the cost of being more sensitive to its settings.

### XGBoost and LightGBM

These are two famously fast, accurate boosting implementations:

- **XGBoost** — battle-tested, hugely popular, built-in regularization to resist overfitting.
- **LightGBM** — Microsoft's gradient-boosting engine; grows trees leaf-wise and bins features for speed, making it superb on large datasets.

```python
from xgboost import XGBClassifier
model = XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6)
model.fit(X_train, y_train)
```

The key boosting hyperparameters:

- **`n_estimators`** — how many trees (more = stronger, but eventually overfits).
- **`learning_rate`** — how much each tree contributes. Lower is safer but needs more trees.
- **`max_depth`** — complexity of each individual tree.

`n_estimators` and `learning_rate` trade off against each other — a classic tuning dance we'll automate in Chapter 12.

## Stacking: The Ensemble of Ensembles

The most powerful technique combines *different kinds* of models. **Stacking** trains several base models (say LightGBM, XGBoost, ExtraTrees) and then a final "meta-learner" that learns the best way to **blend their predictions** — using out-of-fold cross-validation so it doesn't cheat. This is the approach behind most winning Kaggle solutions, and it typically beats any single model.

## The KaizenStat Advantage: This Is Automatic

Here's the payoff. You don't choose, configure, or tune any of these by hand. `train()` benchmarks the entire pool with cross-validation and picks the winner; `train_auto()` goes further and *builds a stacking ensemble* of the best models:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")

# Benchmark RF, GradientBoosting, XGBoost, LightGBM, ExtraTrees, LogReg → train the winner
result = doctor.train()
result.model_name      # → "LightGBM"

# Full AutoML: profile-aware tuning + a stacking ensemble of the top models
result = doctor.train_auto(tune=True, ensemble=True)
result.model_name      # → "Stack(LightGBM+XGBoost+ExtraTreesClassifier)"
```

KaizenStat is *profile-aware*: it skips slow models on high-dimensional data, adds `class_weight="balanced"` for imbalanced targets, and applies feature selection when you have too many columns — decisions an expert would make manually. The meta-learner is trained with proper out-of-fold predictions, so the stacking gain is real, not leaked.

```
✓ Progressive tuning — coarse: 0.8421 → fine: 0.8573 (+0.0152)
✓ Stacking ensemble: Stack(LightGBM+XGBoost+ExtraTrees) → test 0.871
```

You get a Kaggle-grade ensemble from one method call — and now you understand exactly what it built and why. With the models mastered, the next question is how to *measure* them honestly, because — as we keep warning — accuracy lies.
