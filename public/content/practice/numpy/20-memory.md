---
id: np-20
topic: Numpy
difficulty: Hard
title: Memory Optimization
type: MCQ
companyTags: [High Frequency Trading]
acceptanceRate: 35
---

# Scenario

Which array consumes the **least** memory?

## Options

- `np.zeros((1000,), dtype='int8')`
- `np.zeros((1000,), dtype='float64')`
- `np.zeros((1000,), dtype='int32')`
- `np.zeros((1000,), dtype='bool')`

## Correct Answer

```
np.zeros((1000,), dtype='bool')
```

## Explanation

*   `bool`: 1 byte per element (usually).
*   `int8`: 1 byte.
*   `int32`: 4 bytes.
*   `float64`: 8 bytes.

Actually, strictly speaking, NumPy `bool` is stored as a byte (8 bits), same as `int8`. However, semantically `bool` is the smallest logic unit. In some specialized contexts `int8` equals `bool` in size, but `float64` is definitely the largest (8x bigger).
