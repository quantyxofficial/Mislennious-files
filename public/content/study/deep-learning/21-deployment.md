---
id: deployment-practical-dl
title: Deployment and Practical Considerations
description: >
  Move your models from "Colab Notebooks" to the real world. Learn about
  model saving, hardware acceleration, and the ethics of AI deployment.
order: 21
---

Training a model is just the first step. To create value, a model must be **deployed**—made available to users as part of a software application.

## Model Saving and Loading

You don't want to re-train your model every time you restart your app.
- **Weights-only**: Saving just the learned numbers (smallest file size).
- **Entire Model**: Saving the architecture + the weights + the optimizer state.
- **Standard Formats**: `.h5` (Keras), `.pt / .pth` (PyTorch), and **ONNX** (a universal format for moving models between frameworks).

## Training vs Inference

- **Training**: The process of learning from data. It requires high-end GPUs and massive power.
- **Inference**: Using the trained model to make a prediction on a single piece of user data. Inference must be fast and can often run on cheaper hardware (even an iPhone or a web browser).

## Hardware Acceleration

- **CPU**: Good for sequential logic but slow for the matrix math of DL.
- **GPU (Nvidia)**: The industry standard. Uses thousands of cores to perform matrix multiplication in parallel.
- **TPU (Google)**: Purpose-built hardware specifically for Deep Learning tensors.
- **NPU**: Neural Processing Units found in modern laptops and phones for on-device AI.

## Practical Considerations

1. **Latency**: How long does a user wait for a response? (e.g., A chatbot must reply in milliseconds).
2. **Cost**: Running GPUs $24/7$ is expensive. Optimization techniques like **Quantization** (shrinking the size of the weights) can help reduce costs.
3. **Data Drift**: Real-world data changes over time. A model trained on 2020 data might not work in 2025. You must constantly monitor and "re-train" your models.

## Ethical Considerations in DL

Deep learning models are powerful and can cause harm if not managed responsibly:
- **Bias**: If you train an AI on data that has human prejudices, the AI will inherit those prejudices.
- **Privacy**: Ensuring that models don't "leak" sensitive information they were trained on (like medical records).
- **Deepfakes**: The potential for generative AI to create realistic but fake videos and audio.

---

## Pro-Tip: Quantization
When deploying to a mobile device, use **8-bit Quantization**. This reduces the model size by $4\times$ with almost no loss in accuracy!
