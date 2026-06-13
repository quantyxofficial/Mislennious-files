---
id: preprocessing
title: Preprocessing & Feature Engineering
description: Scaling, encoding, missing values, splitting — and letting KaizenStat fix() do the heavy lifting.
order: 4
---

## Why Raw Data Won't Train

Models are mathematical functions. They can't multiply the word `"female"`, they choke on missing cells, and they get confused when one feature ranges 0–1 and another ranges 0–500,000. Preprocessing is the bridge between messy real data and clean numeric input — and getting it right (without leaking) is a craft. Let's learn the manual version first, then the KaizenStat version that does it safely.

## The Train/Test Split — Sacred Rule #1

**Never evaluate a model on data it trained on.** A model that has *seen* the answers can just memorize them and score 100% — telling you nothing about how it handles new data. So you hold out a test set and don't touch it until the very end:

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns=["target"])
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # keep 20% locked away for honest evaluation
    random_state=42,     # reproducible split
    stratify=y,          # preserve class balance in both halves
)
```

> **The golden rule:** every transformation you learn — the mean for imputation, the scale for standardization, the categories for encoding — must be computed on the **training set only**, then *applied* to the test set. Learning from the test set is a subtle form of leakage that inflates your score.

## Missing Values (Imputation)

You can't feed a null to most models. The fix is *imputation* — filling gaps with a sensible estimate:

```python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy="median")   # robust to outliers
X_train_filled = imputer.fit_transform(X_train)   # fit = learn the medians
X_test_filled  = imputer.transform(X_test)        # transform = apply them
```

Notice `fit_transform` on train, `transform` on test. The test set borrows the *training* medians — never its own.

## Encoding Categoricals

Models need numbers, so text categories must be converted:

- **One-Hot Encoding** — creates a binary column per category (`is_red`, `is_blue`, `is_green`). Use when categories have no inherent order. Safe default for most models.
- **Label Encoding** — maps categories to integers (`red→0, blue→1, green→2`). Compact, but implies an ordering the model may wrongly trust (it thinks `2 > 0`). Fine for tree models, risky for linear ones.

```python
import pandas as pd
X_encoded = pd.get_dummies(X, columns=["color", "city"])   # one-hot
```

## Feature Scaling

Standardization rescales every numeric feature to mean 0, variance 1, so no single feature dominates by sheer magnitude:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_filled)
X_test_scaled  = scaler.transform(X_test_filled)
```

**When it matters:** distance- and gradient-based models — Linear/Logistic Regression, SVM, K-Means, neural nets — care a lot. **When it doesn't:** tree-based models (Decision Trees, Random Forests, gradient boosting) are scale-invariant, so scaling is harmless but unnecessary.

## Feature Engineering: The Real Edge

Preprocessing makes data *usable*; feature engineering makes it *powerful*. It's the art of creating new columns that expose the signal more clearly:

- From a `timestamp` → extract `hour_of_day`, `day_of_week`, `is_weekend`.
- From `height` and `weight` → compute `BMI`.
- From `signup_date` and `today` → compute `tenure_days`.

A great engineered feature often beats a fancier algorithm. This is where domain knowledge becomes your superpower — you know which combinations *mean* something.

## The KaizenStat Way: fix()

Doing all of the above by hand, correctly, every time, is exactly where bugs and leakage creep in. KaizenStat's `fix()` plans and applies safe corrections — and **never silently mutates your original DataFrame**:

```python
# Preview the plan — see exactly what would change, touch nothing
doctor.fix(safe=True, preview_only=True)
```

```
FixPlan — 4 actions
─────────────────────────────────────────────
[LOW]  Impute 'age'        →  median fill (12 nulls)
[LOW]  Encode 'city'       →  one-hot (5 categories)
[LOW]  Coerce 'income'     →  text → numeric
[LOW]  Drop 'customer_id'  →  high-cardinality ID, no signal
```

When you're happy, apply it. You get back a **new** cleaned DataFrame:

```python
fixed_df = doctor.fix(safe=True)        # LOW-risk fixes only (default)
fixed_df = doctor.fix(safe=False)       # also apply MEDIUM-risk fixes
```

### Targeted fixes

When you want surgical control, call individual fixers:

```python
from kaizenstat import fix

fix.missing(df, target="y")            # imputation only
fix.outlier_handling(df, target="y")   # clip extreme values
fix.encoding(df, target="y")           # encode categoricals only
fix.imbalance(df, target="y")          # diagnose + advise on class imbalance
```

## Preprocessing Travels With the Model

Here's the payoff and the reason professionals build **pipelines**: when you train through `DataDoctor`, every transformation is baked into the returned model. At prediction time you pass raw data and the pipeline replays the exact same imputation, encoding, and scaling it learned during training:

```python
model = doctor.quick_train()
model.predict(raw_new_rows)   # scaling/encoding applied automatically, no leakage
```

No "I forgot to scale the production data" bugs. No train/serve skew. The pipeline *is* the preprocessing plus the model, as one inseparable unit.

With clean, well-prepared data in hand, we're finally ready to meet the algorithms themselves — starting with the "Hello World" of ML: linear regression.
