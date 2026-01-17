---
id: pooling
title: Pooling & Padding
description: Downsampling images and preserving spatial dimensions.
order: 6
---

## Shrinking the Image

After a Convolution layer, the image is often still too big. We need to reduce the size to reduce computation and prevent overfitting.
This process is called **Pooling** (Subsampling).

### Max Pooling
The most common type. It takes a 2x2 window and keeps only the **Largest Number**.
*   Input: 64x64 image.
*   Pool (2x2): Output becomes 32x32.
*   Logic: "If there is a sharp edge in this 2x2 block, just keep the edge strength."

```python
from tensorflow.keras.layers import MaxPooling2D

model.add(MaxPooling2D(pool_size=(2, 2)))
```

### Padding
When you convolve a 3x3 filter over a 5x5 image, the output shrinks to 3x3.
To keep the output size the same (5x5), we add a border of zeros around the image.
*   `padding='same'`: Output size = Input size.
*   `padding='valid'`: No padding (Output shrinks).
