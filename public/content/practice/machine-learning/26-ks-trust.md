---
id: ml-26
topic: Machine Learning
difficulty: Medium
title: Reading the Trust Score
type: MCQ
companyTags: [KaizenStat, Production ML]
acceptanceRate: 64
---

# Scenario

Your model is 88% accurate, but `doctor.trust_score()` returns 54/100 with a low calibration sub-score. What does this most likely mean for production?

## Options

- `The model is overconfident — its stated probabilities don't match real accuracy, so decisions based on those probabilities will be unreliable; it is not production-ready yet.`
- `The accuracy is wrong and should be recomputed.`
- `Trust scores below 60 are normal and can be ignored.`
- `You must collect 10x more data before any model can be trusted.`

## Correct Answer

```
The model is overconfident — its stated probabilities don't match real accuracy, so decisions based on those probabilities will be unreliable; it is not production-ready yet.
```

## Explanation

Accuracy is necessary but not sufficient. The Trust Score combines confidence, robustness, calibration, and failure slices into one 0–100 readiness number. A low calibration sub-score means the model says "95% sure" when it's right far less often — dangerous if you act on those probabilities. KaizenStat can auto-apply Platt scaling to fix calibration without changing predictions.
