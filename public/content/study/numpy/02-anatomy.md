---
id: anatomy-array
title: Anatomy of an Array
description: Learn to build and visualize 1D, 2D, and 3D data structures from scratch.
order: 2
---

## The Building Blocks: `ndarray`

The core supervisor of the NumPy universe is the **`ndarray`** (n-dimensional array). Unlike a Python list which can hold anything (`[1, "apple", 3.14]`), a NumPy array is disciplined. It holds elements of the **same type** in a grid.

### 1. Creating Your First Array

The easiest way to create an array is to convert a Python list.

```python
import numpy as np

# A simple 1D array (Vector)
vector = np.array([1, 2, 3])
print(vector)
# Output: [1 2 3] (Notice no commas!)
```

### 2. Dimensions (Axes)

Data isn't always a flat line. It has shape. In NumPy, we talk about **axes**.

*   **1D Array (Vector)**: A single row of data. (e.g., valid_loss over 10 epochs)
*   **2D Array (Matrix)**: Rows and Columns. (e.g., an Excel sheet)
*   **3D Array (Tensor)**: Layers of Matrices. (e.g., a stack of images)

#### Creating a 2D Matrix
```python
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(matrix.shape)
# Output: (2, 3) -> 2 Rows, 3 Columns
```

### 3. Smart Creation Methods

Real pros don't type out data manually. We use generators.

| Method | Description | Example |
| :--- | :--- | :--- |
| `np.zeros((3,3))` | Creates a matrix full of 0s. Great for initialization. | `[[0, 0, 0]...]` |
| `np.ones((2,2))` | Creates a matrix full of 1s. | `[[1, 1]...]` |
| `np.arange(0, 10, 2)` | Like Python's `range()`. Start, Stop, Step. | `[0, 2, 4, 6, 8]` |
| `np.linspace(0, 10, 5)` | linearly spaced numbers. Perfect for plotting graphs. | `[0, 2.5, 5, 7.5, 10]` |

### 4. The Golden Rule: Homogeneity

NumPy arrays must be **homogeneous**. If you try to mix types, NumPy will "upcast" them to the most complex type to keep everything safe.

```python
mixed = np.array([1, 2, "hello"])
print(mixed)
# Output: ['1', '2', 'hello']
# Everything became a String! Math is now impossible.
```

**Takeaway**: Keep your data types pure. Integers with Integers. Floats with Floats.
