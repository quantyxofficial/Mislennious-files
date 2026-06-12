---
id: dl-15
topic: Deep Learning
difficulty: Medium
title: Batch Size
type: MCQ
companyTags: [Hyperparameters]
acceptanceRate: 80
---

# Scenario

What is "Batch Size"?

## Options

- `The total number of images.`
- `The number of examples processed before updating the model weights once.`
- `The size of the image files.`
- `The number of layers.`

## Correct Answer

```
The number of examples processed before updating the model weights once.
```

## Explanation

We don't update weights after *every* single image (too slow, too noisy). We process a "Batch" (e.g., 32 images), average the errors, and validly update.
