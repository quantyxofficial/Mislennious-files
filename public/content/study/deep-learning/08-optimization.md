---
id: gradient-descent-optimization
title: Gradient Descent and Optimization
description: >
  Learn how models actually learn by using Gradient Descent and modern
  optimizers like Adam to minimize the cost function.
order: 8
---

Optimization is the "brain" of the learning process. It is the algorithm that decides how to change the weights and biases based on the loss.

## Concept of Gradient Descent

Gradient Descent is an iterative optimization algorithm used to find the minimum of a cost function. It works by taking small steps in the opposite direction of the gradient (the slope) of the function.

## Types of Gradient Descent

1. **Batch Gradient Descent**: Uses the *entire* dataset to calculate the gradient. Very accurate but extremely slow for large data.
2. **Stochastic Gradient Descent (SGD)**: Uses *one* random example at a time. Very fast but can "jump around" and be unstable.
3. **Mini-Batch Gradient Descent**: The industry standard. It uses a small group of examples (a "batch", e.g., 32 or 64) at a time. It combines the stability of Batch and the speed of SGD.

## The Learning Rate ($\eta$)

The learning rate determines the **size of the steps** we take during optimization.
- **Too High**: The model might "overshoot" the minimum and never converge.
- **Too Low**: Training will be incredibly slow and might get stuck in a "local minimum."

## Advanced Optimizers

Modern Deep Learning rarely uses basic SGD. We use optimizers that adapt the learning rate automatically:

- **Momentum**: Helps the "ball" roll through flat areas of the valley by keeping track of previous speed.
- **RMSProp**: Adjusts the learning rate for each parameter individually.
- **Adam (Adaptive Moment Estimation)**: **The most popular optimizer**. It combines the benefits of both Momentum and RMSProp. It is fast, efficient, and requires very little tuning.

## Problems in Optimization

- **Vanishing Gradients**: When the gradient becomes so small that the weights stop updating (common in deep networks with Sigmoid).
- **Exploding Gradients**: When the gradient becomes massive, causing the weights to overflow and crash the model.

---

## Pro-Tip: Start with Adam
When building a new model, $99\%$ of the time the best first choice for an optimizer is **Adam** with a default learning rate of `0.001`.
