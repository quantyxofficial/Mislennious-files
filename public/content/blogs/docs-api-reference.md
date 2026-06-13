---
title: "Python SDK Reference"
description: "Complete Python SDK reference for the KaizenStat ML framework (v0.6.0): the DataDoctor class, every pipeline method, module-level functions, result types, the Trust Layer, the AI advisor, and the engines behind the scenes."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "12 min read"
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80"
featured: false
---

# Python SDK Reference

KaizenStat exposes one primary class — **`DataDoctor`** — that orchestrates the entire pipeline with a scikit-learn-style API. Below it sit eight composable modules you can call directly. This reference covers every public surface.

```python
from kaizenstat import DataDoctor

# Module-level API — call any stage standalone
from kaizenstat import health, validate, fix, model, debug, improve, reliability, intelligence
```

---

## The DataDoctor Class

`DataDoctor` is the single entry point. Construct it empty, with a DataFrame, or with a file path / URL.

```python
DataDoctor(data=None, target=None)
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `data` | `str` \| `DataFrame` \| `None` | A file path, URL, or pandas DataFrame. If given, `load()`/`fit()` are called automatically. |
| `target` | `str` \| `None` | The target column name. Required for supervised tasks. |

```python
# Three equivalent ways to construct
doctor = DataDoctor()                                  # empty — call load()/fit() later
doctor = DataDoctor(df, target="Survived")             # from a DataFrame
doctor = DataDoctor("titanic.csv", target="Survived")  # from a file path or URL
```

On `fit()`, KaizenStat **auto-detects** the task (classification vs regression) and the **mode** (`tabular` vs `text`). It also auto-drops columns that look like IDs or free-text noise (override with `keep_suspicious=True`).

---

## Pipeline Methods

These follow the canonical order **Health → Validate → Fix → Train → Debug → Improve → Report**. Each returns a structured result and prints a rich terminal summary.

### `load(path, **kwargs)`

Load any file or URL with zero pandas boilerplate. Supports `.csv`, `.tsv`, `.xlsx`, `.xls`, `.parquet`, `.json`, `.jsonl`, `.feather` — local or over HTTP. Uses **Polars (Rust)** where possible and prints shape, dtypes, missing-value counts, and a 5-row preview.

```python
doctor.load("https://example.com/data.parquet")
```

### `fit(df=None, target=None, keep_suspicious=False)`

Register a dataset. Omit `df` if you already called `load()`. Auto-detects task type and tabular/text mode.

```python
doctor.fit(df, target="Survived")
doctor.fit(df, target="Survived", keep_suspicious=True)  # keep ID/text columns
```

### `health() → HealthResult`

Compute and display the **Data Health Score (0–100)** with a per-penalty breakdown (missing values, outliers, imbalance, duplicates, constants).

```python
result = doctor.health()
print(result.score, result.grade)   # e.g. 87.0  "B+"
```

### `validate() → ValidationReport`

Run statistical assumption and **data-leakage** checks: skewness, multicollinearity, distribution shifts, and target leakage. Includes any custom checks registered with `add_check()`.

### `fix(safe=True, preview_only=False) → DataFrame`

Apply data corrections — imputation, encoding, deduplication, imbalance handling. With `safe=True` only **low-risk** fixes are applied. With `preview_only=True` the plan is shown but nothing changes.

```python
clean_df = doctor.fix(safe=True)
doctor.fix(preview_only=True)   # inspect the plan first
```

### `train(cv=5, test_size=0.2, tune=False, n_iter=20) → TrainResult`

Benchmark the model pool, select the winner, and train it. Set `tune=True` to run `RandomizedSearchCV` on the best model.

```python
result = doctor.train(cv=5, tune=True, n_iter=40)
print(result.model_name, result.test_score)
```

### `debug_model(test_size=0.2) → DebugResult`

Diagnose **why** the model performs as it does — overfitting gap, hard-to-classify subgroups, label noise, and feature importance. Runs `train()` first if needed.

### `improve() → ImprovementReport`

Combine the health, validation, and debug signals into a **prioritised, quantified** action list — each suggestion annotated with its expected impact.

### `report(output_path="kaizenstat_report.html", open_browser=False) → str`

Print a terminal summary and export a standalone **HTML report**. Returns the file path.

```python
path = doctor.report("titanic_report.html", open_browser=True)
```

---

## Zero-Friction API

For new ML users — go from a raw file to a deployable model without learning the pipeline.

### `DataDoctor.quick_train(data=None, target=None, tune=False, report=True, export_path=None)`

One line: file → trained, explained, exported model. Returns a pipeline you can call `.predict()` on directly.

```python
model = DataDoctor.quick_train("titanic.csv", target="Survived", tune=True)
predictions = model.predict(new_dataframe)   # works on raw, un-preprocessed data
```

### `run(tune=False, report=True, export_path=None, cv=5) → DataDoctor`

The **AutoPilot**. Runs the whole pipeline — health → fix → train → debug → improve → explain → report → export — in one call.

```python
doctor = DataDoctor("titanic.csv", target="Survived")
doctor.run(tune=True)
```

### `explain() → str`

Print a **plain-English** explanation of the trained model: accuracy, top features, overfitting risk, the algorithm chosen, data quality, and how to deploy it. Built for non-technical stakeholders.

```python
doctor.train()
doctor.explain()
```

---

## Advanced Methods

| Method | Returns | Purpose |
| :--- | :--- | :--- |
| `train_auto(cv=3, tune=False, ensemble=True)` | `TrainResult` | Full AutoML: profile → smart model selection → tuning → soft-voting ensemble. |
| `auto_improve(tune=True)` | `ComparisonResult` | Train → apply safe fixes → retrain → show before-vs-after `score_delta`. |
| `auto_improve_text(tune=True)` | `ComparisonResult` | Text self-healing loop (clean noise, prune rare tokens, char n-grams) — text mode only. |
| `trust_score(test_size=0.2)` | `TrustReport` | Production-readiness verdict (see **Trust Layer** below). |
| `feature_impact(top_n=15)` | `dict` | Counterfactual importance — score drop when each feature is removed. |
| `dataset_difficulty()` | `float` | Estimate dataset difficulty (0 = trivial, 1 = near-impossible). |
| `detect_drift(X_train, X_test)` | `dict` | Distribution drift via the KS test; returns drifted columns with p-values. |
| `recommend_actions()` | `list` | Prioritised what-to-do-next list from the data profile + debug result. |
| `pipeline_confidence()` | `int` | 0–100 confidence from health, validation, stability, and test performance. |
| `codegen(output_path="pipeline.py")` | `str` | Generate a standalone Python script reproducing the pipeline. |
| `export_model(path="model.joblib")` | `str` | Serialise the full trained pipeline to `.joblib`. |
| `mode()` | `str` | The detected mode: `"tabular"` or `"text"`. |

---

## Plugin API

Extend the benchmark and validation stages with your own models and checks.

### `add_model(name, model) → DataDoctor`

Register a custom estimator to compete in the next benchmark.

```python
from sklearn.svm import SVC
doctor.add_model("SVM", SVC(probability=True))
```

### `add_check(check_fn, name="") → DataDoctor`

Register a custom validation check. The function receives `(df, target)` and returns a list of issue strings.

```python
def min_classes(df, target):
    return ["Target has fewer than 2 classes"] if df[target].nunique() < 2 else []

