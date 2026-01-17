---
id: shape-shifter
title: Shape Shifter
description: Master dimensions: Reshape, Flatten, and Transpose arrays to fit any model.
order: 4
---

## The Art of Transformation

Data rarely comes in the shape you need.
*   An image might be loaded as a flat list of pixels, but your model needs a 2D grid.
*   A matrix might be `(Rows, Columns)`, but math requires `(Columns, Rows)`.

In NumPy, changing shape is **instant** and practically free (it doesn't copy data, just changes the view).

### 1. Reshape: The Most Common Operation

`arr.reshape(new_shape)`

You have 12 numbers. You can organize them in many ways:
*   1 row of 12
*   3 rows of 4
*   4 rows of 3
*   6 rows of 2

```python
import numpy as np

flat = np.arange(12) # [0, 1, ..., 11]

# Convert to 3x4 Matrix
matrix = flat.reshape(3, 4)
print(matrix)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
```

**Note**: The total number of elements must remain the same. `3 * 4 = 12`. You can't reshape 12 items into `(3, 5)`.

#### The `-1` Trick
Lazy? Let NumPy calculate the missing dimension.
```python
# "I want 3 rows, you figure out the columns"
lazy = flat.reshape(3, -1)
# NumPy calculates: 12 / 3 = 4 columns.
```

### 2. Flatten: The "Pancake" Move

Sometimes you have a complex 3D or 2D structure and you just want a single long list (e.g., feeding pixels into a dense neural network).

```python
image = np.array([
    [255, 0],
    [0, 255]
])

flat_image = image.flatten()
print(flat_image)
# [255, 0, 0, 255]
```

### 3. Transpose: Flip it

Transposing swaps axes. Rows become columns. Columns become rows. This is crucial in Linear Algebra.

```python
matrix = np.array([
    [1, 2],
    [3, 4]
]) # Shape (2, 2)

flipped = matrix.T  # .T is the shortcut for .transpose()
print(flipped)
# [[1, 3]
#  [2, 4]]
```

### Summary of Commands

| Command | Action |
| :--- | :--- |
| `.shape` | Check current dimensions. |
| `.reshape(r, c)` | Change dimensions. |
| `.flatten()` | Collapse into 1D array. |
| `.T` | Swap axes (Transpose). |

Master these, and you can massage any dataset into submission.
