---
id: intro-neural-networks
title: Introduction to Neural Networks
description: >
  Understand the basic architecture of a neural network, from the individual
  neuron to the layered structure of deep models.
order: 5
---

Artificial Neural Networks (ANNs) are the core of Deep Learning. They are computational models designed to recognize patterns and solve complex problems by mimicking the way biological neurons process information.

## Biological vs Artificial Neuron

- **Biological Neuron**: Receives signals through **Dendrites**, processes them in the **Cell Body**, and sends a signal down the **Axon** to other neurons.
- **Artificial Neuron (Perceptron)**: Receives numerical inputs, multiplies them by **Weights**, adds a **Bias**, and passes the result through an **Activation Function**.

## The Perceptron Model

The Perceptron is the simplest form of a neural network. It consists of a single neuron that takes input $x$, applies weights $w$ and bias $b$:

$$z = (x_1 \cdot w_1) + (x_2 \cdot w_2) + \dots + b$$

## Structure of a Neural Network

A standard neural network is organized into layers:

1. **Input Layer**: The first layer that receives data. No computation happens here; it simply passes data to the next layer.
2. **Hidden Layers**: The layers between input and output. This is where the magic (learning) happens. A network is "Deep" if it has many hidden layers.
3. **Output Layer**: The final layer that produces the prediction (e.g., the probability of an image being a dog).

## Weights, Bias, and Activation

- **Weights ($W$)**: Represent the "strength" or importance of a connection between neurons. Learning in DL is the process of finding the right weights.
- **Bias ($b$)**: An extra parameter that allows the model to "shift" the activation function to fit the data better.
- **Activation Function**: A mathematical gate that decides if a neuron's signal should be "fired" to the next layer.

## Forward Propagation (Conceptual)

Forward Propagation is the process of moving data from the input layer to the output layer to get a prediction.
1. Input enters the network.
2. Each layer calculates $z = Wx + b$.
3. Each result is passed through an Activation Function.
4. The output layer gives the final result.

---

## Simple Analogy
Think of a neural network as a **Filter System**. The input is like dirty water. Each hidden layer is a filter that removes specific impurities. By the time it reaches the output, the water is clean (the prediction is clear).
