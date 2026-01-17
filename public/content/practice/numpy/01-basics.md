---
id: np-01
topic: Numpy
difficulty: Basic
title: NumPy vs Lists
type: MCQ
companyTags: [Google, Amazon]
acceptanceRate: 95
---

# Scenario

Which of the following is the primary advantage of using NumPy arrays over standard Python lists?

## Options

- `NumPy arrays are more flexible and can hold mixed data types.`
- `NumPy arrays consume more memory but offer better readability.`
- `NumPy arrays are stored in contiguous memory, enabling vectorized operations and greater speed.`
- `NumPy arrays are built-in to Python and don't require import.`

## Correct Answer

```
NumPy arrays are stored in contiguous memory, enabling vectorized operations and greater speed.
```

## Explanation

The key difference is storage. Python lists store pointers to objects scattered in memory. NumPy arrays store uniform data in a continuous block, allowing the CPU to process them efficiently (SIMD).
