---
id: ml-23
topic: Machine Learning
difficulty: Medium
title: Predicting on Raw Data
type: MCQ
companyTags: [KaizenStat, Production ML]
acceptanceRate: 65
---

# Scenario

You trained a model with `model = doctor.quick_train()` on data containing a categorical `Sex` column with values like `"female"`. To predict on a new DataFrame, what must you do to the new data first?

## Options

- `Nothing — pass the raw DataFrame directly; the pipeline replays the same encoding/scaling it learned during training.`
- `Manually one-hot encode and scale it exactly the same way before calling predict.`
- `Convert every column to floats by hand.`
- `Retrain the model on the combined old and new data.`

## Correct Answer

```
Nothing — pass the raw DataFrame directly; the pipeline replays the same encoding/scaling it learned during training.
```

## Explanation

KaizenStat returns a **pipeline**, not a bare model. The preprocessing travels *with* the model, so `model.predict(raw_df)` applies the exact transformations learned at training time. This eliminates train/serve skew — the single most common production ML bug.
