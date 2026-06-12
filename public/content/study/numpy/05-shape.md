---
id: shape-manipulation
title: Array Shape Manipulation
description: Learn how to change the dimensions and structure of your arrays without changing the data.
order: 5
---

The shape of an array defines how many elements it has and in how many dimensions. Often, you need to change this shape to match the requirements of specific algorithms (like ML models).

## `reshape()`
Changes the shape of an array without changing its data.
```python
arr = np.arange(12) # [0, 1, ..., 11]
new_arr = arr.reshape(3, 4) # 3 rows, 4 columns
```
*Note: The total volume (number of elements) must remain exactly the same.*

## `flatten()` and `ravel()`
Both are used to convert a multidimensional array into a 1D array.
- **`flatten()`**: Returns a **copy** of the array.
- **`ravel()`**: Returns a **view** (faster, uses less memory).

## `transpose()`
Flips the array over its diagonal; effectively switches rows and columns.
```python
matrix = np.array([[1, 2], [3, 4]])
transposed = matrix.T # OR np.transpose(matrix)
# Result: [[1, 3], [2, 4]]
```

## `expand_dims()` and `squeeze()`
- **`expand_dims()`**: Internalizes a new axis (dimension) at a specific position. Useful for adding a "batch" dimension in Deep Learning.
- **`squeeze()`**: Removes single-dimensional entries from the shape (e.g., changes `(1, 5)` to `(5,)`).

## `resize()`
Similar to `reshape`, but it modifies the original array and can handle shape changes with different volumes (by repeating or truncating data).
