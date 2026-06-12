---
id: numpy-dtypes
title: NumPy Data Types (dtype)
description: Understand the different data types available in NumPy and how to control memory usage with precision.
order: 6
---

Unlike Python's primitive types which are very general, NumPy gives you fine-grained control over how data is stored in memory.

## Common NumPy Data Types
NumPy uses a character code (like 'i' for integer) or a full name (like `np.int64`) to represent data types.

| Type | NumPy Name | Description |
| :--- | :--- | :--- |
| **Integer** | `int8`, `int32`, `int64` | Signed integers of various bits. |
| **Float** | `float16`, `float64` | Floating point numbers. |
| **Complex** | `complex64`, `complex128` | Complex numbers (real + imaginary). |
| **Boolean** | `bool_` | True or False. |
| **String** | `string_`, `unicode_` | Fixed-length string and unicode. |

## Why dtypes Matter
- **Memory Efficiency**: If you know your numbers are between 0-255, using `int8` uses 8x less memory than the default `int64`.
- **Precision**: Scientific calculations often require `float64` for high precision.

## Specifying dtypes
You can define the type when creating an array using the `dtype` argument.
```python
import numpy as np
arr = np.array([1, 2, 3, 4], dtype='i4') # 4-byte integer
print(arr.dtype) # int32
```

## Type Casting (`astype`)
Existing arrays can be converted to a different type.
```python
arr = np.array([1.1, 2.1, 3.1]) # Default is float64
int_arr = arr.astype('i')       # Convert to int (truncates decimals)
```

## Custom dtypes (Structured Arrays)
You can even create your own dtypes that contain multiple fields, similar to a database record.
```python
dt = np.dtype([('name', 'U10'), ('age', 'i4')])
users = np.array([('Alice', 25), ('Bob', 30)], dtype=dt)
```
