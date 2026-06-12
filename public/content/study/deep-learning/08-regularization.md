---
id: regularization
title: Regularization
description: Preventing overfitting with Dropout and Batch Normalization.
order: 8
---

## Taming the Breast

Deep Networks are amazingly good at memorizing data (Overfitting). We need to handicap them so they are forced to learn general patterns.

### 1. Dropout
Randomly **turn off** 50% of the neurons during training.
*   This forces the network to not rely on any single neuron. It builds redundancy.

```python
from tensorflow.keras.layers import Dropout
model.add(Dropout(0.5))
```

### 2. Batch Normalization
Normalize inputs *between* layers.
*   It stabilizes training (no exploding gradients).
*   It allows higher learning rates (faster training).

```python
from tensorflow.keras.layers import BatchNormalization
model.add(BatchNormalization())
```

### 3. Early Stopping
Stop training when the Validation Loss stops improving. Don't waste electricity.
