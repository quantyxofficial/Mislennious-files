---
id: ml-28
topic: Machine Learning
difficulty: Hard
title: Reading Cross-Validation Spread
type: MCQ
companyTags: [KaizenStat, Data Science Interview]
acceptanceRate: 57
---

# Scenario

A `train()` result shows `cv_score = 0.87` with `cv_std = 0.15`. A second model shows `cv_score = 0.85` with `cv_std = 0.02`. Which is the safer choice for production and why?

## Options

- `The second model — nearly the same mean but far more stable across folds; high variance (std 0.15) signals an unreliable model.`
- `The first model — its mean score of 0.87 is higher, so it is strictly better.`
- `They are identical; standard deviation is irrelevant.`
- `Neither — any cv_std above 0 means the model is broken.`

## Correct Answer

```
The second model — nearly the same mean but far more stable across folds; high variance (std 0.15) signals an unreliable model.
```

## Explanation

Cross-validation reports both a mean and a spread. A 2-point higher mean is not worth a 7x larger standard deviation. High fold-to-fold variance means performance depends heavily on which rows you happened to train on — it may swing badly in production. Prefer a high *and consistent* CV score: good mean, low std.
