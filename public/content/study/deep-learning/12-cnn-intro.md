---
id: intro-cnn
title: Convolutional Neural Networks (CNNs)
description: >
  The industry standard for Computer Vision. Learn how CNNs use filters,
  padding, and pooling to understand images like a human.
order: 12
---

Standard neural networks struggle with images because they don't understand spatial relationships (e.g., that pixels next to each other form an eye). **Convolutional Neural Networks (CNNs)** were designed specifically to solve this.

## Motivation for CNNs

If you pass a $100 \times 100$ color image into a standard network, you have $30,000$ inputs. If you have 100 hidden neurons, that's 3 million weights for just one layer! CNNs use **Parameter Sharing** to significantly reduce this complexity.

## The Convolution Operation

This is the core of a CNN. A small window called a **Filter (or Kernel)** slides over the image and performs mathematical multiplication.
- Each filter is designed to find a specific feature (e.g., a vertical line or a green circle).
- The output of this operation is called a **Feature Map**.

## Key Hyperparameters of CNNs

1. **Filters**: The number of different features we want to detect.
2. **Padding**: Adding "fake" pixels around the edge of an image so the filters can reach the corners without shrinking the image size.
3. **Stride**: How many pixels the filter moves at each step. A stride of 2 skips every other pixel, making the output smaller.

## Pooling (Downsampling)

Pooling layers are used to reduce the size of the feature maps, making the model faster and more robust to small shifts in an image.
- **Max Pooling**: Takes the maximum value in a window. (The most common type).
- **Average Pooling**: Takes the average value in a window.

## CNN Architecture Structure

A typical CNN follows this pattern:
$$[Input] \rightarrow [Conv \rightarrow ReLU \rightarrow Pool] \times N \rightarrow [Fully Connected] \rightarrow [Output]$$

1. **Feature Extraction**: Convolution and Pooling layers find the patterns.
2. **Classification**: Standard "fully connected" layers at the end use those patterns to make a final decision.

---

## CNN vs Standard Networks

| Feature | Standard (Dense) | CNN |
| :--- | :--- | :--- |
| **Primary Use** | Structured data (Tables) | Spatial data (Images/Video) |
| **Parameters** | Very High | Low (due to parameter sharing) |
| **Invariance** | Sensitive to shifts | Robust to translations |
