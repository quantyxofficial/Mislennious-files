---
id: trees
title: Decision Trees
description: White-box models that mimic human decision making.
order: 5
---

## The Flowchart Model

A Decision Tree makes a series of splits:
1.  Is Age > 18?
    *   Yes -> Is Income > 50k?
        *   Yes -> **Buy**
        *   No -> **Don't Buy**
    *   No -> **Don't Buy**

### Pros
*   **Interpretable**: You can visualize the tree and explain "Why" to a boss.
*   **Non-Linear**: Can handle complex data shapes.
*   **No Scaling Needed**: It doesn't care about the magnitude of numbers.

### Cons
*   **Overfitting**: Use `max_depth` to stop the tree from memorizing the training data.

### Implementation

```python
from sklearn.tree import DecisionTreeClassifier

# Limit depth to prevent overfitting
model = DecisionTreeClassifier(max_depth=3)

model.fit(X_train, y_train)
```
