---
id: pd-h-1
topic: Pandas
difficulty: Hard
title: Grouping and Aggregation
type: Code
companyTags: [Goldman Sachs, JPMC]
acceptanceRate: 45
---

# Scenario

You have a DataFrame `df` with columns "Region", "Product", and "Sales". You want to find the total sales for each Product within each Region.

Example data:
```
   Region  Product  Sales
0  North   Laptop   1200
1  South   Laptop   1500
2  North   Mouse     50
3  South   Mouse     45
4  North   Laptop   1100
```

Write the code to calculate total sales grouped by Region and Product.

## Correct Answer

```python
df.groupby(["Region", "Product"])["Sales"].sum()
```

## Explanation

This solution uses multi-level grouping to aggregate sales data. The `groupby()` function groups by both "Region" and "Product", then applies the `sum()` aggregation to the "Sales" column.

### Step-by-Step Breakdown:

1. **`df.groupby(["Region", "Product"])`** - Creates groups for each unique combination of Region and Product
2. **`["Sales"]`** - Selects only the Sales column for aggregation
3. **`.sum()`** - Calculates the sum for each group

### Result:

```
Region  Product
North   Laptop     2300
        Mouse        50
South   Laptop     1500
        Mouse        45
Name: Sales, dtype: int64
```

### Alternative Approaches:

```python
# Multiple aggregations
df.groupby(["Region", "Product"])["Sales"].agg(['sum', 'mean', 'count'])

# Reset index for flat DataFrame
df.groupby(["Region", "Product"])["Sales"].sum().reset_index()

# Using pivot_table
df.pivot_table(values='Sales', index='Region', columns='Product', aggfunc='sum')

# Named aggregation (Pandas 0.25+)
df.groupby(["Region", "Product"]).agg(
    total_sales=('Sales', 'sum'),
    avg_sales=('Sales', 'mean')
)
```

### Common Pitfalls:

- Forgetting to select the column before aggregation
- Using single brackets instead of double brackets for multiple columns
- Not resetting index when a flat DataFrame is needed
