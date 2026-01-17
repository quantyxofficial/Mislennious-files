---
id: dl-17
topic: Deep Learning
difficulty: Hard
title: Softmax Probability
type: MCQ
companyTags: [Evaluation]
acceptanceRate: 60
---

# Scenario

You have a 3-class problem. The Softmax output is `[2.0, 1.0, 0.1]`. What is wrong with this?

## Options

- `Nothing is wrong.`
- `Softmax outputs must sum to 1.0 and be probabilities (0-1).`
- `Softmax cannot be used for 3 classes.`
- `The values must be negative.`

## Correct Answer

```
Softmax outputs must sum to 1.0 and be probabilities (0-1).
```

## Explanation

Softmax converts raw scores (logits) into probabilities. `[0.7, 0.2, 0.1]` is a valid Softmax output. `[2.0, ...]` is likely raw logits *before* the Softmax activation.
