---
id: deep-neural-networks
title: Deep Neural Networks (DNNs)
description: >
  Move from simple perceptrons to multi-layer deep networks. Learn about
  network depth, capacity, and the challenges of training deep models.
order: 10
---

A Deep Neural Network (DNN) is simply a neural network with many hidden layers. Increasing the depth of a network allows it to learn more abstract and complex features.

## Shallow vs Deep Networks

- **Shallow Networks**: Have only 1 or 2 hidden layers. They are good for simple tasks like basic linear regression or small datasets.
- **Deep Networks**: Can have dozens or hundreds of layers. Each layer learns a different "level" of abstraction. For example, in image recognition:
    - Layer 1: Learns edges.
    - Layer 2: Learns shapes (circles, squares).
    - Layer 3: Learns parts of objects (eyes, wheels).
    - Layer 4: Recognizes the whole object (Face, Car).

## Challenges of Depth

As networks get deeper, they become harder to train:
1. **Vanishing/Exploding Gradients**: The math starts breaking down as gradients are multiplied through many layers.
2. **Computational Cost**: More layers mean more parameters, requiring more memory and time.
3. **Overfitting**: A deep network has high **Capacity**, meaning it can easily "memorize" the training data instead of learning general patterns.

## Initialization of Weights

How do we start the weights?
- **Zero Initialization**: **BAD!** If all weights start at $0$, every neuron in a layer will learn the exact same thing (symmetry).
- **Random Initialization**: Better, but can lead to exploding gradients if the numbers are too large.
- **He/Xavier Initialization**: The modern standard. These methods scale the initial random weights based on the number of inputs to the layer, keeping the signal stable.

## Role of Bias in Deep Networks

Bias is like the $y$-intercept in a linear equation ($y = mx + c$). It allows the neuron to "fire" even if all inputs are zero, providing the flexibility needed to fit complex data boundaries.

---

## The "Universal Approximation Theorem"
This theorem states that a single hidden layer with enough neurons can approximate *any* continuous function. However, in practice, it is almost always more efficient to use a **Deep** network with fewer neurons per layer than a **Shallow** network with a massive single layer.
