---
id: selecting
title: Selecting Data
description: The battle of loc vs iloc - How to grab exactly what you need.
order: 4
---

## Accessing Your Data

In NumPy, we used `[row, col]`. In Pandas, it's more specific.
There are two main accessors: **`loc`** (Label-based) and **`iloc`** (Index-based).

### 1. `iloc` (Integer Location)
Use this when you want to select by **position number** (0, 1, 2...). This is exactly like NumPy.

```python
# Row 0, Column 1
value = df.iloc[0, 1]

# First 5 rows, First 2 columns
subset = df.iloc[:5, :2]
```

### 2. `loc` (Label Location)
Use this when you want to select by **Row Name** (index) or **Column Name**. This is usually more readable.

```python
# Row with index 'Apple', Column 'Price'
value = df.loc['Apple', 'Price']

# All rows, but only 'Name' and 'Score' columns
subset = df.loc[:, ['Name', 'Score']]
```

### 3. Selecting a Single Column

Selecting a single column returns a **Series**.

```python
ages = df['Age'] # Simple and common
```

Selecting a list of columns returns a **DataFrame**.

```python
tiny_df = df[['Name', 'Age']] # Notice double brackets
```

**Rule of Thumb**:
*   Use `iloc` if you are iterating or automating.
*   Use `loc` for human-readable data analysis.
