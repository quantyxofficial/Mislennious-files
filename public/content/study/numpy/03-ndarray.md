---
id: numpy-ndarray
title: NumPy Arrays (ndarray)
description: Explore the ndarray object, creation methods, attributes, and how it compares to Python lists.
order: 3
---

The heart of NumPy is the **ndarray** (N-dimensional array). It is a grid of values, all of the same type, and is indexed by a tuple of non-negative integers.

## What is ndarray?
An **ndarray** is a generic multidimensional container for homogeneous data; that is, all the elements must be the same type.

## Creating Arrays
NumPy provides several ways to initialize new arrays:

| Method | Description | Example |
| :--- | :--- | :--- |
| `np.array()` | Create from a list/tuple | `np.array([1, 2, 3])` |
| `np.arange()` | Range of values (like py range) | `np.arange(0, 10, 2)` |
| `np.zeros()` | Array filled with zeros | `np.zeros((2, 3))` |
| `np.ones()` | Array filled with ones | `np.ones((3, 3))` |
| `np.full()` | Constant value array | `np.full((2, 2), 7)` |
| `np.eye()` | Identity matrix | `np.eye(3)` |

## Array Attributes
Every NumPy array has specific properties that describe its structure:
- **`ndim`**: The number of dimensions (axes).
- **`shape`**: A tuple representing the size of each dimension.
- **`size`**: The total number of elements in the array.
- **`dtype`**: The data type of the elements (int64, float32, etc.).

```python
import numpy as np
a = np.array([[1,2,3],[4,5,6]])

print(a.ndim)   # 2
print(a.shape)  # (2, 3)
print(a.size)   # 6
print(a.dtype)  # int64 (usually)
```

## Type Conversion (`astype`)
You can convert an array from one type to another using the `astype` method.
```python
arr = np.array([1.1, 2.1, 3.1])
new_arr = arr.astype('i') # Convert to integer
```

## NumPy Array vs Python List
| Feature | Python List | NumPy Array |
| :--- | :--- | :--- |
| **Data Type** | Heterogeneous (Multiple types) | Homogeneous (Single type) |
| **Performance** | Slower | Significantly Faster |
| **Memory** | More Memory | Memory Efficient |
| **Ease of Use** | General Purpose | Scientific/Mathematical |
