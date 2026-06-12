---
id: preprocessing
title: Data Preprocessing
description: Garbage in, Garbage out. Scaling, Splitting, and Encoding.
order: 2
---

## Preparing the Data

Models can't read text. They can't handle missing values well. And they hate different scales (Age: 30 vs Salary: 50,000).

### 1. Train / Test Split
Never test on the data you trained on. That's cheating (Overfitting).

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

### 2. Handling Missing Data (Imputation)

```python
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy='mean')
X_train_clean = imputer.fit_transform(X_train)
```

### 3. Encoding Categorical Data
"Red", "Blue", "Green" must become numbers.
*   **One-Hot Encoding**: Creates new columns (Is_Red, Is_Blue).
*   **Label Encoding**: 0, 1, 2. (Careful: Model might think 2 > 0).

### 4. Feature Scaling
Standardizing ensures all features have Mean=0 and Var=1. Critical for Linear models and Neural Networks.

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
```
