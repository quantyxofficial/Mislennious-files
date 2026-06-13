---
id: linear-regression
title: Linear Regression
description: Predicting numbers — gradient descent, the loss surface, and reading the residuals.
order: 5
---

## The Hello World of Machine Learning

Linear regression predicts a **continuous number** — a price, a temperature, a score — by fitting the best straight line (or flat plane, in higher dimensions) through your data. It's the simplest useful model, and understanding it deeply unlocks almost everything else, because nearly every advanced model is "linear regression with extra steps."

## The Equation

For a single feature, the model is the line you learned in school:

```
y = m·x + b
```

- `x` is the input feature (e.g. house size)
- `y` is the prediction (e.g. price)
- `m` is the **slope** — how much `y` changes per unit of `x`
- `b` is the **intercept** — the prediction when `x = 0`

With many features, it generalizes to a weighted sum:

```
y = w₁·x₁ + w₂·x₂ + ... + wₙ·xₙ + b
```

Each weight `wᵢ` is the "importance and direction" of that feature. **Training means finding the weights that make the predictions as close as possible to the real answers.**

## How It Learns: Minimizing Loss

To find the best line, we need a way to measure how *wrong* a given line is. That's the **loss function**. For regression we use **Mean Squared Error (MSE)** — the average of the squared gaps between prediction and reality:

```
MSE = average( (actual − predicted)² )
```

We square the errors for two reasons: it makes all errors positive (so they don't cancel out), and it **punishes large mistakes far more than small ones** — being off by 10 hurts 100× more than being off by 1.

### Gradient descent, intuitively

Picture the loss as a valley: every possible `(m, b)` is a point on a landscape, and its height is the error. The lowest point is the best model. **Gradient descent** is how the model walks downhill:

1. Start at a random spot.
2. Look at the slope under your feet (the *gradient*).
3. Take a small step in the steepest downhill direction.
4. Repeat until the ground is flat — you've reached the minimum.

The step size is the **learning rate**. Too big and you bounce around overshooting the valley floor; too small and training crawls. This same downhill-walking idea trains neural networks and most of modern ML — linear regression is where you first meet it.

## Implementation

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)          # finds the optimal weights
predictions = model.predict(X_test)

model.coef_        # → the learned weights (one per feature)
model.intercept_   # → the bias term b
```

## Evaluating a Regression Model

Accuracy is for classification — it makes no sense for numbers. Use these instead:

- **MAE (Mean Absolute Error)** — average error in the original units. "On average we're off by \$12,000." Easy to explain.
- **RMSE (Root Mean Squared Error)** — like MAE but penalizes big misses harder. Same units as the target.
- **R² (R-squared)** — the fraction of variance your model explains, from 0 to 1. `R² = 0.85` means the model accounts for 85% of the variation; `R² = 0` means it's no better than guessing the average.

```python
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

rmse = np.sqrt(mean_squared_error(y_test, predictions))
r2   = r2_score(y_test, predictions)
```

## Reading the Residuals

A **residual** is a single prediction's error: `actual − predicted`. Plotting residuals is the fastest way to diagnose a regression:

- **Random cloud around zero** → the model fits well. 
- **A curve or pattern** → the relationship isn't actually linear; your straight line is missing the shape.
- **A fan that widens** → the error grows with the prediction (heteroscedasticity); a log transform of the target often helps.

## The Key Assumption — and Its Limit

Linear regression assumes a **linear relationship** between features and target. If your data curves — say, ice-cream sales vs. temperature that plateaus on very hot days — a straight line will systematically miss. You then either engineer features (add `temperature²`) or switch to a model that captures curves, like trees.

## Training It With KaizenStat

You rarely call `LinearRegression` directly in practice. When your target is numeric, `DataDoctor` automatically detects a *regression* task, benchmarks linear regression against more powerful regressors, and picks the winner:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("house_prices.csv", target="price")
result = doctor.train()

result.task          # → "regression"  (auto-detected from a continuous target)
result.model_name    # → e.g. "LightGBM"  (if it beat the linear baseline)
result.test_score    # → R² on the held-out test set
```

KaizenStat always includes a linear model as a **baseline** — if a fancy gradient-boosting model can't beat a straight line, that's a strong signal your relationship really is linear (or your features need work). Linear regression isn't just a model; it's the yardstick everything else is measured against.

Next: the same linear idea, bent into a curve, to predict *categories* instead of numbers — logistic regression.
