---
id: capstone
title: Capstone: MNIST
description: Building a handwritten digit classifier from scratch.
order: 10
---

## Project: Reading Handwriting (MNIST)

Goal: Build a CNN to classify digits (0-9) with > 99% accuracy.

### 1. Load Data
```python
from tensorflow.keras.datasets import mnist
(X_train, y_train), (X_test, y_test) = mnist.load_data()

# Normalize (0-255 -> 0-1)
X_train = X_train / 255.0
X_train = X_train.reshape(-1, 28, 28, 1) # Add Color Channel
```

### 2. Build Model
```python
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax') # 10 Digits
])
```

### 3. Compile & Train
```python
model.compile(optimizer='adam', 
              loss='sparse_categorical_crossentropy', 
              metrics=['accuracy'])

model.fit(X_train, y_train, epochs=5)
```

### 4. Result
You just built a machine that can read. Next step: deploy it to a web app.
