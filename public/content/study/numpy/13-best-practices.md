---
id: best-practices-errors
title: NumPy Best Practices & Common Errors
description: Tips to write cleaner code and a guide to understanding common error messages you'll encounter.
order: 13
---

As you become a power user, following best practices will make your code more readable, efficient, and easier to debug.

## Best Coding Practices
1. **Always Use the `np` Alias**: Stick to the community standard `import numpy as np`.
2. **Prefer ufuncs over Loops**: Whenever a math task is needed, check if a NumPy ufunc exists first.
3. **Be Explicit with Shapes**: Use `arr.reshape(-1, 1)` if you need a specific 2D shape, where `-1` automatically calculates the remaining dimension.
4. **Use Vectorized Boolean Indexing**: It’s faster and cleaner than writing `if-else` blocks inside loops.

## Common Errors to Watch Out For

### 1. `ValueError: cannot reshape array...`
**Why?** You are trying to reshape an array into a shape that doesn't have the same number of elements.
*Solution*: Ensure `Rows * Columns == arr.size`.

### 2. `ValueError: operands could not be broadcast...`
**Why?** You are trying to perform an operation on two arrays that have incompatible shapes for broadcasting.
*Solution*: Review the broadcasting rules. Usually, one of the dimensions must be `1` or the dimensions must match.

### 3. `IndexError: index is out of bounds...`
**Why?** You are trying to access an index that doesn't exist.
*Solution*: Check `arr.shape` to see the limits of your axes.

### 4. `TypeError: 'numpy.ndarray' object is not callable`
**Why?** You likely used parentheses `()` instead of square brackets `[]` when indexing an array.
*Example*: `arr(0)` should be `arr[0]`.

## Debugging Tips
- **Print Shapes Often**: Use `print(arr.shape)` at every step of your data pipeline.
- **Check Dtypes**: Ensure you aren't accidentally trying to store text in an integer array.
- **Use `arr.flags`**: This tells you if the array owns its data (Copy) or is a View.
