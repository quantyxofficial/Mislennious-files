---
id: dl-20
topic: Deep Learning
difficulty: Hard
title: Parameter Calculation
type: MCQ
companyTags: [Interview]
acceptanceRate: 40
---

# Scenario

You have an input of size 10 and a Dense layer with 5 neurons (and bias). How many trainable parameters?

## Options

- `15`
- `50`
- `55`
- `5`

## Correct Answer

```
55
```

## Explanation

`(Input * Neurons) + Bias`.
`(10 * 5) + 5 = 55`.
Each input connects to each neuron (50 weights), plus each neuron has 1 bias (5 biases).
