---
id: proportions
title: Proportions (Pie & Donut)
description: Visualize parts of a whole effectively.
order: 6
---

## The Pie Debate

Data Viz purists hate Pie Charts. Why? Because humans are bad at comparing angles.
However, executives *love* them. Use them sparingly for 2-4 categories max.

### 1. Basic Pie

```python
sizes = [40, 30, 20, 10]
labels = ['A', 'B', 'C', 'D']

fig, ax = plt.subplots()
ax.pie(sizes, labels=labels, autopct='%1.1f%%')
ax.set_title("Market Share")
```

### 2. The Donut Chart (Modern)

A Pie chart with a hole is cleaner.

```python
# Draw a white circle in the center
center_circle = plt.Circle((0,0), 0.70, fc='white')
fig.gca().add_artist(center_circle)
```

Use `explode` to highlight one slice (pull it out).

```python
explode = (0.1, 0, 0, 0) # "Explode" the first slice
ax.pie(sizes, explode=explode, ...)
```
