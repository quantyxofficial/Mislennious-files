---
id: transfer-learning
title: Transfer Learning
description: Standing on the shoulders of giants (VGG, ResNet).
order: 9
---

## Don't Reinvent the Wheel

Training a CNN from scratch requires millions of images and weeks of GPU time.
Instead, perform **Transfer Learning**.

### The Concept
1.  Download a model (e.g., VGG16) pre-trained on ImageNet (14 million images).
2.  **Freeze** the early layers (which know how to detect edges/shapes).
3.  **Replace** the final output layer with your own classes (e.g., Hotdog / Not Hotdog).
4.  Train only the final layer.

### Implementation

```python
from tensorflow.keras.applications import VGG16

base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False # Freeze it

model = Sequential([
    base_model,
    Flatten(),
    Dense(1, activation='sigmoid')
])
```
You can achieve 95% accuracy with only 100 images.
