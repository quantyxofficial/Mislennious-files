---
id: training
title: Training & Backprop
description: How networks learn - Loss Functions, Gradient Descent, and Backpropagation.
order: 3
---

## The Learning Loop

How does the network get smarter?

### 1. Forward Pass (Guessing)
Data flows through the network. It makes a prediction.
"I think this image is a Cat." (Actual: Dog).

### 2. Loss Function (Grading)
Measure the error.
*   **MSE**: Mean Squared Error (Regression).
*   **Cross-Entropy**: For Classification.

### 3. Backpropagation (Blame Game)
Calculus (Chain Rule) is used to calculate the **Gradient**.
"Which weight caused this error? Was it Neuron A or Neuron B?"

### 4. Optimizer (Correction)
Update the weights to reduce the error.
*   **SGD**: Stochastic Gradient Descent.
*   **Adam**: The modern default (Adaptive Momentum). It converges faster.
