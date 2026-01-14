---
id: machine-learning-refresher
title: Machine Learning Refresher (Pre-DL)
description: >
  Before diving into neural networks, let's refresh the core Machine Learning
  concepts that remain critical in Deep Learning.
order: 4
---

Deep Learning is an evolution of Machine Learning. Many of the problems we solve in DL (like overfitting) are the same ones we face in classical ML.

## Supervised vs Unsupervised Learning

- **Supervised Learning**: The model learns from labeled data (Input + Target). Most DL applications (image classification, translation) are supervised.
- **Unsupervised Learning**: The model finds patterns in unlabeled data. Used in DL for things like **Autoencoders** and **Generative Models**.

## Regression vs Classification

- **Regression**: Predicting a continuous value (e.g., house price).
- **Classification**: Predicting a discrete category (e.g., Cat vs. Dog).

## Data Splitting

We never train and test on the same data. We split data into:
1. **Training Set**: Used to update weights.
2. **Validation Set**: Used to tune hyperparameters and check for overfitting during training.
3. **Test Set**: Used once at the very end to see how the model performs on truly "unseen" data.

## Bias-Variance Tradeoff

- **Underfitting (High Bias)**: The model is too simple to capture the pattern.
- **Overfitting (High Variance)**: The model "memorizes" the training data but fails to generalize. **Deep Learning is highly prone to overfitting!**

## Feature Scaling and Normalization

Neural networks are sensitive to the scale of input data. If one input is $0-1$ and another is $0-1,000,000$, the network will struggle to learn. We use:
- **Normalization**: Scaling data to a range of $[0, 1]$.
- **Standardization**: Centering data around a mean of $0$ with a standard deviation of $1$.

## Evaluation Metrics

How do we know the model is good?
- **Accuracy**: $\%$ of correct predictions. (Careful with imbalanced data!)
- **Precision & Recall**: Critical for medical or safety applications.
- **Mean Squared Error (MSE)**: Standard for regression.

---

## Pro-Tip: The DL Mindset
In classical ML, you spend $80\%$ of your time on **Feature Engineering** (deciding which inputs matter). In Deep Learning, you spend $80\%$ of your time on **Data Cleaning** and **Architecture Tuning**.
