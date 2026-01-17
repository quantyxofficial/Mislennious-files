---
id: loading-data
title: Loading Data
description: Read anything - CSVs, Excel files, JSON, and databases.
order: 2
---

## The Gateway to Data

Before you can analyze data, you must load it. Pandas supports reading almost any format.

### 1. Reading CSV (Comma Separated Values)

The most common format in data science.

```python
import pandas as pd

# Load
df = pd.read_csv('sales_data.csv')

# If your file has no headers:
df = pd.read_csv('data.csv', header=None)
```

### 2. Reading Excel

Yes, you can read straight from `.xlsx` files without opening Excel.

```python
# specific sheet
df = pd.read_excel('report.xlsx', sheet_name='Q1_Revenue')
```

### 3. Reading JSON

Common for web data and APIs.

```python
df = pd.read_json('users.json')
```

### 4. The `index_col` Parameter

By default, Pandas adds a new generic index (0, 1, 2...). If your data already has a unique ID, use it.

```python
# Use the 'Date' column as the index
df = pd.read_csv('stock_prices.csv', index_col='Date')
```

### Saving Data (Exporting)

Just swap `read` for `to`.

```python
df.to_csv('cleaned_data.csv', index=False)
df.to_excel('report_final.xlsx')
```

**Pro Tip**: `index=False` is crucial when saving CSVs, otherwise you'll save the row numbers (0,1,2) as a literal column, which is annoying.
