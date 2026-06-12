---
id: mpl-09
topic: Matplotlib
difficulty: Medium
title: Adding Legends
type: MCQ
companyTags: [Netflix]
acceptanceRate: 85
---

# Scenario

You added labels to your plots: `ax.plot(x, y, label='Sales')`. How do you make the legend appear?

## Options

- `It appears automatically.`
- `ax.show_legend()`
- `ax.legend()`
- `fig.legend(True)`

## Correct Answer

```
ax.legend()
```

## Explanation

You must explicitly call `ax.legend()` to render the legend box. It uses the `label` arguments from previous plot commands.
