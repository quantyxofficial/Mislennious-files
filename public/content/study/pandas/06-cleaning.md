---
id: cleaning
title: Cleaning Up
description: Handle missing values (NaN) and remove duplicates like a pro.
order: 6
---

## Dirty Data

Real-world data is messy. It has holes (`NaN`), duplicates, and typos. Pandas gives you the soap.

### 1. Handling Missing Data (`NaN`)

First, find it.
```python
print(df.isna().sum()) 
# Age: 50 missing
# City: 0 missing
```

**Option A: Drop it** (Nuclear Option)
If a row has missing data, delete the whole row.
```python
clean_df = df.dropna()
```

**Option B: Fill it** (Imputation)
Fill gaps with the average, median, or a specific value.
```python
# Fill missing Age with the average Age
mean_age = df['Age'].mean()
df['Age'] = df['Age'].fillna(mean_age)

# Fill with "Unknown"
df['City'] = df['City'].fillna('Unknown')
```

### 2. Removing Duplicates

```python
# Checking
print(df.duplicated().sum())

# Dropping
df = df.drop_duplicates()

# Specialized Drop
# Drop only if 'Email' is the same (keeps first occurrence)
df = df.drop_duplicates(subset=['Email'], keep='first')
```

### 3. Renaming Columns

Make your headers clean.
```python
df = df.rename(columns={
    'Old Name (Bad)': 'new_name',
    'Age in Years': 'age'
})
```

A clean dataset is a happy dataset.
