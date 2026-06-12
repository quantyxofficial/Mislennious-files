---
id: regularization-techniques
title: Regularization Techniques
description: >
  Learn how to prevent your models from overfitting using powerful
  techniques like L1/L2 Regularization, Dropout, and Early Stopping.
order: 11
---

In Deep Learning, our models are often so powerful that they start "cheating" by memorizing the noise in the training data. This is **Overfitting**. **Regularization** is a set of techniques used to force the model to stay simple and generalize better.

## Why Regularization is Needed

A model that overfits will have $99\%$ accuracy on training data but $60\%$ accuracy on new, unseen data. Regularization adds a "penalty" to the model for being too complex.

## 1. L1 and L2 Regularization (Weight Decay)

These methods add a penalty term to the **Loss Function** based on the size of the weights.
- **L1 (Lasso)**: Adds the *absolute value* of weights. It forces some weights to become exactly zero, effectively performing "feature selection."
- **L2 (Ridge)**: Adds the *squared value* of weights. It forces weights to be small but not zero. **L2 is the most common form of weight decay.**

## 2. Dropout

Dropout is a unique technique where, during training, we **randomly "ignore" some neurons** in each batch.
- This prevents the network from becoming too dependent on any single neuron.
- It forces the network to learn "redundant" representations, making it more robust.
- *Note: Dropout is only used during training, never during testing/inference.*

## 3. Early Stopping

This is the simplest regularization. We monitor the **Validation Loss** during training. As soon as the validation loss starts increasing (even if training loss is still decreasing), we stop training. This prevents the model from entering the "overfitting zone."

## 4. Data Augmentation

If you don't have enough data, "make" more! For images, you can:
- Rotate, flip, or zoom the images.
- Change the brightness or add noise.
This teaches the model that a "Cat" is still a cat even if it's upside down or blurry.

---

## Comparison of Regularization

| Technique | How it Works | When to Use |
| :--- | :--- | :--- |
| **L2** | Shrinks weights | Use by default in most models. |
| **Dropout** | Randomly kills neurons | Great for large, fully connected layers. |
| **Early Stopping**| Stops training early | Use in $100\%$ of deep learning projects. |
| **Augmentation** | Creates more data | Essential for Computer Vision (CNNs). |
