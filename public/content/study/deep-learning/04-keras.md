---
id: keras-intro
title: Hello Keras
description: Building your first Dense Network in 5 lines of code.
order: 4
---

## The Friendly API

TensorFlow is hard. **Keras** makes it easy.

### The Sequential Model
Stack layers like Lego blocks.

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# 1. Define
model = Sequential([
    Dense(64, activation='relu', input_shape=(10,)), # Hidden Layer 1
    Dense(32, activation='relu'),                   # Hidden Layer 2
    Dense(1, activation='sigmoid')                  # Output Layer
])

# 2. Compile
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# 3. Fit
model.fit(X_train, y_train, epochs=10)
```

### Key Terms
*   **Dense**: A fully connected layer. Every neuron connects to every neuron in the next layer.
*   **Epochs**: How many times to loop through the entire dataset.
