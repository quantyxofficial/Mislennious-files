---
id: performance-optimization
title: Performance Optimization in NumPy
description: Understand why NumPy is fast and how to write code that takes full advantage of its efficiency.
order: 12
---

The main reason we use NumPy is **Performance**. Writing optimized NumPy code means thinking in terms of whole arrays rather than individual elements.

## Vectorization vs Loops
Avoid `for` loops whenever possible. Vectorized operations in NumPy push the loop down to highly optimized C/Fortran code.

**Example: Summing squares**
- **Bad (Loop)**:
  ```python
  total = 0
  for x in arr:
      total += x**2
  ```
- **Good (Vectorized)**:
  ```python
  total = np.sum(arr**2) # Significantly faster!
  ```

## Memory Efficiency
NumPy arrays are contiguous blocks of memory. 
- Using appropriate **dtypes** (e.g., `int8` instead of `int64`) can drastically reduce memory usage.
- **In-place operations**: Using `arr += 1` is more memory efficient than `arr = arr + 1` because it doesn't create a temporary intermediate array.

## Copy vs View: Avoid Redundancy
- **View**: A perspective on the original data. No new memory is allocated. (Returned by slicing, `ravel()`, `reshape()`).
- **Copy**: A complete replication of data. More memory used. (Returned by `flatten()`, fancy indexing, `.copy()`).

## Performance Checking
Use the `%%timeit` magic command in Jupyter or the `time` module in scripts to compare different implementation methods.
```python
import time
start = time.time()
# ... your code ...
print("Time taken:", time.time() - start)
```
