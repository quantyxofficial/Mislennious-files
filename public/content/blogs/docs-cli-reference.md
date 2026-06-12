---
title: "CLI & API Feature Matrix"
description: "Unified command vocabulary showing full parity between the KaizenStat CLI and Python SDK."
author: "KaizenStat Team"
date: "2026-06-06"
category: "Documentation"
readTime: "5 min read"
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80"
featured: false
---

# CLI & API Feature Matrix

KaizenStat is designed around a single unified vocabulary. Every command line interface execution has a direct, equivalent function in the Python SDK.

---

## ⚔️ Command vocabulary

| Command | Python API | Purpose |
| :--- | :--- | :--- |
| `kz audit` | `KaizenStat.audit()` | 🔍 Runs a diagnostic sweep (missing values, duplicates, imbalance, dead features). |
| `kz heal` | `KaizenStat.heal()` | 🩹 Clean, impute, parse datetimes, drop IDs, and encode string labels. |
| `kz benchmark` | `KaizenStat.benchmark()` | 🚀 Automatically trains, optimizes, and ranks model pipelines. |
| `kz auto` | `KaizenStat.auto()` | ⚡ Orchestrates the entire pipeline in sequence (Audit ➔ Heal ➔ Benchmark). |
| `kz explain` | `KaizenStat.explain()` | 💬 Generates plain-English diagnostic summaries and model recommendations. |
| `kz codegen` | `KaizenStat.codegen()` | 📝 Generates standalone, dependency-free Python code for the best model. |
| `kz export-model` | `KaizenStat.save_model()` | 💾 Trains the top pipeline and saves it directly to a `.joblib` binary. |
| `kz report` | `KaizenStat.report()` / `serve_report()` | 📊 Generates HTML report (auto-opens browser) and serves it on a local web port. |
| `kz serve` | `KaizenStat.serve()` | 🖥️ Launches a local interactive Streamlit app dashboard. |
| `kz analyze` | `KaizenStat.analyze()` | 🧠 Executes auto-intelligence analysis over dataset context using LLM reasoning. |
| `kz ask` | `KaizenStat.ask()` | 🤖 Answers complex developer queries about accuracy, data quality, or anomalies. |
| `kz ask --followup` | `KaizenStat.ask_followup()` | 🔁 Maintains multi-turn conversation memory with the data reasoning engine. |
| `kz improve` | `KaizenStat.improve()` | 🚀 Query AI to get next best actions and improvement plans. |
| `kz status` | *N/A (CLI Only)* | 📊 Show active system and dataset context status. |
| `kz reset` | *N/A (CLI Only)* | 🧹 Reset conversational memory and active dataset context. |
