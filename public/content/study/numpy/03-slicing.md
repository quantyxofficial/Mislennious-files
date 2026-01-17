---
id: slicing-surgeon
title: The Slicing Surgeon
description: Extract exactly the data you need with surgical precision using indexing and slicing.
order: 3
---

## Precision Data Extraction

In data science, you rarely work with the *whole* dataset at once. You train on a batch. You look at the last 10 days of stock prices. You crop an image.

This is where **Indexing** (picking one item) and **Slicing** (picking a range) come in.

### 1. Basic Indexing (Just like Python)

If you know Python lists, this is easy.

```python
import numpy as np
arr = np.array([10, 20, 30, 40])

print(arr[0])  # 10 (First element)
print(arr[-1]) # 40 (Last element)
```

### 2. Slicing: The Colony [`Start:Stop:Step`]

The syntax `[start:stop:step]` is your scalpel.
*   **Start**: Included.
*   **Stop**: Excluded (Up to, but not including).
*   **Step**: Variance (Optional).

```python
data = np.array([0, 10, 20, 30, 40, 50])

print(data[0:3])   # [0, 10, 20] (Indices 0, 1, 2)
print(data[3:])    # [30, 40, 50] (Index 3 to End)
print(data[:3])    # [0, 10, 20] (Start to Index 3)
print(data[::2])   # [0, 20, 40] (Every 2nd item)
```

### 3. The 2D Surgeon: Multi-Axis Slicing

This is where NumPy shines. You can slice rows and columns simultaneously using a comma `,`.

`array[row_slice, column_slice]`

Imagine a matrix:
```python
matrix = np.array([
    [1, 2, 3],  # Row 0
    [4, 5, 6],  # Row 1
    [7, 8, 9]   # Row 2
])
```

#### Scenario A: "I want the first two rows."
```python
print(matrix[:2, :])
# Result:
# [[1, 2, 3],
#  [4, 5, 6]]
```

#### Scenario B: "I want only the last column."
```python
print(matrix[:, 2])
# Result: [3, 6, 9]
```

#### Scenario C: "Crop the center."
We want the sub-matrix `[[5, 6], [8, 9]]`.
```python
# Rows: Index 1 onwards. Columns: Index 1 onwards.
print(matrix[1:, 1:])
```

### 4. Boolean Indexing (The Filter)

What if you want "All numbers greater than 5"? You don't know their positions, you only know the condition.

```python
data = np.array([1, 10, 2, 9, 3, 8])

# Step 1: Create a filter (True/False map)
mask = data > 5
# [False, True, False, True, False, True]

# Step 2: Apply the mask
filtered = data[mask]
print(filtered)
# [10, 9, 8]
```

This is how we filter spam emails, remove outliers, or select high-value customers. No loops required.
