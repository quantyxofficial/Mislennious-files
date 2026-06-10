---
title: "Installation & Quick Start"
description: "Get up and running with KaizenStat (v0.2.13). Learn core package setup, optional drivers, and quick start guides."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "4 min read"
image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
featured: false
---

# Installation & Quick Start

KaizenStat is an elite, zero-friction AutoML and data diagnostics toolkit. The latest stable release is available on PyPI: **[kaizenstat v0.2.13](https://pypi.org/project/kaizenstat/0.2.13/)**.

---

## 📦 Installation

Install the core package with zero heavy external dependencies:

```bash
pip install kaizenstat
```

### Optional Drivers & Accelerators
Tailor KaizenStat to your specific hardware and workload:

```bash
pip install kaizenstat[ui]     # Install Streamlit for interactive dashboards
pip install kaizenstat[gpu]    # Install XGBoost with GPU/MPS acceleration
pip install kaizenstat[fast]   # Install Polars for ultra-fast CSV parsing
pip install kaizenstat[all]    # Install all optional drivers and dependencies
```

---

## 💡 Quick Start Guide

### 1. Python SDK Usage

```python
from kaizenstat import KaizenStat
import pandas as pd

# Load your dataset
df = pd.read_csv("dataset.csv")

# 1. Diagnose issues
findings = KaizenStat.audit(df, target="target_column")

# 2. Automatically heal dirty data
clean_df = KaizenStat.heal(df, target="target_column")

# 3. Benchmark models with cross-validation
leaderboard = KaizenStat.benchmark(clean_df, target="target_column")

# 4. Generate standalone code for reproduction
KaizenStat.codegen("dataset.csv", target="target_column", output_path="reproduce.py")

# 5. Generate and open interactive HTML profiling report
# By default, report() automatically opens in your default browser.
report_path = KaizenStat.report("dataset.csv", target="target_column")

# Or serve the HTML report temporarily on a local web port
KaizenStat.serve_report(report_path)

# 6. Dual-Mode Conversational AI (OpenRouter powered)
# Runs automated structured AI analysis
analysis = KaizenStat.analyze(df, target="target_column")

# Ask custom developer queries about data or pipeline
KaizenStat.ask("Why is model accuracy lower or what are the dataset flaws?")

# Multi-turn conversation with memory context
KaizenStat.ask_followup("What should I do to handle the missing values or high cardinality?")

# 7. Get actionable next-step recommendations
KaizenStat.improve()
```

### 2. Command Line Interface (CLI)

```bash
# Get quick help and list commands
kz --help

# Run the full pipeline in one command
kz auto dataset.csv --target target_column

# Repair a dataset and save the clean file
kz heal dataset.csv --target target_column -o cleaned_dataset.csv

# Launch a local Streamlit app to preview and test model performance
kz serve dataset.csv --target target_column --port 8501

# Generate HTML report and automatically open it in your browser
kz report dataset.csv target_column

# Generate HTML report and serve it on a temporary local port with live web hosting
kz report dataset.csv target_column --serve

# Execute AI diagnostic analysis (saves context locally)
kz analyze dataset.csv --target target_column

# Ask conversational queries about data quality
kz ask "Why is model accuracy low?"

# Ask followup query with conversation memory persistence
kz ask "What should I do to handle the missing values?" --followup

# Get next best actions / actionable improvement plan
kz improve

# View active system and dataset context status
kz status

# Reset conversational memory and session cache
kz reset
```
