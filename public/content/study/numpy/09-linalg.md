---
id: linear-algebra
title: Linear Algebra using NumPy
description: Dive into the world of vectors and matrices. Essential for understanding Machine Learning algorithms.
order: 9
---

NumPy's `linalg` module provides a high-level interface for standard linear algebra operations, which are the engine behind almost all AI and ML models.

## Vectors and Matrices
In NumPy:
- A **1D array** is treated as a **Vector**.
- A **2D array** is treated as a **Matrix**.

## Dot Product and Matrix Multiplication
- **`np.dot(a, b)`**: Dot product of two vectors or matrix multiplication.
- **`@` operator**: The modern Python syntax for matrix multiplication.

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix Multiplication
result = A @ B 
# result = [[19, 22], [43, 50]]
```

## Common Matrix Operations
Found in the `np.linalg` submodule:

1. **`np.linalg.det(A)`**: Calculates the **Determinant**.
2. **`np.linalg.inv(A)`**: Calculates the **Multiplicative Inverse** of a matrix.
3. **`np.linalg.eig(A)`**: Returns the **Eigenvalues** and **Eigenvectors**.

## Solving Linear Systems
NumPy can solve a system of linear equations (e.g., $Ax = b$):
```python
# 3x + y = 9
# x + 2y = 8
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)
# Result: [2, 3]
```

## Why this matters for ML?
Linear algebra is used to represent data (features), perform transformations (dimensionality reduction), and optimize loss functions (gradient descent).
