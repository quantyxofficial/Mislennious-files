---
id: ml-30
topic: Machine Learning
difficulty: Medium
title: Same Pipeline, Text Data
type: MCQ
companyTags: [KaizenStat, NLP]
acceptanceRate: 68
---

# Scenario

You point `DataDoctor` at a CSV of product reviews with a `sentiment` label and `doctor.mode()` returns `"text"`. How much of the API (health, validate, train, debug, improve) do you need to change versus tabular data?

## Options

- `None — the same methods work; KaizenStat auto-routes the whole pipeline to NLP modules (TF-IDF, embeddings, text leakage checks).`
- `All of them — text requires a completely different set of method names.`
- `Only train() changes; everything else is unavailable for text.`
- `You must manually vectorize the text with TF-IDF before calling any method.`

## Correct Answer

```
None — the same methods work; KaizenStat auto-routes the whole pipeline to NLP modules (TF-IDF, embeddings, text leakage checks).
```

## Explanation

Text mode activates automatically when `fit()` detects a dominant text column. The exact same calls — `health()`, `validate()`, `train()`, `debug_model()`, `improve()` — route internally to NLP-specialized modules. `train()` benchmarks TF-IDF word/char n-grams, LinearSVC, and sentence embeddings, picking the winner. You learn the workflow once and apply it to numbers or words.
