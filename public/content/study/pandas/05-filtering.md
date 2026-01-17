---
id: filtering
title: Filtering & Queries
description: Extract specific rows using boolean logic and queries.
order: 5
---

## Asking Questions

Data analysis is about asking questions. "Show me all users over 25." "Show me sales from fast month."

### 1. Boolean Indexing (The Standard Way)

Just like NumPy, you create a True/False mask.

```python
# Step 1: Create Mask
# Returns a Series of True/False
mask = df['Age'] > 25

# Step 2: Apply Mask
# Returns only rows where Age > 25
adults = df[mask]

# One-liner (Common)
adults = df[df['Age'] > 25]
```

### 2. Multiple Conditions (`&`, `|`)

PYTHON WARNING: unique to Pandas/NumPy:
*   Use `&` instead of `and`.
*   Use `|` instead of `or`.
*   **Wrap conditions in parentheses `()`**.

```python
# Age > 25 AND City is 'NY'
target = df[(df['Age'] > 25) & (df['City'] == 'NY')]
```

### 3. The `query()` Method (The Readable Way)

If you like SQL, you will love `query()`. It lets you write conditions as strings.

```python
target = df.query("Age > 25 and City == 'NY'")
```

### 4. `isin()`

Great for checking against a list.

```python
# Show me users in NY or Paris
cities = ['NY', 'Paris']
target = df[df['City'].isin(cities)]
```
