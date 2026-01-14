---
id: indexing-slicing
title: Array Indexing and Slicing
description: Master the art of selecting specific elements or subsets of data from your NumPy arrays.
order: 4
---

Selecting data is one of the most frequent tasks in numerical computing. NumPy offers powerful ways to index and slice your arrays.

## 1D Array Indexing
Just like Python lists, NumPy arrays use 0-based indexing.
```python
arr = np.array([10, 20, 30, 40])
print(arr[0]) # 10
print(arr[-1]) # 40 (negative indexing)
```

## 2D Array Indexing
Think of 2D arrays as tables with rows and columns. Use `[row, column]` syntax.
```python
arr2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2d[0, 1]) # Element at row 0, col 1 (Value: 2)
```

## Slicing Arrays
Slicing allows you to pull out a sub-section of an array using the `[start:end:step]` syntax.
- **1D Slicing**: `arr[1:4]` gets elements from index 1 to 3.
- **2D Slicing**: `arr[:2, 1:3]` gets the first two rows and columns 1 to 2.

## Advanced Indexing

### Boolean Indexing
Select elements based on a condition.
```python
arr = np.array([1, 5, 8, 10])
filtered = arr[arr > 5] # [8, 10]
```

### Fancy Indexing
Select multiple non-contiguous elements by passing a list of indices.
```python
arr = np.array([10, 20, 30, 40, 50])
print(arr[[0, 2, 4]]) # [10, 30, 50]
```

## Key Difference: View vs Copy
When you slice a NumPy array, it returns a **View** (a reference to the same data). If you modify the slice, the original array changes! To create a completely separate copy, use `.copy()`.
