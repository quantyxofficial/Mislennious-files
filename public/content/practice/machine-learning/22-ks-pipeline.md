---
id: ml-22
topic: Machine Learning
difficulty: Basic
title: The DataDoctor Pipeline
type: MCQ
companyTags: [KaizenStat]
acceptanceRate: 78
---

# Scenario

In KaizenStat, which single method runs the full pipeline — health → fix → train → debug → improve → report — in one call?

## Options

- `doctor.run()`
- `doctor.health()`
- `doctor.fit()`
- `doctor.validate()`

## Correct Answer

```
doctor.run()
```

## Explanation

`run()` is the AutoPilot: it executes the entire workflow and narrates each stage in the terminal. `quick_train()` is its sibling that simply returns the trained pipeline. `fit()` only registers the dataset and target; `health()` and `validate()` are individual diagnostic steps.
