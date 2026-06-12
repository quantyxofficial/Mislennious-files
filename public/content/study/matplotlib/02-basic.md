---
id: basic
title: Basic Plots
description: The big three - Line, Scatter, and Bar charts.
order: 2
---

## The Big Three

90% of data science is just these three charts.

### 1. Line Plot (`ax.plot`)
Best for: **Temporal data** (Time series) or mathematical functions.

```python
x = [1, 2, 3, 4]
y = [10, 20, 25, 30]

fig, ax = plt.subplots()
ax.plot(x, y)
```

### 2. Scatter Plot (`ax.scatter`)
Best for: **Relationships** (Correlation). Does height correlate with weight?

```python
height = [170, 180, 160]
weight = [70, 80, 60]

fig, ax = plt.subplots()
ax.scatter(height, weight)
```

### 3. Bar Chart (`ax.bar`)
Best for: **Categorical comparison**. How much did each department sell?

```python
categories = ['Sales', 'HR', 'IT']
values = [100, 50, 80]

fig, ax = plt.subplots()
ax.bar(categories, values)
```

**Pro Tip**: Use `ax.barh` for *Horizontal* bars. It's much easier to read long labels.
