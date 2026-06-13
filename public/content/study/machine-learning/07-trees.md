---
id: trees
title: Decision Trees
description: White-box models that split the world with yes/no questions.
order: 7
---

## Thinking Like a Flowchart

A **decision tree** is the most intuitive model in all of ML — it's a flowchart of yes/no questions that a human can read top to bottom. To decide if someone will repay a loan, it might ask:

```
Is income > $50k?
├─ No  → Is credit_score > 700?
│        ├─ No  → DENY
│        └─ Yes → APPROVE
└─ Yes → Is debt_ratio < 0.4?
         ├─ No  → DENY
         └─ Yes → APPROVE
```

Each internal node is a question about one feature; each leaf is a final prediction. Unlike linear and logistic regression — which are "black boxes" of weighted sums — a tree is a **white-box** model. You can print it, read it, and explain any decision to a regulator or a skeptical stakeholder. That transparency is its superpower.

## How a Tree Chooses Its Questions

The tree builds itself greedily, asking at every node: *"Which question splits the data into the purest groups?"* A "pure" group is one where almost all examples share the same label.

It measures impurity with one of two metrics:

- **Gini impurity** — the probability of mislabeling a random example if you guessed by the group's class distribution. 0 = perfectly pure.
- **Entropy** — information-theory's measure of disorder. The tree picks the split with the highest *information gain* (biggest drop in entropy).

In practice Gini and entropy give near-identical trees, and Gini is slightly faster, so it's the default. The point is the same: **split on the question that most cleanly separates the classes.**

## Handling Numbers and Categories Naturally

Trees shine because they need almost no preprocessing:

- **No scaling required** — a tree compares `income > 50000`; the units are irrelevant. (Recall: trees are scale-invariant.)
- **Non-linear by nature** — stacking splits carves feature space into rectangles, so trees capture curves and interactions that a straight decision boundary can't.
- **Mixed data is fine** — numeric and categorical features coexist happily.

## The Fatal Flaw: Overfitting

Left unchecked, a tree will keep splitting until **every leaf holds a single training example.** At that point it has perfectly *memorized* the training data — and learned nothing general. It's the textbook case of overfitting: 100% train accuracy, terrible test accuracy. A tree that deep has essentially built a lookup table of the past, not a model of the world.

### Pruning the tree

We tame this by limiting the tree's complexity with hyperparameters:

- **`max_depth`** — how many questions deep the tree may go. The single most important knob.
- **`min_samples_leaf`** — refuse to create a leaf with fewer than N examples.
- **`min_samples_split`** — don't split a node that has too few examples.

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(
    max_depth=5,            # cap the depth — the main overfitting guard
    min_samples_leaf=20,    # every leaf must generalize over ≥ 20 examples
    random_state=42,
)
model.fit(X_train, y_train)
```

A shallow tree underfits (too simple); a deep tree overfits (memorizes). The right depth lives in between — and finding it is exactly what hyperparameter tuning (Chapter 12) automates.

## Feature Importance for Free

A trained tree tells you which features actually drove its decisions — how much each one reduced impurity across all its splits:

```python
import pandas as pd
importances = pd.Series(model.feature_importances_, index=X_train.columns)
print(importances.sort_values(ascending=False))
```

```
credit_score   0.41
income         0.33
debt_ratio     0.18
age            0.05
zip_code       0.03
```

This is gold for understanding your problem — and for cutting features that contribute nothing.

## Regression Trees

The same structure predicts numbers too. A **regression tree** splits to minimize variance within each leaf, and each leaf predicts the *average* target value of its training examples. The result is a step-function rather than a smooth line — which is fine, because we rarely use a single tree alone.

## The Honest Limitation

A single decision tree is **unstable** — change a few training rows and you can get a wildly different tree — and it tends to be either too simple or overfit. On its own it's rarely the best model. But it is the *building block* of the most powerful tabular models in existence. Combine hundreds of trees and something remarkable happens: the instability cancels out and accuracy soars.

That combination — the **ensemble** — is the subject of the next chapter, and it's where modern tabular ML actually wins.
