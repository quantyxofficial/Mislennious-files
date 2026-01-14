---
id: installing-numpy
title: Installing and Importing NumPy
description: Step-by-step guide to setting up NumPy in your environment and your first program.
order: 2
---

Before we start crunching numbers, we need to ensure NumPy is installed and correctly configured in your Python environment.

## Installing NumPy
The most common way to install NumPy is using **pip**, the Python package manager.

Open your terminal or command prompt and run:
```bash
pip install numpy
```

If you are using **Anaconda/Conda**, use:
```bash
conda install numpy
```

## Importing NumPy
Once installed, you can import it into your Python script. By convention, it is almost always imported with the alias `np` to save typing.

```python
import numpy as np
```

## NumPy Version Checking
It's a good practice to check which version of NumPy you are using, as some functions might behave differently across versions.

```python
import numpy as np
print(np.__version__)
```

## First NumPy Program
Let's verify everything is working by creating a simple array and printing it.

```python
import numpy as np

# Create a 1D array
arr = np.array([1, 2, 3, 4, 5])

print("Array:", arr)
print("Type:", type(arr))
```

### Explanation of the Code:
1. `import numpy as np`: Loads the library and gives it a nickname.
2. `np.array(...)`: A constructor function that creates a NumPy array.
3. `type(arr)`: Displays `<class 'numpy.ndarray'>`, which is the fundamental array type in NumPy.
