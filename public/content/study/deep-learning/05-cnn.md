---
id: cnn
title: ConvNets (CNNs)
description: Computer Vision - Filters, Kernels, and Feature Maps.
order: 5
---

## Giving Eyes to AI

Dense networks are bad at images (too many weights, lose spatial context).
**Convolutional Neural Networks (CNNs)** scan images like a flashlight.

### The Convolution Operation
A small **Kernel (Filter)** slides over the image.
*   It detects features: Edges, Curves, Textures.
*   Early layers see "Lines".
*   Middle layers see "Shapes" (Eyes, Noses).
*   Final layers see "Objects" (Cat, Dog).

### Implementation

```python
from tensorflow.keras.layers import Conv2D

# 32 Filters, 3x3 Kernel size
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)))
```

CNNs revolutionized AI in 2012 (AlexNet) and power FaceID, Self-Driving Cars, and Medical Imaging.
