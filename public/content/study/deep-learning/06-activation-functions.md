---
id: activation-functions
title: Activation Functions
description: >
  Learn why we need non-linear functions in neural networks and how
  to choose between ReLU, Sigmoid, Tanh, and Softmax.
order: 6
---

Without an activation function, a neural network is just a bunch of linear mathematical operations stacked together. This would make it no more powerful than a simple linear regression model.

## Need for Activation Functions

The primary goal of an activation function is to **introduce non-linearity** into the network. Real-world data is complex and non-linear (e.g., predicting the shape of an object in a photo). Non-linear functions allow the network to learn these complex patterns.

## Common Activation Functions

### 1. Sigmoid Function
- **Formula**: $1 / (1 + e^{-z})$
- **Output Range**: $(0, 1)$
- **Usage**: Typically used in the output layer for binary classification.
- **Problem**: Can cause "Vanishing Gradients" during training.

### 2. Tanh (Hyperbolic Tangent)
- **Formula**: $(e^z - e^{-z}) / (e^z + e^{-z})$
- **Output Range**: $(-1, 1)$
- **Usage**: Often better than Sigmoid for hidden layers because it centers the data around zero.

### 3. ReLU (Rectified Linear Unit)
- **Formula**: $max(0, z)$
- **Output Range**: $[0, \infty)$
- **Usage**: **The default choice** for hidden layers in modern deep learning. It's computationally cheap and helps prevent gradient issues.
- **Problem**: "Dying ReLU" (neurons can get stuck at 0).

### 4. Leaky ReLU
- **Formula**: $max(0.01z, z)$
- **Output Range**: $(-\infty, \infty)$
- **Usage**: A variation of ReLU that allows a small positive gradient even for negative values to prevent dead neurons.

### 5. Softmax
- **Formula**: Normalizes outputs into probabilities.
- **Usage**: Used in the **output layer** for multi-class classification (e.g., is this a dog, cat, or bird?).

## Choosing the Right Function

| Layer Type | Recommended Function |
| :--- | :--- |
| **Hidden Layers** | ReLU (or Leaky ReLU) |
| **Output (Binary)** | Sigmoid |
| **Output (Multi-class)** | Softmax |
| **Output (Regression)** | Linear (None) |

---

## Pro-Tip: ReLU is King
Unless you have a specific reason not to, always start with **ReLU** for your hidden layers. It is significantly faster to computer and generally produces faster convergence during training.
