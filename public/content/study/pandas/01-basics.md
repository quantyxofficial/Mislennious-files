---
title: Introduction to Pandas
topic: Pandas
order: 1
---

# Introduction to Pandas

Pandas is a powerful, open-source data analysis and manipulation library for Python. It provides high-performance, easy-to-use data structures and data analysis tools, making it essential for data science and analytics.

## Why Pandas?

### Data Structures
- **Series**: 1-dimensional labeled array
- **DataFrame**: 2-dimensional labeled data structure (like a spreadsheet)

### Capabilities
- Easy handling of missing data
- Intelligent data alignment
- Flexible reshaping and pivoting
- Powerful group by functionality
- Time series functionality

### Integration
- Works seamlessly with NumPy
- Integrates with visualization libraries (Matplotlib, Seaborn)
- Supports various file formats (CSV, Excel, SQL, JSON, etc.)

## Installation

```bash
pip install pandas
```

## Basic Usage

```python
import pandas as pd

# Create a Series
s = pd.Series([1, 2, 3, 4, 5])
print(s)

# Create a DataFrame
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Paris']
})
print(df)
```

## Key Concepts

### 1. Series

A Series is a one-dimensional labeled array:

```python
# Create from list
s = pd.Series([10, 20, 30, 40])

# Create with custom index
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])

# Access elements
print(s['a'])  # 10
print(s[0])    # 10

# Series attributes
print(s.values)  # [10 20 30]
print(s.index)   # Index(['a', 'b', 'c'])
```

### 2. DataFrame

A DataFrame is a 2D labeled data structure:

```python
# Create from dictionary
df = pd.DataFrame({
    'Product': ['Laptop', 'Mouse', 'Keyboard'],
    'Price': [1200, 25, 75],
    'Stock': [50, 200, 100]
})

# Access columns
print(df['Product'])
print(df.Product)  # Alternative syntax

# Access rows
print(df.iloc[0])   # First row by position
print(df.loc[0])    # First row by label

# DataFrame attributes
print(df.shape)     # (3, 3)
print(df.columns)   # Index(['Product', 'Price', 'Stock'])
print(df.dtypes)    # Data types of each column
```

### 3. Reading Data

```python
# Read CSV
df = pd.read_csv('data.csv')

# Read Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Read JSON
df = pd.read_json('data.json')

# Read from SQL
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM table', conn)
```

## Common Operations

### Viewing Data

```python
df = pd.read_csv('sales_data.csv')

# First/last rows
print(df.head())      # First 5 rows
print(df.tail(10))    # Last 10 rows

# Summary statistics
print(df.describe())  # Statistical summary
print(df.info())      # DataFrame info

# Column names and types
print(df.columns)
print(df.dtypes)
```

### Selecting Data

```python
# Select single column
prices = df['Price']

# Select multiple columns
subset = df[['Product', 'Price']]

# Filter rows
expensive = df[df['Price'] > 100]

# Multiple conditions
filtered = df[(df['Price'] > 50) & (df['Stock'] < 100)]
```

### Basic Statistics

```python
# Column statistics
print(df['Price'].mean())
print(df['Price'].median())
print(df['Price'].std())
print(df['Price'].min())
print(df['Price'].max())

# Count values
print(df['Category'].value_counts())

# Correlation
print(df.corr())
```

## Handling Missing Data

```python
# Check for missing values
print(df.isnull())
print(df.isnull().sum())

# Drop missing values
df_clean = df.dropna()

# Fill missing values
df_filled = df.fillna(0)
df_filled = df.fillna(df.mean())

# Forward fill
df_ffill = df.fillna(method='ffill')
```

## Practice Problems

After studying this material, try these problems:
- **Loading Data** (Basic) - Learn how to import data into Pandas
- **Basic Operations** (Basic) - Practice DataFrame operations
- **Filtering Data** (Basic) - Master data selection and filtering

## Next Steps

Continue to:
- **DataFrames Deep Dive** - Advanced DataFrame operations
- **Data Cleaning** - Handle missing data and duplicates
- **Grouping and Aggregation** - Master groupby operations
