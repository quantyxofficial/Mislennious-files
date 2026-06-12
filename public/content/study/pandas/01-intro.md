---
id: excel-killer
title: Pandas: The Excel Killer
description: Why Pandas is the industry standard for data manipulation.
order: 1
---

## Welcome to the DataFrame

If NumPy is the hammer, **Pandas** is the entire workshop.

Excel is great for viewing data. But when you have 10 million rows, or you need to automate a report that runs every morning, Excel crashes. Pandas does not.

### The Two Core Structures

Pandas is built on top of NumPy, but it adds labels.

#### 1. The Series (1D)
Think of a **Series** as a single column in Excel. It has values and an index (labels).

```python
import pandas as pd

prices = pd.Series([10, 20, 30], index=['Apple', 'Banana', 'Cherry'])
print(prices['Apple']) # 10
```

#### 2. The DataFrame (2D)
A **DataFrame** is a table. It is a collection of Series sharing the same index. This is your primary workspace.

```python
data = {
    'Name': ['Alice', 'Bob'],
    'Age': [25, 30],
    'City': ['New York', 'Paris']
}

df = pd.DataFrame(data)
print(df)
```

### Why Pandas?

1.  **Handles Metadata**: Unlike NumPy, columns have names (`Age`, `Price`).
2.  **Mixed Types**: A DataFrame can have Integers in one column and Strings in another.
3.  **Missing Data**: Built-in support for `NaN` (Not a Number).
4.  **SQL-like Power**: GroupBy, Join, and Pivot are built-in.

In this module, you will learn to manipulate data faster than you ever thought possible.
