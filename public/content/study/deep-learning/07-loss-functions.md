---
id: loss-functions
title: Loss Functions and Cost Optimization
description: >
  Understand how a neural network measures its errors and the difference
  between Regression and Classification loss functions.
order: 7
---

How does a neural network know it's wrong? It uses a **Loss Function**. This is a mathematical formula that calculates the "distance" between the model's prediction and the actual target value.

## What is a Loss Function?

The loss function gives the network a numerical score for every prediction. A lower score means better performance. The goal of training is to move the network's weights in a way that minimizes this score.

## Regression Loss Functions

Used when predicting a continuous numerical value (e.g., price, temperature).

- **Mean Squared Error (MSE)**: Calculates the average of the squared differences. It punishes large errors more severely.
- **Mean Absolute Error (MAE)**: Calculates the average of the absolute differences. It is more robust to "outliers" (extreme data points).

## Classification Loss Functions

Used when predicting a category.

- **Binary Cross-Entropy (Log Loss)**: The standard for binary classification (Yes/No).
- **Categorical Cross-Entropy**: Used for multi-class classification where each input belongs to exactly one category.

## Cost Function vs Loss Function

While often used interchangeably, there is a technical difference:
- **Loss Function**: Refers to the error for a **single** training example.
- **Cost Function**: Refers to the **average** loss over the entire training dataset.

## Intuition Behind Loss Minimization

Think of a **Valley**. Your current model performance is like a ball sitting on a hill. The bottom of the valley represents the "Minimum Loss" (The best possible model). Training is the process of guiding that ball down to the very bottom of the valley.

---

## Mathematical Notation
If $y$ is the actual value and $\hat{y}$ is the predicted value:
- **MSE** = $\frac{1}{n} \sum (y - \hat{y})^2$
- **MAE** = $\frac{1}{n} \sum |y - \hat{y}|$
