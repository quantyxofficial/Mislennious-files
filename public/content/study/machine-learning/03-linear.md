---
id: linear-regression
title: Linear Regression
description: Predicting the future (numbers). The Hello World of ML.
order: 3
---

## Drawing the Best Fit Line

The goal: Find the line `y = mx + b` that minimizes the error (residuals) between prediction and reality.
Used for specific numeric predictions: "What will the temperature be tomorrow?"

### Implementation

```python
from sklearn.linear_model import LinearRegression

# 1. Create the model
model = LinearRegression()

# 2. Train it (Find m and b)
model.fit(X_train, y_train)

# 3. Predict
predictions = model.predict(X_test)
```

### Evaluation: Mean Squared Error (MSE)
We punish large errors by squaring them.

```python
from sklearn.metrics import mean_squared_error
error = mean_squared_error(y_test, predictions)
```

### Assumptions
Linear regression assumes a *linear* relationship. If your data is curved, this model will fail.
