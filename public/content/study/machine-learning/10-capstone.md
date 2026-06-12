---
id: capstone
title: Capstone: Titanic
description: Predicting survival on the Titanic - A complete project.
order: 10
---

## The "Hello World" of Kaggle

Your Goal: Predict who survived the Titanic disaster.

### 1. Load Data
```python
import pandas as pd
df = pd.read_csv("titanic.csv")
```

### 2. Preprocessing
*   **Drop Useless**: remove `Name`, `Ticket`.
*   **Impute Missing**: Fill `Age` with Median.
*   **Encode**: `Sex` (Male=0, Female=1). `Embarked` (One-Hot).

### 3. Split
```python
X = df.drop('Survived', axis=1)
y = df['Survived']
X_train, X_test, y_train, y_test = train_test_split(X, y)
```

### 4. Model Selection (Random Forest)
```python
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
```

### 5. Evaluate
```python
print(model.score(X_test, y_test))
# Output: 0.82 (82% Accuracy)
```

### 6. Importance
"Women and Children First?" 
Check feature importance. You will likely see `Sex` and `Age` as the top drivers.
