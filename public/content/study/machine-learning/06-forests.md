---
id: forests
title: Random Forests
description: Ensemble Learning - Why 100 trees are better than 1.
order: 6
---

## The Wisdom of Crowds

A single Decision Tree is prone to overfitting. It memorizes the data.
A **Random Forest** trains 100 different trees on random subsets of the data and averages their predictions.

### Voting Logic
*   Tree 1: "It's a Cat"
*   Tree 2: "It's a Dog"
*   Tree 3: "It's a Cat"
*   **Final Prediction**: Cat (Majority Vote).

### Implementation

```python
from sklearn.ensemble import RandomForestClassifier

# n_estimators = 100 trees
model = RandomForestClassifier(n_estimators=100)

model.fit(X_train, y_train)
```

### Feature Importance
Random Forests can tell you *which* features mattered most.

```python
import pandas as pd
importance = pd.Series(model.feature_importances_, index=X.columns)
importance.plot(kind='barh')
```
