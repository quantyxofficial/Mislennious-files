---
id: merging
title: Merging Worlds
description: Combine multiple datasets - Concat, Merge, and Join explained.
order: 9
---

## Bringing Data Together

Rarely does all your data exist in one file. You have "Users" in one CSV and "Transactions" in another. You need to join them.

### 1. Concatenation (Stacking)

You have January Sales and February Sales. They have the same columns. You want one big "Sales" table.

```python
# Stack vertically (Axis 0)
combined = pd.concat([jan_df, feb_df], axis=0)
```

### 2. Merging (SQL Join)

This is a database-style join. You link two tables based on a common key (ID).

```python
users = pd.DataFrame({'id': [1, 2], 'name': ['Alice', 'Bob']})
orders = pd.DataFrame({'order_id': [100, 101], 'user_id': [1, 1]})

# Inner Join (Only matching records)
merged = pd.merge(users, orders, left_on='id', right_on='user_id', how='inner')
```

### The `how` Parameter

*   `inner`: Intersection. Keep only matches. (Sharp, clean).
*   `left`: Keep everything from the Left table, add matches from Right. (Standard for enhancing tables).
*   `outer`: Keep everything. Fill gaps with `NaN`.

Mastering `merge` allows you to build complex relational data models in Python.
