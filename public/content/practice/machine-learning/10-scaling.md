---
id: ml-10
topic: Machine Learning
difficulty: Medium
title: Feature Scaling
type: MCQ
companyTags: [Standard]
acceptanceRate: 75
---

# Scenario

Why is Feature Scaling (StandardScaler) important for algorithms like K-Means or Linear Regression?

## Options

- `It makes the file smaller.`
- `It ensures that large inputs (e.g., Salary) don't dominate small inputs (e.g., Age) due to their magnitude.`
- `It removes outliers.`
- `It converts text to numbers.`

## Correct Answer

```
It ensures that large inputs (e.g., Salary) don't dominate small inputs (e.g., Age) due to their magnitude.
```

## Explanation

Distance-based algorithms behave poorly if one feature ranges from 0-1 and another from 0-1,000,000. Scaling brings them to a comparable range.
