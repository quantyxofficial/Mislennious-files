---
id: first-model
title: Your First Model in 3 Lines
description: Install KaizenStat and train a real, production-ready model before you learn the theory.
order: 2
---

## Why Build Before You Learn

You don't learn to swim by reading about water. The fastest way to understand ML is to train a model, see it predict, and *then* ask "how did that work?" — which is exactly what the rest of this course answers. So let's ship a model in the next five minutes.

## Install

```bash
pip install kaizenstat
```

For the best results on real tabular data, add the gradient-boosting extras (XGBoost + LightGBM):

```bash
pip install "kaizenstat[gpu]"
```

That's the whole setup. KaizenStat brings scikit-learn, pandas, and the rest along with it.

## The Three-Line Model

Here is a complete, honest, production-ready model — load, train, predict:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("titanic.csv", target="Survived")   # 1. point at your data
model = doctor.quick_train()                            # 2. train the best model
prediction = model.predict(new_passengers)              # 3. predict on new data
```

That's it. `quick_train()` benchmarked several algorithms with cross-validation, picked the winner, trained it on a clean split, and handed you back a pipeline that takes **raw data** — no manual scaling or encoding required. `.predict()` works on a fresh DataFrame straight from a CSV.

### What just happened under the hood

`quick_train()` is a shortcut for the full pipeline. Behind that single call, KaizenStat:

1. **Loaded** the CSV (it also reads Excel, Parquet, JSON, and URLs).
2. **Profiled** the data — task type, class balance, missing values, dimensionality.
3. **Checked for leakage** — features that secretly contain the answer.
4. **Applied safe fixes** — imputation, encoding, type coercion.
5. **Benchmarked** Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM, and ExtraTrees.
6. **Trained** the winner and returned a ready-to-serve pipeline.

You'll learn every one of those steps in the chapters ahead. For now, just notice that the *boring, error-prone plumbing* is handled, leaving you free to think about the actual problem.

## See the Whole Story with run()

`quick_train()` returns just the model. When you want KaizenStat to *narrate* the whole diagnosis — health, fixes, training, debugging, suggestions — use `run()`:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("titanic.csv", target="Survived")
doctor.run()
```

You'll see a live, sectioned report in your terminal:

```
KaizenStat · run()
KaizenStat AutoPilot — running full pipeline
health → fix → train → debug → improve → explain → report

① Data Health        →  Score: 88/100  (Grade B)
② Auto-Fix           →  filled 2 missing columns, encoded 3 categoricals
③ Training           →  Best model: LightGBM   test accuracy: 0.83
④ Diagnosing         →  No leakage. Mild class imbalance flagged.
⑤ Improvement        →  [HIGH] Try train_auto(ensemble=True) → +8–14% expected
```

After `run()`, every result is available on the `doctor` object for inspection:

```python
doctor.train_result.model_name    # → "LightGBM"
doctor.train_result.test_score    # → 0.83
```

## Predicting on New Data

A trained pipeline is a normal Python object. Feed it new rows — as a DataFrame or a CSV path — and it returns predictions:

```python
import pandas as pd

new_passengers = pd.DataFrame([
    {"Pclass": 1, "Sex": "female", "Age": 28, "Fare": 80.0},
    {"Pclass": 3, "Sex": "male",   "Age": 22, "Fare": 7.25},
])

model.predict(new_passengers)        # → array([1, 0])  (survived, did not)
model.predict_proba(new_passengers)  # → probabilities for each class
```

Notice you passed *raw* values — `"female"`, not a one-hot vector. The pipeline remembers every transformation it learned during training and replays it automatically. This is the single most important habit in production ML: **the preprocessing must travel with the model**, and KaizenStat guarantees that for you.

## Save It, Ship It

```python
doctor.export_model("titanic_model.joblib")   # save the full pipeline
```

Later, in a totally separate program — a web API, a batch job — load and serve it:

```python
import joblib
model = joblib.load("titanic_model.joblib")
model.predict(incoming_request_df)
```

You just built and shipped an ML model. In the next chapter we slow down and ask the question that separates amateurs from professionals: **can you actually trust this model?** The answer starts with the data.
