---
id: intro-to-numpy
title: Introduction to NumPy
description: Learn what NumPy is, why it's essential for data science, and how it differs from standard Python lists.
order: 1
---

Welcome to the foundation of data science in Python! **NumPy**, which stands for **Numerical Python**, is a powerful library used for working with arrays. It also provides functions for linear algebra, Fourier transform, and matrix operations.

## What is NumPy?

NumPy is a Python library that provides a multidimensional array object, various derived objects (such as masked arrays and matrices), and an assortment of routines for fast operations on arrays.

At its core, NumPy is based on the **ndarray** (n-dimensional array) object, which is a fast and space-efficient multidimensional array.

## Why is NumPy Needed?

In Python, we have **lists** that can act like arrays, but they are slow to process. NumPy provides a specialized array object that can be up to **50× faster** than traditional Python lists.

### Limitations of Python Lists

- **Generic Storage**: Lists store pointers to objects, which adds memory overhead.
- **Not Vectorized**: Mathematical operations cannot be applied element-wise directly (e.g., `list * 2` repeats the list).
- **Slower Speed**: Due to dynamic typing and poor memory locality.

## Advantages of NumPy

1. **Speed**: NumPy arrays are stored in contiguous memory blocks, enabling efficient computation.
2. **Convenience**: Mathematical operations on arrays are intuitive and concise.
3. **Optimized for Hardware**: Implemented in C and C++, NumPy delivers high CPU-level performance.

## Applications of NumPy

NumPy is the "gold standard" for numerical computing in Python and is widely used in:

- **Data Analysis**: Cleaning, transforming, and aggregating data.
- **Machine Learning**: Managing feature vectors, weights, and matrices.
- **Deep Learning**: Supporting tensor operations in frameworks like TensorFlow and PyTorch.
- **Image Processing**: Representing images as multidimensional arrays.

## NumPy in Data Science, ML, and AI

Almost every major library in the Python data science ecosystem—such as Pandas, Matplotlib, and Scikit-learn—is built on top of NumPy. Without NumPy, high-performance numerical computing in Python would be nearly impossible.

## Example

```python
# Standard Python List (No direct math)
my_list = [1, 2, 3]
# my_list * 2 results in [1, 2, 3, 1, 2, 3]

# NumPy Array (Vectorized math)
import numpy as np
my_array = np.array([1, 2, 3])
# my_array * 2 results in [2, 4, 6]
