---
id: dl-frameworks
title: Deep Learning Frameworks
description: >
  An overview of the tools that power the AI industry. Compare TensorFlow,
  Keras, and PyTorch to decide which one is right for your project.
order: 20
---

You don't need to write the math for every neural network from scratch. **Deep Learning Frameworks** are libraries that provide high-performance, optimized building blocks for creating AI models.

## Why Frameworks are Needed?

1. **Automatic Differentiation**: They handle the complex math of backpropagation automatically.
2. **Hardware Acceleration**: They allow your code to run on GPUs and TPUs with a single command.
3. **Pre-built Layers**: They provide classes for Conv2D, LSTM, Dense, etc., so you don't have to define them.

## The "Big Three"

### 1. TensorFlow (by Google)
- **Features**: Highly scalable, great for production/deployment, supports mobile (TF Lite).
- **Style**: Historically more rigid and difficult for beginners, but improved with Version 2.0.

### 2. Keras
- **Features**: The world's easiest deep learning API. High-level and very human-readable.
- **Style**: It is now the official high-level API for TensorFlow. Use this if you want to build a model in 10 lines of code.

### 3. PyTorch (by Meta/Facebook)
- **Features**: The favorite of researchers. Extremely flexible, use Python's native logic, and has a great debugging experience.
- **Style**: "Imperative" (Dynamic) — the network is built on the fly as the code runs.

## Comparison: TensorFlow vs PyTorch

| Feature | TensorFlow | PyTorch |
| :--- | :--- | :--- |
| **Ease of Learning** | Moderate (with Keras) | High |
| **Industry Adoption** | Very High (Legacy/Production) | High (Rapidly Growing) |
| **Research Usage**| Low | Extremely High |
| **Deployment** | Excellent (TFX, TF Serving) | Good (TorchServe, ONNX) |

## Simple Workflow: Building a Model

Regardless of the framework, the steps are usually:
1. **Define Data Loaders**.
2. **Specify Architecture** (Stack of layers).
3. **Select Loss & Optimizer**.
4. **Loop over data** (Training loop).
5. **Evaluate & Save**.

---

## Pro-Tip: Which one to learn?
If you are a **student or researcher**, start with **PyTorch**. If you want a job in a **large enterprise** or want to deploy models to **mobile apps**, focus on **TensorFlow/Keras**.
