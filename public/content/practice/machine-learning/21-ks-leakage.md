---
id: ml-21
topic: Machine Learning
difficulty: Medium
title: Catching Data Leakage
type: MCQ
companyTags: [KaizenStat, Data Science Interview]
acceptanceRate: 62
---

# Scenario

You train a churn model and get 99.8% test accuracy. Thrilled, you run `doctor.validate()` and see: `🚨 Leakage detected in: ['account_closed_date']`. What is the correct interpretation and action?

## Options

- `The feature is almost perfectly correlated with the target because it only exists after churn — drop it and retrain; the 99.8% is fake.`
- `The model is excellent — ship it immediately to capture the 99.8% accuracy.`
- `Leakage means the data file is corrupted — re-download the CSV.`
- `Add more regularization to fix the leakage warning.`

## Correct Answer

```
The feature is almost perfectly correlated with the target because it only exists after churn — drop it and retrain; the 99.8% is fake.
```

## Explanation

`account_closed_date` is only populated *because* a customer churned — information unavailable at prediction time. The model is reading the answer in disguise. In production that column is empty, so the model collapses. KaizenStat flags any feature with correlation > 0.98 to the target. The fix is always to **remove the leaking feature and retrain**. A result that looks too good almost always is.
