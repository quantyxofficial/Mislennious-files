---
id: feature-engineering
title: Feature Engineering
description: Create new columns and transform data using map and apply.
order: 7
---

## Improving Your Data

Feature engineering is the art of creating new information from existing data.
*   "Birth Date" -> "Age"
*   "Price" and "Quantity" -> "Total Revenue"

### 1. Basic Column Math

Super fast vectorized operations.

```python
df['Revenue'] = df['Price'] * df['Quantity']
df['Is_Senior'] = df['Age'] > 65
```

### 2. The `map` Method (Substitution)

Great for mapping categorical values to something else.

```python
gender_map = {'M': 'Male', 'F': 'Female'}
df['Gender_Full'] = df['Gender'].map(gender_map)
```

### 3. The `apply` Method (Custom Functions)

The Swiss Army Knife. Run *any* Python function on every row.
**Warning**: This is slower than vectorized math, but infinitely flexible.

```python
def classify_age(age):
    if age < 18:
        return 'Child'
    elif age < 65:
        return 'Adult'
    else:
        return 'Senior'

# Apply the function to the 'Age' column
df['Age_Group'] = df['Age'].apply(classify_age)
```

### 4. String Operations (`.str`)

Pandas has a special accessor for string columns.

```python
# Uppercase everyone
df['Name'] = df['Name'].str.upper()

# Check if email contains 'gmail'
df['is_gmail'] = df['Email'].str.contains('gmail')
```
