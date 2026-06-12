---
id: math-operations
title: Mathematical Operations in NumPy
description: Learn about vectorized arithmetic, universal functions (ufuncs), and the powerful concept of broadcasting.
order: 7
---

NumPy is designed to perform heavy mathematical computations without the need for explicit loops. This is achieved through **Vectorization**.

## Arithmetic Operations
You can perform element-wise arithmetic simply by using standard operators.
```python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b) # [11, 22, 33]
print(a * b) # [10, 40, 90]
print(a ** 2) # [1, 4, 9]
```

## Broadcasting Concept
Broadcasting allows NumPy to perform operations on arrays of different shapes. The smaller array is "broadcast" over the larger one so that they have compatible shapes.

**Example:** Adding a scaler to an array.
```python
arr = np.array([1, 2, 3])
print(arr + 5) # [6, 7, 8] -> 5 is broadcast to [5, 5, 5]
```

## Universal Functions (ufuncs)
A ufunc is a "Universal Function" that operates on ndarrays in an element-by-element fashion.
- `np.sqrt(arr)`: Square root
- `np.exp(arr)`: Exponential
- `np.sin(arr)`, `np.log(arr)`, etc.

## Aggregation Functions
These functions collapse the array into a single value (or a set of values along an axis).
- `np.sum(arr)`
- `np.mean(arr)`
- `np.max(arr)`
- `np.min(arr)`

## The "Axis" Concept
In a 2D array:
- **`axis=0`**: Operations performed **vertically** (down the rows, giving a result for each column).
- **`axis=1`**: Operations performed **horizontally** (across rows, giving a result for each row).

```python
arr = np.array([[1, 2], [3, 4]])
print(np.sum(arr, axis=0)) # [4, 6] (1+3, 2+4)
```
