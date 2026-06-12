---
id: mpl-07
topic: Matplotlib
difficulty: Basic
title: Axis Labels
type: MCQ
companyTags: [Microsoft]
acceptanceRate: 88
---

# Scenario

How do you label the X-axis?

## Options

- `ax.xlabel('Time')`
- `ax.set_xlabel('Time')`
- `ax.label_x('Time')`
- `ax.x_text('Time')`

## Correct Answer

```
ax.set_xlabel('Time')
```

## Explanation

Similarly to title, widely used `plt.xlabel()` becomes `ax.set_xlabel()` in the object-oriented approach.
