---
id: cnn-architectures
title: CNN Architectures
description: >
  Explore the history of CNNs from LeNet to ResNet, and learn why Transfer
  Learning is the secret weapon of modern Computer Vision.
order: 13
---

Over the last 20 years, researchers have developed various "standard" CNN architectures that excel at different tasks. Instead of reinventing the wheel, we often use these pre-built structures.

## Evolution of CNNs

### 1. LeNet-5 (1998)
Developed by Yann LeCun, this was the first successful CNN. It was used to recognize handwritten digits on checks (the MNIST dataset). It is very simple by modern standards, using only two convolutional layers.

### 2. AlexNet (2012)
The model that started the Deep Learning revolution. It was much deeper than LeNet and used **ReLU** and **Dropout** for the first time in a major way. It proved that deep CNNs could achieve superhuman performance on image recognition.

### 3. VGGNet (2014)
Known for its simplicity and elegance. Instead of using complex filters, it used very small $3 \times 3$ filters stacked on top of each other. It showed that "depth" is more important than "filter size."

### 4. ResNet (Residual Network, 2015)
Introduced **Skip Connections** (or residual blocks). This allowed the gradients to "skip" some layers, solving the vanishing gradient problem and allowing researchers to train networks with hundreds or even thousands of layers.

## Transfer Learning Concept

Transfer learning is the most practical technique in modern AI. It involves taking a model that has already been trained on a massive dataset (like **ImageNet**) and "tuning" it for your specific task (e.g., detecting a rare skin disease).

### Why use Transfer Learning?
1. **Less Data**: You don't need millions of images; a few hundred might be enough.
2. **Less Time**: Training from scratch takes weeks; "fine-tuning" takes hours.
3. **Better Performance**: Starting with a model that already knows what "edges" and "shapes" are gives you a huge head start.

## Fine-Tuning a Pretrained Model

1. **Feature Extraction**: Freezing the weights of the early layers and only training the final classification layer.
2. **Fine-Tuning**: Unfreezing a few of the top convolutional layers to adapt them more closely to your specific dataset.

---

## Pro-Tip: ResNet is the Baseline
When starting a Computer Vision project, **ResNet-50** is widely considered the "Gold Standard" baseline. It offers a perfect balance between speed, memory usage, and accuracy.
