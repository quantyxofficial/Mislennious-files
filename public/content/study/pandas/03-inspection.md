---
id: inspection
title: Inspection Gadget
description: Understand your dataset instantly with head, info, and describe.
order: 3
---

## First Contact

You just loaded a file. You have no idea what's in it. Do NOT print the whole DataFrame (it might crash your terminal). Use these surgical tools instead.

### 1. `head()` and `tail()`

See the first or last N rows.

```python
print(df.head())   # First 5 rows (Default)
print(df.head(10)) # First 10 rows
print(df.tail(3))  # Last 3 rows
```

### 2. `info()`: The X-Ray

This is the **most important command**. It tells you:
*   How many non-null values (Finding missing data).
*   Data types (Did "Price" get loaded as a String?).
*   Memory usage.

```python
df.info()
# RangeIndex: 1000 entries, 0 to 999
# Data columns (total 3 columns):
#  #   Column  Non-Null Count  Dtype 
# ---  ------  --------------  ----- 
#  0   Name    1000 non-null   object
#  1   Age     950 non-null    float64 (50 missing!)
#  2   Score   1000 non-null   int64  
```

### 3. `describe()`: The Statistician

Instant summary statistics for all numerical columns.

```python
print(df.describe())
#        Age       Score
# count  950.0     1000.0
# mean   29.5      85.2
# std    12.1      10.5
# min    18.0      0.0
# 25%    22.0      80.0
# 50%    28.0      88.0
# 75%    35.0      92.0
# max    99.0      100.0
```

### 4. `columns` and `shape`

```python
print(df.columns) # ['Name', 'Age', 'Score']
print(df.shape)   # (1000, 3)
```

Always run `head()`, `info()`, and `shape` immediately after loading data.
