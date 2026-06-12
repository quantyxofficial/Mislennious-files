---
id: np-m-1
topic: NumPy
difficulty: Medium
title: Reshaping Data
type: Code
companyTags: [Google, Microsoft]
acceptanceRate: 72
---

# Scenario

You have an array of 12 elements representing monthly sales. You need to reshape it into a 3x4 matrix to analyze quarterly performance (3 quarters, 4 months each).

Given: `arr = np.array([100, 150, 200, 180, 220, 190, 210, 240, 230, 200, 190, 210])`

Write the code to reshape this array into a 3x4 matrix.

## Correct Answer

```python
arr.reshape(3, 4)
```

## Explanation

The `reshape()` method allows you to change the dimensions of an array without changing its data. The total number of elements must remain the same (3 × 4 = 12).

### Key Points:

- **Shape Compatibility**: The product of new dimensions must equal the total number of elements
- **Row-Major Order**: Elements are filled row by row (C-style)
- **Returns New View**: Original array is not modified unless you reassign it

### Alternative Solutions:

```python
# Using -1 to auto-calculate one dimension
arr.reshape(3, -1)  # Same result

# Using resize (modifies in-place)
arr.resize(3, 4)
```
