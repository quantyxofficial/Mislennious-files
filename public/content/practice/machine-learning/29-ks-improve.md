---
id: ml-29
topic: Machine Learning
difficulty: Medium
title: From Diagnosis to Action
type: MCQ
companyTags: [KaizenStat]
acceptanceRate: 66
---

# Scenario

`doctor.improve()` returns suggestions with `impact` levels and quantified `expected_gain`. What is the right way to use this list?

## Options

- `Apply the highest-impact suggestion first, retrain, then re-diagnose — iterating the loop until no high-severity issues remain.`
- `Apply all suggestions simultaneously and never check the result.`
- `Ignore it — improvement suggestions are generic boilerplate.`
- `Only the lowest-impact suggestions are safe to apply.`

## Correct Answer

```
Apply the highest-impact suggestion first, retrain, then re-diagnose — iterating the loop until no high-severity issues remain.
```

## Explanation

`improve()` returns a ranked, quantified to-do list derived from your actual metrics (real imbalance ratio, real gap-to-target). The professional loop is: train → debug → apply the top suggestion → retrain → repeat. Closing the biggest gap first is the fastest path to a strong model — far better than random fiddling.
