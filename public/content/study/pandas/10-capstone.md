---
id: capstone
title: Capstone: Real Estate
description: Analyze housing prices, clean dirty data, and find the best deals.
order: 10
---

## Scenario: The Property Tycoon

You are a data analyst for a Real Estate firm. You have a dataset of 1,000 houses with `Price`, `SqFt`, `Neighborhood`, and `Condition`.

Your goal: Find underpriced mansions.

### Step 1: Load and Inspect

```python
import pandas as pd
df = pd.read_csv('houses.csv')
print(df.info())
print(df.describe())
```

### Step 2: Cleaning

"We found some houses with 0 SqFt. That's impossible."

```python
# Filter out bad data
df = df[df['SqFt'] > 100]

# Fill missing Neighborhoods with 'Unknown'
df['Neighborhood'] = df['Neighborhood'].fillna('Unknown')
```

### Step 3: Feature Engineering (Price Per SqFt)

The most important metric in Real Estate.

```python
df['PPSF'] = df['Price'] / df['SqFt']
```

### Step 4: Grouping Analysis

Which neighborhood is the most expensive?

```python
# Sort by PPSF
expensive_hoods = df.groupby('Neighborhood')['PPSF'].mean().sort_values(ascending=False)
print(expensive_hoods.head(5))
```

### Step 5: Finding the Deal (Filtering)

"Find me a house in 'Downtown' with > 2000 SqFt that is cheaper than the average."

```python
avg_price = df[df['Neighborhood'] == 'Downtown']['Price'].mean()

deals = df.query(
    "Neighborhood == 'Downtown' and SqFt > 2000 and Price < @avg_price"
)

print(deals[['Address', 'Price']])
```

### Conclusion

You took raw, messy records and turned them into actionable investment advice. That is the power of Pandas.
