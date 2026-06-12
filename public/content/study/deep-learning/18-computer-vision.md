---
id: dl-computer-vision
title: Deep Learning for Computer Vision
description: >
  Explore how Deep Learning is used to see and understand the world, from
  simple classification to complex object detection and segmentation.
order: 18
---

Computer Vision (CV) is the field of AI that deals with how computers can be made to gain high-level understanding from digital images or videos. While CNNs are the workhorse of CV, it involves much more than just classifying photos.

## Image Representation

In a computer, an image is just a grid of numbers representing light intensity.
- **Grayscale**: 2D grid $(Width \times Height)$.
- **Color (RGB)**: 3D grid $(Width \times Height \times 3)$ representing Red, Green, and Blue channels.

## Image Preprocessing

Before feeding an image into a network, it must be "cleaned":
- **Resizing**: Most models require all input images to be the exact same size (e.g., $224 \times 224$).
- **Normalization**: Scaling pixel values from $[0, 255]$ to $[0, 1]$ or $[-1, 1]$ to help the network learn faster.
- **Denoising**: Removing electronic noise from low-quality photos.

## Major Vision Tasks

1. **Image Classification**: "What is in this photo?" (One label per image).
2. **Object Detection**: "Where are the objects, and what are they?" (Uses bounding boxes around cars, people, etc.). Models: **YOLO**, **SSD**.
3. **Image Segmentation**: "Which pixels belong to which object?" (Drawing an exact outline around a tumor or a road). Models: **U-Net**, **Mask R-CNN**.

## CNN-based Vision Pipelines

A modern vision pipeline usually looks like this:
1. **Backbone**: A pretrained CNN (like ResNet) that extracts the main features.
2. **Neck**: Layers that combine these features at different scales.
3. **Head**: The final layers that make the actual prediction (classification, detection, etc.).

---

## Real-world Applications
- **Medical AI**: Detecting cancer cells in X-rays or MRIs.
- **Self-Driving Cars**: Identifying lanes, pedestrians, and traffic lights in real-time.
- **Retail**: Automatic checkout systems that recognize products as you pick them up.
