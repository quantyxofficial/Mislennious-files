---
id: randomness
title: Randomness & Probability
description: Simulate reality by generating synthetic data and probability distributions.
order: 8
---

## Controlling Chaos

Randomness is essential for:
1.  **Initializing Neural Networks** (Starting weights).
2.  **Splitting Data** (Train/Test sets).
3.  **Simulations** (Monte Carlo experiments).

NumPy's `numpy.random` module is your casino dealer.

### 1. Generating Random Numbers

```python
import numpy as np

# A single random float between 0 and 1
print(np.random.rand())

# A standard normal distribution (Gaussian)
# Mean=0, Std=1
print(np.random.randn(3, 3)) 

# Random Integers (Low, High, Size)
# Roll a dice 10 times
dice_rolls = np.random.randint(1, 7, size=10)
print(dice_rolls)
```

### 2. Reproducibility: The Seed

In science, results must be reproducible. If your "random" numbers change every time, you can't debug your model.
We use a **Seeed** to make randomness deterministic.

```python
np.random.seed(42)

print(np.random.rand()) # 0.374...
print(np.random.rand()) # 0.950...

# If you restart the script, these exact same numbers will appear.
```

### 3. Sampling and Shuffling

You have a deck of cards (an array). You want to shuffle it.

```python
deck = np.array(["Ace", "King", "Queen", "Jack"])

# Shuffle in-place
np.random.shuffle(deck)
print(deck)

# Pick a random card
card = np.random.choice(deck)
print(card)
```

### 4. Distributions

Nature follows rules. NumPy can mimic them.
*   **Normal**: Heights, Test Scores.
*   **Uniform**: Rolling a fair die.
*   **Poisson**: Number of emails arriving per hour.
*   **Binomial**: Coin flips.

```python
# Simulate 1000 coin flips (0 or 1)
flips = np.random.binomial(n=1, p=0.5, size=1000)
```
