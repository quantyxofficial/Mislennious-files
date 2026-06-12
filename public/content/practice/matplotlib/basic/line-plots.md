---
id: plt-b-1
topic: Matplotlib
difficulty: Basic
title: Simple Line Plot
type: MCQ
companyTags: [Cisco]
acceptanceRate: 91
---

# Scenario

You have x = [1, 2, 3] and y = [2, 4, 6]. Which command creates a basic line graph to visualize this data?

## Options

- `plt.plot(x, y)`
- `plt.line(x, y)`
- `plt.graph(x, y)`
- `plt.draw(x, y)`

## Correct Answer

```python
plt.plot(x, y)
```

## Explanation

`plt.plot()` is the standard function for creating line plots in Matplotlib. It's the most fundamental plotting function and the starting point for most visualizations.

### Basic Usage:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3]
y = [2, 4, 6]

plt.plot(x, y)
plt.show()  # Display the plot
```

### Customization Options:

```python
# Line style and color
plt.plot(x, y, color='red', linestyle='--', linewidth=2)

# Markers
plt.plot(x, y, marker='o', markersize=8)

# Labels and title
plt.plot(x, y, label='Linear Growth')
plt.xlabel('Time')
plt.ylabel('Value')
plt.title('Simple Line Plot')
plt.legend()

# Multiple lines
plt.plot(x, y, label='Line 1')
plt.plot(x, [1, 3, 5], label='Line 2')
plt.legend()
```

### Common Line Styles:

- `'-'` - Solid line (default)
- `'--'` - Dashed line
- `'-.'` - Dash-dot line
- `':'` - Dotted line

### Common Colors:

- `'b'` - Blue
- `'r'` - Red
- `'g'` - Green
- `'k'` - Black
- Or use hex codes: `'#FF5733'`
