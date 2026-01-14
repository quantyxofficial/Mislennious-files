---
id: intro-rnn
title: Recurrent Neural Networks (RNNs)
description: >
  Understand how RNNs process sequential data like text and speech by
  using "memory" to track information over time.
order: 14
---

CNNs are great at images, but they struggle with **Sequential Data** (where the order of the data matters). Examples include text (sentences), speech (audio), and time-series (stock prices). **Recurrent Neural Networks (RNNs)** were designed to handle sequences.

## Sequential Data

In a standard network, every input is treated independently. In an RNN, we assume that the next word in a sentence depends on the previous words.
> "The clouds are in the ____."
> (To predict "sky", the network needs to remember "clouds".)

## RNN Architecture: The Hidden State

The unique feature of an RNN is the **Hidden State** ($h$). This acts as the network's "memory." At each step in the sequence, the network takes:
1. The **current input** ($x_t$).
2. The **previous hidden state** ($h_{t-1}$).
It produces a new hidden state and an optional output.

## Forward and Backward Pass (BPTT)

Training an RNN is called **Backpropagation Through Time (BPTT)**. You can think of it as "unrolling" the RNN into a very deep feed-forward network and calculating gradients along the entire sequence.

## Limitations of Basic RNNs

Basic RNNs suffer from one major flaw: **Short-term Memory**.
As gradients are propagated back through long sequences, they get multiplied many times.
- If the multiplier is less than 1, the gradient "vanishes" (**Vanishing Gradient**).
- If the multiplier is greater than 1, it "explodes" (**Exploding Gradient**).

Because of this, a basic RNN can't remember something that happened at the start of a long paragraph by the time it reaches the end.

---

## RNN vs CNN

| Feature | CNN | RNN |
| :--- | :--- | :--- |
| **Input Type** | Fixed size (Images) | Variable length (Sequences) |
| **Connection** | Spatial (Local) | Temporal (Over Time) |
| **Primary Use**| Detection/Recognition | Translation/Prediction |