doctor.add_check(min_classes, name="target_classes")
```

---

## Module-Level API

Every stage is also a standalone function — no `DataDoctor` needed.

```python
from kaizenstat import health, validate, fix, model, debug, reliability

health.score(df)                          # → float (0–100)
health.report(df, target="y")             # → HealthResult

validate.assumptions(df, target="y")
validate.leakage(df, target="y")
validate.multicollinearity(df)

df_clean = fix.apply(df, target="y")      # one-step safe repair

result = model.train_best(df, target="y") # → TrainResult
model.benchmark(df, target="y")           # → BenchmarkResult

debug.model_failure(pipe, X_tr, X_te, y_tr, y_te)
debug.bias_detection(pipe, X_te, y_te, sensitive_features=["gender"])

reliability.analyze(pipe, X_test, y_test) # → TrustReport
```

---

## Result Types

Structured dataclasses returned by the pipeline. Key fields:

### `HealthResult`

| Field | Type | Description |
| :--- | :--- | :--- |
| `score` | `float` | Data Health Score, 0–100. |
| `grade` | `str` | Letter grade derived from the score. |
| `penalties` | `list` | Each penalty with its reason and point cost. |
| `risk_level` | `str` | Overall risk classification. |

### `TrainResult`

| Field | Type | Description |
| :--- | :--- | :--- |
| `model_name` | `str` | Winning model (e.g. `"RandomForest"`). |
| `task` | `str` | `"classification"` or `"regression"`. |
| `train_score` / `test_score` | `float` | Train and held-out test scores. |
| `metrics` | `dict` | Full metric set (accuracy, f1, r2, mae, …). |
| `pipeline` | `Pipeline` | The fitted, deployable pipeline (preprocessing included). |
| `cv_score` / `cv_std` | `float` | Cross-validation mean and standard deviation. |
| `best_params` | `dict` | Chosen hyperparameters (when tuned). |

### `TrustReport`

| Field | Type | Description |
| :--- | :--- | :--- |
| `trust_score` | `int` | Production-readiness score, 0–100. |
| `grade` | `str` | Verdict label (production-ready / needs work / not ready). |
| `robustness_score` | `float` | Agreement under small input perturbations (0–1). |
| `calibration_gap` | `float` | `\|confidence − accuracy\|` — lower is better. |

---

## Trust & Reliability Layer

Before you ship a model, get a quantified production-readiness verdict — confidence distribution, prediction uncertainty, robustness under perturbation, calibration gap, and failure-case slices. Works in both tabular and text mode.

```python
doctor.train()
report = doctor.trust_score()
print(report.trust_score, report.grade)   # e.g. 84  "production-ready"
```

---

## AI Advisor (Optional)

With `pip install kaizenstat[ai]` and an `ANTHROPIC_API_KEY`, KaizenStat can produce plain-English, **Claude-powered** diagnoses of your pipeline.

```python
from kaizenstat import intelligence

