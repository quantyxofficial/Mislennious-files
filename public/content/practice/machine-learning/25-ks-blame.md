---
id: ml-25
topic: Machine Learning
difficulty: Hard
title: Data Problem or Model Problem?
type: MCQ
companyTags: [KaizenStat]
acceptanceRate: 55
---

# Scenario

`doctor.debug_model()` fits a RandomForest baseline and reports it scores only 0.55 CV — and your tuned model also scores ~0.56. What does this tell you, and what should you NOT do?

## Options

- `It's a DATA problem — the signal isn't in your features; do NOT keep swapping models or tuning, gather better features instead.`
- `It's a MODEL problem — keep trying fancier algorithms until one works.`
- `The baseline is broken; ignore it and ship the tuned model.`
- `Increase n_estimators to 10,000 to brute-force a better score.`

## Correct Answer

```
It's a DATA problem — the signal isn't in your features; do NOT keep swapping models or tuning, gather better features instead.
```

## Explanation

When even a strong baseline scores poorly (< 0.60), no algorithm can predict the unpredictable — the information simply isn't in the data. KaizenStat's data-vs-model blame check catches this so you stop wasting days tuning. The fix is better features, more data, or cleaner labels — not a fancier model.
