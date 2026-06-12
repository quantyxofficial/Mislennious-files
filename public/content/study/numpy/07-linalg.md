---
id: linear-algebra
title: Linear Algebra Magic
description: The engine of Machine Learning - Dot products and Matrix multiplication simplified.
order: 7
---

## The Engine of Modern AI

You can't do Machine Learning without Linear Algebra. And you can't do Linear Algebra in Python efficiently without NumPy.

Every neural network is essentially a massive chain of matrix multiplications. NumPy makes this math trivial.

### 1. The Dot Product

The most famous operation.
*   **Algebra**: Sum of products of corresponding entries.
*   **NumPy**: `np.dot(a, b)` or `a @ b` (The `@` operator is elegant).

```python
import numpy as np

# Vector Dot Product
v1 = np.array([1, 2])
v2 = np.array([3, 4])

# (1*3) + (2*4) = 3 + 8 = 11
print(v1 @ v2) 
# Output: 11
```

### 2. Matrix Multiplication (MatMul)

When multiplying matrices, the **Inner Dimensions** must match.
*   `(3, 2)` can multiply `(2, 4)` -> Result `(3, 4)`
*   `(2, 3)` cannot multiply `(2, 3)` -> Error!

```python
A = np.array([
    [1, 2],
    [3, 4]
]) # Shape (2, 2)

B = np.array([
    [5, 6],
    [7, 8]
]) # Shape (2, 2)

result = A @ B
print(result)
```

**Note**: `A * B` is NOT matrix multiplication. That is element-wise multiplication (multiplying the number in cell 0,0 with the number in cell 0,0). For true Linear Algebra, use `@`.

### 3. Systems of Equations

Solve for x and y:
1.  `2x + 3y = 8`
2.  `x - y = -1`

In NumPy, this is a one-liner `np.linalg.solve()`.

```python
coefficients = np.array([[2, 3], [1, -1]])
results = np.array([8, -1])

solution = np.linalg.solve(coefficients, results)
print(solution) 
# Output: [1. 2.] -> x=1, y=2
```

### Key Functions in `np.linalg`

| Function | Description |
| :--- | :--- |
| `np.linalg.inv(matrix)` | Calculates the inverse of a matrix. |
| `np.linalg.det(matrix)` | Calculates the determinant. |
| `np.linalg.eig(matrix)` | Computes eigenvalues and eigenvectors (PCA core). |
| `np.linalg.norm(vector)` | Calculates the length (magnitude) of a vector. |

Mastering `np.dot` / `@` is 80% of the battle.
