---
id: tuning
title: Hyperparameter Tuning
description: GridSearch and RandomSearch to optimize your model.
order: 9
---

## Tuning the Knobs

Models have settings called **Hyperparameters** that are not learned from data (e.g., `n_estimators` in Random Forest, `k` in K-Means).
How do you find the best ones?

### 1. Grid Search
Try *every* combination. Thorough but slow.

```python
from sklearn.model_selection import GridSearchCV

params = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 10]
}

grid = GridSearchCV(RandomForestClassifier(), params, cv=5)
grid.fit(X_train, y_train)

print(grid.best_params_)
```

### 2. Randomized Search
Try *random* combinations. Faster and usually good enough.

```python
from sklearn.model_selection import RandomizedSearchCV

random = RandomizedSearchCV(RandomForestClassifier(), params, n_iter=10)
```

Tuning can turn an 85% model into a 90% model.
