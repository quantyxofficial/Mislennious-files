---
id: backpropagation-algorithm
title: Backpropagation Algorithm
description: >
  The engine of deep learning. Learn how the Chain Rule is used to pass
  errors backward through the network to update weights.
order: 9
---

Backpropagation is arguably the most important algorithm in Deep Learning. It is the method used to calculate the gradient of the loss function with respect to every weight in the network.

## Need for Backpropagation

In forward propagation, we move data from input to output to get a prediction. In **Backpropagation**, we do the opposite: we move from output back to input to see how much each weight contributed to the total error.

## Chain Rule Revisited

Backpropagation is a direct application of the **Chain Rule** from calculus. If a change in weight $w$ affects $z$, and $z$ affects the loss $L$, then the change in $L$ with respect to $w$ is:

$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial z} \cdot \frac{\partial z}{\partial w}$$

## The Backpropagation Process

1. **Forward Pass**: Calculate the prediction and the loss.
2. **Backward Pass**:
    - Calculate the gradient of the loss at the output layer.
    - Propagate this error backward through the hidden layers using the chain rule.
    - Calculate how much each weight needs to change.
3. **Weight Update**: Use an optimizer (like SGD or Adam) to actually change the weights.

## Backpropagation Step-by-Step

Imagine a tiny network with one input, one hidden neuron, and one output:
- **Step 1**: Calculate the difference between prediction and reality (the Error).
- **Step 2**: Calculate how much the output activation function needs to change.
- **Step 3**: Calculate how much the weight between hidden and output layer contributed to error.
- **Step 4**: Repeat this for the weight between input and hidden layer.

## Common Issues

- **Vanishing Gradients**: In very deep networks, the gradient can become almost zero as it propagates back, meaning early layers never learn.
- **Computational Complexity**: Calculating gradients for millions of parameters requires specialized hardware (GPUs).

---

## Pro-Tip: Automatic Differentiation
In modern frameworks like PyTorch or TensorFlow, you don't write the math for backpropagation yourself. The libraries use **Autograd** (Automatic Differentiation) to track every operation and calculate the gradients for you automatically!