intelligence.init(api_key="sk-ant-...")               # or set ANTHROPIC_API_KEY
intelligence.advise(health_result=hr, debug_result=dr)
intelligence.ask("Why is my model overfitting?")
```

The advisor defaults to the **`claude-sonnet-4-6`** model; the rest of the library is fully rule-based and runs offline with no API key required.

---

## 🧠 Behind the Scenes: Core Engines

### Hardware-Aware Execution

When the optional `[gpu]` accelerators (XGBoost, LightGBM) are installed, KaizenStat uses them automatically and adapts to your hardware — CUDA on NVIDIA GPUs, MPS on Apple Silicon (M-series Macs).

### Smart Model Selection

The benchmarking engine reshapes its search space based on the data profile:

- **Large datasets** — drops slow estimators on CPU-only hosts to avoid lockups.
- **High-cardinality categoricals** — optimises preprocessing and favours tree-based models.
- **Continuous targets** — auto-switches the entire pipeline into regression mode.

### Premium Ensemble Engine

The AutoML stage can build a **StackingClassifier** ensemble (which outperforms simple voting), runs 2-stage progressive hyperparameter tuning, includes ExtraTrees in the pool, and applies Platt-scaling **model calibration** for trustworthy probabilities.

### Automatic Imbalance Correction

During `fix()`, KaizenStat measures the target class distribution. When skew exceeds **65% / 35%**, it sets `class_weight="balanced"` on the estimators to counteract the imbalance.

---

## See Also

- **[Installation & Quick Start](/docs)** — install, the one-line API, and your first model.
- **[CLI & API Feature Matrix](/docs)** — every `kz` command and its SDK equivalent.
