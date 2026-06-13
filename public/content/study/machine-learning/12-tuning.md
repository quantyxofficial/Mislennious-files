---
id: tuning
title: Hyperparameter Tuning & AutoML
description: GridSearch, RandomSearch, progressive tuning, and KaizenStat's stacking AutoML engine.
order: 12
---

## Parameters vs. Hyperparameters

First, a distinction that trips up beginners:

- **Parameters** are what the model *learns* during training — the weights in linear regression, the splits in a tree. You never set these by hand.
- **Hyperparameters** are the settings *you* choose **before** training — `max_depth`, `n_estimators`, `learning_rate`, `C`. They control how the model learns.

The same algorithm with different hyperparameters can be a brilliant model or a useless one. **Tuning** is the search for the combination that performs best — and it's often the difference between a 0.82 model and a 0.88 one.

## Why You Can't Just Guess

Each hyperparameter has many plausible values, and they interact. A Random Forest alone has depth, number of trees, min-samples-per-leaf, max-features... Try every combination by hand and you'll be at it for weeks — and you'll be tempted to peek at the test set, which corrupts your evaluation. Tuning must be *systematic* and must happen **inside cross-validation**, never against your final test set.

## Grid Search: Try Everything

**Grid search** exhaustively tries every combination in a grid you define:

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [5, 10, 20],
    "min_samples_leaf": [1, 5, 10],
}
search = GridSearchCV(model, param_grid, cv=5, scoring="f1", n_jobs=-1)
search.fit(X_train, y_train)

search.best_params_   # → the winning combination
search.best_score_    # → its cross-validated score
```

That grid is 3 × 3 × 3 = 27 combinations, each cross-validated 5 times = **135 model fits.** Thorough — but the cost explodes combinatorially. Add one more parameter and you're at thousands of fits.

## Random Search: Smarter Sampling

**Random search** samples random combinations from the space instead of trying all of them. Counterintuitively, this is usually *better* per unit of compute: most hyperparameters barely matter, and random sampling explores the few that *do* matter more efficiently than a rigid grid.

```python
from sklearn.model_selection import RandomizedSearchCV

search = RandomizedSearchCV(
    model, param_distributions, n_iter=20, cv=5, scoring="f1", n_jobs=-1, random_state=42,
)
search.fit(X_train, y_train)
```

`n_iter` directly controls your compute budget. Twenty well-sampled combinations often match a grid of hundreds.

## Progressive Tuning: KaizenStat's Two-Stage Search

KaizenStat improves on plain random search with a **two-stage progressive search** — the same coarse-to-fine strategy an expert uses by instinct:

```
Stage 1 — Coarse:  spend half the budget exploring the whole space broadly
Stage 2 — Fine:    spend the rest zooming in around Stage 1's best region
```

This reliably beats a single-pass random search of the *same total budget*, because it doesn't waste iterations re-exploring obviously-bad regions. You get it just by passing `tune=True`:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
result = doctor.train(cv=5, tune=True, n_iter=20)

result.best_params   # → the tuned hyperparameters
result.test_score    # → performance after tuning
```

```
Progressive tuning — Stage 1/2: coarse search (n_iter=10)…
Progressive tuning — Stage 2/2: refining (n_iter=10)…
✓ Progressive tuning — coarse: 0.8421 → fine: 0.8573 (+0.0152)
```

## Full AutoML: train_auto()

Tuning one model is good. KaizenStat's `train_auto()` runs the *entire* expert workflow in one call:

```python
result = doctor.train_auto(
    cv=3,
    tune=True,       # 2-stage progressive search on the benchmark winner
    ensemble=True,   # build a stacking ensemble of the top models
)
result.model_name    # → "Stack(LightGBM+XGBoost+ExtraTreesClassifier)"
```

Under the hood it executes the pipeline a senior data scientist would:

```
Step 1 · Build data profile   → rows, cols, imbalance, missing %, dimensionality, sparsity
Step 2 · Smart model set       → skip slow models on high-dim data; balance imbalanced targets
Step 3 · Feature selection     → SelectKBest(top 50) when there are too many features
Step 4 · Benchmark + tune      → CV benchmark, then 2-stage progressive tuning on the winner
Step 5 · Stacking ensemble     → meta-learner blends the best models (out-of-fold, no leakage)
Step 6 · Calibration check     → auto-apply Platt scaling if the model is overconfident
```

Each step is a decision you'd otherwise make manually — and could easily get wrong. KaizenStat encodes the expert defaults.

## The Calibration Bonus

After tuning, KaizenStat checks whether your model is **overconfident** — does it say "95% sure" when it's only right 80% of the time? If the gap exceeds 10 points, it automatically wraps the model with Platt scaling to correct the probabilities:

```
Applied Platt calibration — model was overconfident
```

This improves ROC-AUC and trustworthiness *without changing the predictions themselves* — a free reliability upgrade. (We'll dig into calibration in the next chapter.)

## The Golden Rule of Tuning

Whatever method you use: **tune inside cross-validation, evaluate once on the test set at the very end.** If you tune against your test set — trying configs until the test score looks good — you've leaked the test set into your model selection, and your reported number is fiction. KaizenStat enforces this separation for you: tuning happens on the training folds, and the held-out test score stays honest.

You can now squeeze the best performance out of any model. But a high score isn't the finish line — when a model *does* underperform, you need to know *why*. That's the next chapter: debugging a failing model.
