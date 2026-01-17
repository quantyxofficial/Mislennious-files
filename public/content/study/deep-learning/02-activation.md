---
id: activation
title: Activation Functions
description: Adding non-linearity - ReLU, Sigmoid, and Softmax explained.
order: 2
---

## The Spark of Life

Without Activation Functions, a Neural Network is just a Linear Regression model.
They introduce **Non-Linearity**, allowing the network to learn complex curves.

### 1. Sigmoid (The Old Standard)
Values between 0 and 1.
*   Good for: Output layer (Binary Classification).
*   Bad for: Hidden layers (Vanishing Gradient problem).

### 2. ReLU (Rectified Linear Unit)
`f(x) = max(0, x)`
*   If x > 0, return x. If x < 0, return 0.
*   The industry standard for hidden layers. It is fast and efficient.

### 3. Softmax
Values sum to 1.
*   Good for: Output layer (Multi-Class Classification).
*   Example: [0.1, 0.7, 0.2] -> "70% Chance it's Class B".
