---
id: random-module
title: Random Module in NumPy
description: Learn how to generate random data, work with probability distributions, and ensure reproducibility with seeds.
order: 10
---

Random number generation is crucial for data simulation, building test datasets, and initializing weights in machine learning models.

## `np.random` vs Python `random`
NumPy's `random` module is much faster and provides many more probability distributions than the standard Python `random` library.

## Generating Random Numbers
- **`np.random.rand(n)`**: Generates `n` random floats between 0 and 1.
- **`np.random.randint(low, high, size)`**: Generates random integers between `low` and `high`.
- **`np.random.randn(n)`**: Returns `n` samples from the "standard normal" distribution (mean 0, var 1).

```python
import numpy as np

# A 2x3 matrix of random integers between 0 and 100
arr = np.random.randint(0, 100, size=(2, 3))
```

## Probability Distributions
NumPy can generate data from many distributions:
- **Normal Distribution**: `np.random.normal(loc=0, scale=1, size=100)`
- **Uniform Distribution**: `np.random.uniform(0, 1, 100)`
- **Binomial Distribution**: `np.random.binomial(n=10, p=0.5, size=100)`

## The "Random Seed"
Random numbers in computers are "pseudo-random" (calculated by an algorithm). By setting a **Seed**, you ensure your code produces the same random numbers every time it's run. This is vital for **reproducibility**.

```python
np.random.seed(42) 
# No matter how many times you run this, you'll get the same result
print(np.random.rand(1)) 
```

## Shuffling and Permutation
- **`np.random.shuffle(arr)`**: Modifies the original array by randomly reordering its elements.
- **`np.random.permutation(arr)`**: Returns a new shuffled array (original remains unchanged).
