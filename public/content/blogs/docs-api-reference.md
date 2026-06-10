---
title: "Behind the Scenes: Core Engines"
description: "How KaizenStat handles hardware-aware acceleration, smart model selection, and automatic class imbalance correction."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "3 min read"
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80"
featured: false
---

# Behind the Scenes: Core Engines

Discover the architectural designs driving KaizenStat's data correction and machine learning pipelines.

---

## 🧠 Behind the Scenes: Core Engines

### 1. Hardware-Aware Execution
KaizenStat automatically checks your environment using `detect_device()`. It leverages **CUDA** on Nvidia GPUs and **MPS** on Apple Silicon (M1/M2/M3 Mac) to accelerate training when optional accelerators (such as `xgboost`) are installed.

### 2. Smart Model Selection
The benchmarking engine adjusts its model search space dynamically based on the dataset properties:
*   **Large Datasets (>100k rows)**: Excludes slow estimators (like standard Gradient Boosting) on CPU-only hosts to prevent computing lockups.
*   **High-Cardinality Categoricals**: Optimizes feature preprocessors and prioritizes tree-based models (Random Forests, Gradient Boosting, XGBoost).
*   **Continuous Targets**: Detects numerical profiles automatically and switches the entire pipeline to regression mode.

### 3. Automatic Imbalance Correction
During the data healing phase, KaizenStat computes target label ratios. If the target class distribution has a skew larger than **65% / 35%**, the engine automatically adjusts model hyperparameters (such as setting `class_weight="balanced"` in scikit-learn estimators) to combat label imbalance.
