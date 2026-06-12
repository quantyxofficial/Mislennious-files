---
id: grouping
title: Grouping Power
description: Split-Apply-Combine - The art of aggregation with GroupBy.
order: 8
---

## The Pivot Table Engine

If you have used Pivot Tables in Excel, you know how powerful grouping is. "Show me total sales **Per Region**."
In Pandas, we use `groupby()`.

### The Concept: Split-Apply-Combine

1.  **Split**: Break the data into groups (e.g., split by 'City').
2.  **Apply**: Run a calculation (e.g., sum, mean) on each group.
3.  **Combine**: Merge the results back into a table.

```python
import pandas as pd

df = pd.DataFrame({
    'City': ['NY', 'NY', 'Paris', 'Paris'],
    'Sales': [100, 200, 300, 400]
})

# Sum of Sales per City
report = df.groupby('City')['Sales'].sum()
print(report)
# City
# NY       300
# Paris    700
```

### Multiple Aggregations (`agg`)

What if you want the Total *and* the Average?

```python
stats = df.groupby('City')['Sales'].agg(['sum', 'mean', 'max'])
```

### Grouping by Multiple Columns

"Show me sales per City AND per Product."

```python
df.groupby(['City', 'Product'])['Sales'].sum()
```

Grouping is the bread and butter of Business Intelligence.
