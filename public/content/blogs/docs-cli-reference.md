---
title: "CLI & API Feature Matrix"
description: "The complete KaizenStat command-line reference (v0.6.0). Every kz command, its arguments and options, and the matching Python SDK call — full CLI ↔ SDK parity."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "7 min read"
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80"
featured: false
---

# CLI & API Feature Matrix

KaizenStat is built around a **single unified vocabulary**. Anything you can do from the `kz` command line has a direct equivalent in the Python SDK — and vice versa. Learn one, and you know the other.

The CLI is installed automatically with the package via the `kz` entry point:

```bash
pip install kaizenstat
kz --help          # list all commands
kz <command> --help  # detailed help for any command
```

---

## ⚔️ Command Vocabulary

| `kz` Command | Python SDK | Purpose |
| :--- | :--- | :--- |
| `kz health` | `doctor.health()` | 📊 Compute the Data Health Score (0–100) with a full penalty breakdown. |
| `kz validate` | `doctor.validate()` | 🔍 Run statistical assumption and data-leakage checks. |
| `kz fix` | `doctor.fix()` | 🩹 Preview or apply safe data corrections (impute, encode, dedupe). |
| `kz train` | `doctor.train()` | 🚀 Benchmark models, train the best, optionally tune and export. |
| `kz debug` | `doctor.debug_model()` | 🔬 Diagnose why a model fails — overfitting, hard slices, noise. |
| `kz improve` | `doctor.improve()` | 💡 Generate prioritised, quantified improvement suggestions. |
| `kz report` | `doctor.report()` | 📄 Build a full standalone HTML pipeline report. |
| `kz auto` | `doctor.run()` | ⚡ Run the entire pipeline in one command (Health → … → Report). |
| `kz codegen` | `doctor.codegen()` | 📝 Emit a standalone Python training script for your dataset. |
| `kz export` | `doctor.export_model()` | 💾 Train the best model and save it to a `.joblib` file. |

---

## 📖 Command Reference

### `kz auto` — Run Everything

The one-shot command. Loads the CSV and runs the full pipeline: health → validate → fix → train → debug → improve → report.

```bash
kz auto <file> <target> [--output report.html]
```

| Argument / Option | Description |
| :--- | :--- |
| `file` | Path to the CSV dataset (required). |
| `target` | Name of the target column (required). |
| `-o`, `--output` | HTML report path. Default: `kaizenstat_report.html`. |

```bash
kz auto titanic.csv Survived -o titanic_report.html
```

### `kz health` — Data Health Score

Scores dataset quality from 0–100 and itemises every penalty (missing values, outliers, class imbalance, duplicate rows, constant columns).

```bash
kz health <file> [--target <col>]
```

| Argument / Option | Description |
| :--- | :--- |
| `file` | Path to the CSV dataset (required). |
| `-t`, `--target` | Target column name (optional — enables imbalance/leakage checks). |

### `kz validate` — Assumption & Leakage Checks

Runs statistical validation: skewness, multicollinearity, distribution checks, and target-leakage detection.

```bash
kz validate <file> [--target <col>]
```

### `kz fix` — Safe Data Repair

Previews or applies low-risk corrections. By default it writes a cleaned CSV next to the original; use `--preview` to inspect the plan without changing anything.

```bash
kz fix <file> [--target <col>] [--preview] [--output cleaned.csv]
```

| Argument / Option | Description |
| :--- | :--- |
| `-p`, `--preview` | Show the fix plan but do **not** apply it. |
| `-o`, `--output` | Where to save the fixed CSV. Default: `<file>_fixed.csv`. |

```bash
kz fix titanic.csv --target Survived -o titanic_clean.csv
```

### `kz train` — Benchmark & Train

Benchmarks the model pool, trains the winner, and reports cross-validated scores. Add `--tune` to run a randomized hyperparameter search on the best model.

```bash
kz train <file> <target> [--cv 5] [--tune] [--n-iter 20] [--export model.joblib]
```

| Argument / Option | Description |
| :--- | :--- |
| `target` | Target column name (required). |
| `--cv` | Cross-validation folds. Default: `5`. |
| `--tune` | Auto-tune hyperparameters with `RandomizedSearchCV`. |
| `--n-iter` | Hyperparameter combinations to try when tuning. Default: `20`. |
| `-e`, `--export` | Save the trained pipeline to this `.joblib` path. |

```bash
kz train titanic.csv Survived --tune --n-iter 40 -e titanic_model.joblib
```

### `kz debug` — Model Failure Analysis

Trains the model, then runs the debugger to surface overfitting gaps, hard-to-classify subgroups, label noise, and feature importance.

```bash
kz debug <file> <target>
```

### `kz improve` — Improvement Suggestions

Combines the health, validation, and debug signals into a prioritised, plain-English action list — each item with its expected impact.

```bash
kz improve <file> [--target <col>]
```

### `kz report` — HTML Report

Generates a full standalone HTML report (health, validation, suggestions) you can share or archive.

```bash
kz report <file> [--target <col>] [--output report.html] [--open]
```

| Argument / Option | Description |
| :--- | :--- |
| `-o`, `--output` | HTML output path. Default: `kaizenstat_report.html`. |
| `--open` | Open the report in your default browser when done. |

### `kz codegen` — Generate a Training Script

Emits a clean, dependency-light Python script that reproduces the full preprocessing-and-training pipeline for your dataset — perfect for handing off to production.

```bash
kz codegen <file> <target> [--output pipeline.py]
```

### `kz export` — Save the Best Model

Trains the best model and serialises the entire pipeline (preprocessing included) to a `.joblib` file you can `joblib.load()` and call `.predict()` on directly.

```bash
kz export <file> <target> [--output model.joblib] [--cv 5]
```

---

## 🔁 CLI ↔ SDK: Same Result, Either Way

These two snippets are equivalent — the CLI is a thin wrapper over the SDK:

```bash
# Command line
kz auto titanic.csv Survived -o report.html
```

```python
# Python SDK
from kaizenstat import DataDoctor

doctor = DataDoctor("titanic.csv", target="Survived")
doctor.run()   # writes Survived_report.html and Survived_model.joblib
```

> **Tip:** Use the **CLI** for quick, scriptable one-offs and CI pipelines; use the **SDK** when you need intermediate results, custom models (`add_model`), custom checks (`add_check`), or the Trust Layer (`trust_score`). See the **[Python SDK Reference](/docs)** for the full API.
