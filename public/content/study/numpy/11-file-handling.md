---
id: file-handling
title: File Handling with NumPy
description: Learn how to save your processed data to disk and load it back into memory efficiently.
order: 11
---

Often you need to store your arrays for future use or share them with others. NumPy provides binary and text-based formats for this purpose.

## Binary Formats (Recommended)
NumPy's internal binary formats are highly efficient and preserve data types and shapes perfectly.
- **`.npy`**: Used for saving a single array.
- **`.npz`**: Used for saving multiple arrays in a single compressed file.

```python
import numpy as np
arr = np.array([1, 2, 3, 4])

# Saving
np.save('my_array.npy', arr)

# Loading
loaded_arr = np.load('my_array.npy')
```

## Text/CSV Formats
If you need to view data in Excel or share it with people not using Python, you can use text formats.
- **`np.savetxt()`**: Save to a text file (defaults to space-separated).
- **`np.loadtxt()`**: Load from a text file.
- **`np.genfromtxt()`**: A more robust version of `loadtxt` that can handle missing values.

```python
# Saving as CSV
np.savetxt('data.csv', arr, delimiter=',', header='Column1')

# Loading from CSV
data = np.loadtxt('data.csv', delimiter=',', skiprows=1)
```

## Summary of Methods
| Task | Binary (Fast) | Text (Portable) |
| :--- | :--- | :--- |
| **Save Single** | `np.save()` | `np.savetxt()` |
| **Save Multiple** | `np.savez()` | (Not available) |
| **Load** | `np.load()` | `np.loadtxt()` / `np.genfromtxt()` |
