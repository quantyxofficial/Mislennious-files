---
id: file-mastery
title: File I/O Mastery
description: Save your work - Efficiently load and store massive datasets.
order: 9
---

## Persistence

You've crunched the numbers. You've cleaned the dataset. It took 3 hours. You don't want to do it again.
You need to **Save** your array.

### 1. The NumPy Format (`.npy`)

This is the fastest and most efficient way to save a single array. It stores the data in binary format (not human-readable text), preserving shapes and data types perfectly.

```python
import numpy as np

data = np.random.rand(1000, 1000)

# Save
np.save('my_data.npy', data)

# Load
loaded_data = np.load('my_data.npy')
```

### 2. Saving Multiple Arrays (`.npz`)

Often you have multiple related arrays (e.g., `features` and `labels`). You can zip them into one archive.

```python
X = np.array([1, 2, 3])
y = np.array([0, 1, 0])

# Save as compressed archive
np.savez('dataset.npz', features=X, labels=y)

# Load
container = np.load('dataset.npz')
print(container['features']) # [1 2 3]
```

### 3. Text Files (CSV/TXT)

Sometimes you need to send data to Excel or a human. `.csv` is the universal language.
NumPy can handle this, though Pandas is usually better for complex CSVs.

```python
data = np.array([[10, 20], [30, 40]])

# Save to CSV
np.savetxt('data.csv', data, delimiter=',')

# Load from CSV
loaded_csv = np.loadtxt('data.csv', delimiter=',')
```

**Pro Tip**: Always use `.npy` for internal pipelines. Use `.csv` only when exporting to other tools.
