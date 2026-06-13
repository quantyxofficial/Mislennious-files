---
id: ml-27
topic: Machine Learning
difficulty: Basic
title: Safe Fixes Never Mutate
type: MCQ
companyTags: [KaizenStat]
acceptanceRate: 72
---

# Scenario

What does `doctor.fix(safe=True, preview_only=True)` do?

## Options

- `Shows the planned corrections as a table without touching your original DataFrame.`
- `Immediately overwrites your original DataFrame with all fixes applied.`
- `Deletes all rows with any missing values.`
- `Trains the model using only safe features.`

## Correct Answer

```
Shows the planned corrections as a table without touching your original DataFrame.
```

## Explanation

KaizenStat's fix engine is preview-first and never silently mutates data. `preview_only=True` shows the FixPlan (imputations, encodings, drops) so you can review it. Calling `doctor.fix(safe=True)` then returns a *new* cleaned DataFrame, applying only LOW-risk fixes. Use `safe=False` to include MEDIUM-risk corrections.
