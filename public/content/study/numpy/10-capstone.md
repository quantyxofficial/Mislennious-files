---
id: capstone
title: Capstone: Finance Analysis
description: Apply everything you've learned to analyze a real-world stock market dataset.
order: 10
---

## Scenario: The Quantitative Analyst

You have been hired as a Junior Quant. Your boss gives you the closing prices of a stock for the last 10 days.
Your job is to analyze the volatility and identifying buying opportunities.

### The Data

```python
import numpy as np

# Closing prices for 10 days
prices = np.array([150, 152, 153, 151, 158, 160, 155, 157, 162, 165])
```

### Task 1: Calculate Daily Returns

How much did the stock grow (or shrink) each day?
*Formula*: (Today - Yesterday) / Yesterday

We can use slicing to create two arrays: "Todays" (Index 1 to End) and "Yesterdays" (Index 0 to End-1).

```python
today = prices[1:]    # [152, 153, ...]
yesterday = prices[:-1] # [150, 152, ...]

returns = (today - yesterday) / yesterday
print(returns)
# Output: [0.0133..., 0.0065..., ...]
```

### Task 2: Find Volatility (Standard Deviation)

Is this a risky stock?

```python
volatility = np.std(returns)
print(f"Volatility: {volatility:.4f}")
```

### Task 3: Identify High Growth Days

Find all days where the return was greater than 2%.

```python
high_growth_mask = returns > 0.02
high_growth_days = returns[high_growth_mask]

print(f"High Growth Days: {high_growth_days}")
```

### Task 4: Prediction (Moving Average)

Calculate the 3-day Simple Moving Average (SMA) to smooth out noise. A powerful technique in trading algorithms.

```python
# A convolution (sliding window) trick
window = np.ones(3) / 3
sma = np.convolve(prices, window, mode='valid')

print(f"Moving Averages: {sma}")
```

### Conclusion

You just built a financial analysis pipeline using:
1.  **Arrays** (Data storage)
2.  **Slicing** (Aligning days)
3.  **Vectorized Math** (Calculating returns instantly)
4.  **Statistics** (Volatility)
5.  **Filtering** (Finding opportunities)

This is the power of NumPy. You are now ready to handle real-world data.
