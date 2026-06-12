---
id: pd-b-1
topic: Pandas
difficulty: Basic
title: Loading Data
type: MCQ
companyTags: [Netflix, Uber]
acceptanceRate: 95
---

# Scenario

You have a CSV file named "sales_data.csv" containing customer transaction records. How do you load this into a Pandas DataFrame for analysis?

## Options

- `pd.read_csv("sales_data.csv")`
- `pd.load("sales_data.csv")`
- `pd.import_csv("sales_data.csv")`
- `pd.open("sales_data.csv")`

## Correct Answer

```python
pd.read_csv("sales_data.csv")
```

## Explanation

`read_csv()` is the primary function for reading CSV files into DataFrames. It's one of the most commonly used Pandas functions for data import.

### Common Parameters:

```python
# Basic usage
df = pd.read_csv("sales_data.csv")

# With custom delimiter
df = pd.read_csv("data.txt", delimiter="\t")

# Skip rows
df = pd.read_csv("data.csv", skiprows=2)

# Specify columns
df = pd.read_csv("data.csv", usecols=['Name', 'Age', 'Salary'])

# Handle missing values
df = pd.read_csv("data.csv", na_values=['NA', 'N/A', ''])
```

### Other File Formats:

- `pd.read_excel()` - Excel files
- `pd.read_json()` - JSON files
- `pd.read_sql()` - SQL databases
- `pd.read_parquet()` - Parquet files
