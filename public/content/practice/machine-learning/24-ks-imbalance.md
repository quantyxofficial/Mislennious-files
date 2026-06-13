---
id: ml-24
topic: Machine Learning
difficulty: Hard
title: The 98% Accuracy Trap
type: MCQ
companyTags: [KaizenStat, Data Science Interview]
acceptanceRate: 58
---

# Scenario

Only 2% of transactions are fraud. A model predicts "not fraud" for everything and reports 98% accuracy. Why is this model worthless, and which metric exposes the problem?

## Options

- `It catches zero fraud (recall = 0); F1-score and per-class recall reveal the failure that accuracy hides.`
- `It is genuinely excellent — 98% accuracy is a strong result.`
- `The problem is the learning rate; lower it to fix accuracy.`
- `Accuracy is the only metric that matters; the model is fine.`

## Correct Answer

```
It catches zero fraud (recall = 0); F1-score and per-class recall reveal the failure that accuracy hides.
```

## Explanation

On imbalanced data, accuracy is a liar — predicting the majority class always scores high while catching none of the rare, important cases. The model's recall on fraud is 0%. KaizenStat flags imbalance in `health()`, adds `class_weight='balanced'` automatically, and leads its report with F1 and per-class recall instead of accuracy.
