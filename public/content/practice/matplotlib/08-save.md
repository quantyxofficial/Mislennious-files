---
id: mpl-08
topic: Matplotlib
difficulty: Basic
title: Saving Figures
type: MCQ
companyTags: [Adobe]
acceptanceRate: 80
---

# Scenario

How do you save your high-resolution plot to a file?

## Options

- `plt.save('plot.png')`
- `fig.savefig('plot.png', dpi=300)`
- `ax.export('plot.png')`
- `fig.write('plot.png')`

## Correct Answer

```
fig.savefig('plot.png', dpi=300)
```

## Explanation

`savefig` is a method of the Figure object. `dpi=300` ensures print-quality resolution.
