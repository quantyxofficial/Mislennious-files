---
id: mpl-06
topic: Matplotlib
difficulty: Basic
title: Setting Titles
type: MCQ
companyTags: [Microsoft]
acceptanceRate: 88
---

# Scenario

In the Axes interface (ax), how do you set the title?

## Options

- `ax.title('My Plot')`
- `ax.set_title('My Plot')`
- `ax.add_title('My Plot')`
- `ax.header('My Plot')`

## Correct Answer

```
ax.set_title('My Plot')
```

## Explanation

Note the difference: `plt.title()` vs `ax.set_title()`. Using `set_` is the hallmark of the OO interface.
