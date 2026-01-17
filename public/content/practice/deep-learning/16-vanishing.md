---
id: dl-16
topic: Deep Learning
difficulty: Hard
title: Vanishing Gradient
type: MCQ
companyTags: [Theory]
acceptanceRate: 50
---

# Scenario

Why did the Sigmoid activation function fall out of favor for deep networks (Hidden Layers)?

## Options

- `It is too computationally expensive.`
- `It caused the "Vanishing Gradient" problem, where gradients become close to zero, stopping the network from learning.`
- `It outputs negative numbers.`
- `It creates too many dead neurons.`

## Correct Answer

```
It caused the "Vanishing Gradient" problem, where gradients become close to zero, stopping the network from learning.
```

## Explanation

The derivative of Sigmoid is always < 0.25. Multiply small numbers over many layers, and the gradient effectively disappears. ReLU solves this.
