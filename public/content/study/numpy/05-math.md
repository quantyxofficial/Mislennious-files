---
id: math-at-scale
title: Mathematics at Scale
description: Unlock the power of Broadcasting to perform math on millions of numbers instantly.
order: 5
---

## Superpower: Vectorization

Remember the "Loop-Free" philosophy? This is it. NumPy allows you to do math on arrays as if they were single numbers.

### 1. Element-wise Operations

If you want to add 10 to every number in a list of a million items:
*   **Python**: Write a for loop.
*   **NumPy**: Just add 10.

```python
import numpy as np

arr = np.array([1, 2, 3, 4])

print(arr + 10) # [11, 12, 13, 14]
print(arr * 2)  # [2, 4, 6, 8]
print(arr ** 2) # [1, 4, 9, 16] (Squaring)
```

You can also use two arrays. They interact element-by-element.
```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])

print(a - b) # [9, 18, 27]
```

### 2. Universal Functions (ufuncs)

NumPy comes with highly optimized functions for standard math.
*   `np.sin()`, `np.cos()`
*   `np.log()` (Natural logarithm)
*   `np.exp()` (Exponential)
*   `np.sqrt()` (Square root)

```python
data = np.array([1, 4, 9])
print(np.sqrt(data)) # [1. 2. 3.]
```

### 3. Broadcasting: The Magic Trick

What happens if you try to add a Matrix `(3, 3)` and a Vector `(3)`?
In standard Linear Algebra, this is illegal. You can't add shapes that don't match.

**NumPy is smarter.** It "Broadcasts" (stretches) the smaller array to fit the larger one.

#### Scenario
We have the scores of 3 students across 3 tests. We want to add a "bonus curve" of 5 points to *every test*.

```python
students_scores = np.array([
    [70, 80, 90],
    [50, 60, 70],
    [80, 85, 90]
])

# Add 5 to every single element
final_scores = students_scores + 5
```

#### Advanced Broadcasting
What if we want to add a *different* bonus to each student?
*   Student A: +10
*   Student B: +0
*   Student C: +5

```python
bonuses = np.array([[10], [0], [5]]) # Shape (3, 1)

# NumPy stretches the (3,1) column across the columns to match (3,3)
adjusted = students_scores + bonuses
```

Broadcasting allows you to write incredibly concise code for complex normalization tasks. It's the secret sauce of performant ML code.
