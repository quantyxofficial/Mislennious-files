---
id: logistic-regression
title: Logistic Regression
description: Classification - Is it a Cat or a Dog?
order: 4
---

## Don't be fooled by the name

Despite "Regression" in the name, **Logistic Regression** is for **Classification**.
It predicts probabilities (0 to 1) using the Sigmoid function.
"There is an 85% chance this email is Spam."

### Implementation

```python
from sklearn.linear_model import LogisticRegression

# Solver='liblinear' is good for small datasets
model = LogisticRegression(solver='liblinear')

model.fit(X_train, y_train)

# Predict Class (0 or 1)
y_pred = model.predict(X_test)

# Predict Probability (e.g., [0.15, 0.85])
y_prob = model.predict_proba(X_test)
```

### The Decision Boundary
By default, if probability > 0.5, it predicts "1" (True).
You can adjust this threshold. For cancer detection, you might lower it to 0.3 to be safe (catch more cases).
