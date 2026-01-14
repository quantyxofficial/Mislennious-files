---
id: np-b-1
topic: NumPy
difficulty: Basic
title: Array Creation
type: MCQ
companyTags: [Amazon, Adobe]
acceptanceRate: 88
---

# Scenario

You have a list of prices: [10, 20, 30, 40]. You need to convert this into a NumPy array to perform mathematical operations efficiently.

## Options

- `np.array([10, 20, 30, 40])`
- `np.create_list([10, 20, 30, 40])`
- `np.object([10, 20, 30, 40])`
- `np.generate([10, 20, 30, 40])`

## Correct Answer

```python
np.array([10, 20, 30, 40])
```

## Explanation

`np.array()` is the standard function to create a NumPy array from a Python list. This is the most common and recommended way to convert Python lists into NumPy arrays for efficient numerical operations.

### Why NumPy Arrays?

- **Performance**: NumPy arrays are much faster than Python lists for numerical operations
- **Memory Efficiency**: Arrays store data more compactly
- **Vectorization**: Enables element-wise operations without loops
