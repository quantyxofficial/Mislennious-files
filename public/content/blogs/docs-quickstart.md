---
title: "Installation & Quick Start"
description: "Install KaizenStat (v0.6.0) and train your first explained, production-ready model in under five minutes — from a single CSV to a saved .joblib pipeline."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "6 min read"
image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
featured: false
---

# Installation & Quick Start

**KaizenStat** is a structured Python framework for **Data Health Measurement** and **ML Model Debugging**. Instead of a black-box `model.fit()`, it enforces one clean, opinionated pipeline where every decision is **scored, explained, and reproducible**:

> **Health → Validate → Fix → Train → Debug → Improve**

The latest stable release is on PyPI: **[kaizenstat](https://pypi.org/project/kaizenstat/)** (v0.6.0 · Python 3.8+ · MIT License).

---

## What You Get

| Capability | What it does |
| :--- | :--- |
| **Data Health Score** | A 0–100 grade for your dataset, with a breakdown of every penalty (missing values, outliers, imbalance, leakage). |
| **AutoML Engine** | Benchmarks multiple models, picks the best, and can build a stacked ensemble — no model-selection knowledge required. |
| **Model Debugger** | Explains *why* a model underperforms: overfitting, hard subgroups, label noise, feature importance. |
| **NLP / Text Mode** | Auto-detected. The same API works on free-text datasets with zero code changes. |
| **Trust Layer** | A production-readiness verdict: calibration, robustness, confidence, and failure slices. |
| **One-Line API** | `quick_train()` and `run()` take you from a raw file to a saved, deployable model in a single call. |

---

## 📦 Installation

Install the core package. It ships with everything needed for the full pipeline — `pandas`, `scikit-learn`, `scipy`, `rich`, `joblib`, and `typer`:

```bash
pip install kaizenstat
```

### Optional Extras

Add accelerators and integrations only when you need them:

```bash
pip install kaizenstat[fast]   # Polars (Rust) — 10–100× faster file loading
pip install kaizenstat[gpu]    # XGBoost + LightGBM gradient boosting
pip install kaizenstat[nlp]    # sentence-transformers for text embeddings
pip install kaizenstat[ai]     # Anthropic Claude advisor (plain-English diagnosis)
pip install kaizenstat[all]    # Everything above
```

> **Note:** `load()` installs Polars automatically on first use, so `[fast]` is optional. The AI advisor requires an `ANTHROPIC_API_KEY` environment variable.

Verify the install from your terminal:

```bash
kz --help
```

---

## 🚀 The Fastest Path — One Line

If you are new to ML and just want the best model, you do not need to learn the pipeline. Point KaizenStat at a file and a target column:

```python
from kaizenstat import DataDoctor

# From file → trained, explained, exported model
model = DataDoctor.quick_train("titanic.csv", target="Survived")

# Predict on raw, un-preprocessed data — the pipeline handles everything
predictions = model.predict(new_dataframe)
```

`quick_train()` runs the **entire** pipeline (health check → safe fixes → benchmark → debug → explain → HTML report → export) and returns a ready-to-use pipeline. A `Survived_model.joblib` and `Survived_report.html` are written to disk automatically.

---

## ⚡ The AutoPilot — `run()`

`run()` is the instance-based equivalent. Construct a `DataDoctor` with your data and call one method:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("titanic.csv", target="Survived")
doctor.run()                 # health → fix → train → debug → improve → explain → report → export
doctor.run(tune=True)        # add hyperparameter search on the winning model
```

Every intermediate result stays accessible afterward — `doctor.train_result`, `doctor.health()`, `doctor.report()`, and so on.

---

## 🔬 The Full Pipeline — Step by Step

When you want control over each stage, call them explicitly. This is the same flow `run()` automates, exposed one method at a time. The API mirrors scikit-learn — `fit()` first, then everything else:

```python
from kaizenstat import DataDoctor
import pandas as pd

df = pd.read_csv("titanic.csv")

doctor = DataDoctor()
doctor.fit(df, target="Survived")   # register data; auto-detects task + tabular/text mode

doctor.health()        # ① Data Health Score (0–100) with a full penalty breakdown
doctor.validate()      # ② Statistical assumption + data-leakage checks
doctor.fix(safe=True)  # ③ Apply only low-risk corrections (impute, encode, dedupe)
doctor.train(cv=5)     # ④ Benchmark models and train the best one
doctor.debug_model()   # ⑤ Diagnose why the model succeeds or fails
doctor.improve()       # ⑥ Prioritised, quantified improvement suggestions
doctor.report()        # ⑦ Terminal summary + standalone HTML report
```

### Loading Any File or URL

Skip the pandas boilerplate. `load()` reads CSV, TSV, Excel, Parquet, JSON, JSONL, and Feather — local **or** over HTTP — using **Polars (Rust)** where possible, then prints shape, dtypes, missing values, and a 5-row preview:

```python
doctor = DataDoctor()
doctor.load("https://example.com/data.parquet")
doctor.fit(target="price")
```

---

## 💬 Plain-English Explanations

After training, ask KaizenStat to explain the model in human terms — accuracy, top features, overfitting risk, and how to deploy it. Built for stakeholders, not just engineers:

```python
doctor.train()
doctor.explain()
```

---

## 🖥️ Command Line — Zero Code

Every stage is also a `kz` command. Run the whole pipeline against a CSV without writing any Python:

```bash
# Full pipeline → writes an HTML report
kz auto titanic.csv Survived

# Or run individual stages
kz health titanic.csv --target Survived
kz train  titanic.csv Survived --tune --export model.joblib
```

See the **[CLI & API Feature Matrix](/docs)** for every command and its Python equivalent.

---

## Next Steps

- **[CLI & API Feature Matrix](/docs)** — the complete command vocabulary, CLI ↔ Python.
- **[Python SDK Reference](/docs)** — every `DataDoctor` method, the module-level API, result types, and the engines behind the scenes.
