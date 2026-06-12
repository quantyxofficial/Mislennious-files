---
title: Introduction to Matplotlib
topic: Matplotlib
order: 1
---

# Introduction to Matplotlib

Matplotlib is the most popular plotting library for Python. It provides a MATLAB-like interface for creating static, animated, and interactive visualizations. It's the foundation for many other visualization libraries like Seaborn and Pandas plotting.

## Why Matplotlib?

### Versatility
- Create any type of plot (line, bar, scatter, histogram, etc.)
- Full control over every element of a figure
- Publication-quality figures

### Integration
- Works seamlessly with NumPy and Pandas
- Integrates with Jupyter notebooks
- Supports multiple output formats (PNG, PDF, SVG, etc.)

### Customization
- Complete control over colors, styles, and layouts
- Support for LaTeX mathematical expressions
- Extensive theming and styling options

## Installation

```bash
pip install matplotlib
```

## Basic Usage

```python
import matplotlib.pyplot as plt

# Simple plot
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.show()
```

## Key Concepts

### 1. Figure and Axes

Understanding the anatomy of a Matplotlib figure:

```python
# Create figure and axes
fig, ax = plt.subplots()

# Plot on axes
ax.plot([1, 2, 3], [1, 4, 9])
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_title('My Plot')

plt.show()
```

**Figure**: The entire window or page
**Axes**: The plot area where data is displayed

### 2. Two Interfaces

Matplotlib offers two ways to create plots:

**Pyplot Interface** (MATLAB-style):
```python
plt.plot([1, 2, 3], [1, 4, 9])
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Title')
plt.show()
```

**Object-Oriented Interface** (Recommended):
```python
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Title')
plt.show()
```

## Common Plot Types

### Line Plot

```python
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y, color='blue', linewidth=2, label='Linear')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Line Plot')
plt.legend()
plt.grid(True)
plt.show()
```

### Scatter Plot

```python
x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 7, 9]

plt.scatter(x, y, color='red', s=100, alpha=0.6)
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Scatter Plot')
plt.show()
```

### Bar Chart

```python
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

plt.bar(categories, values, color='green')
plt.xlabel('Category')
plt.ylabel('Value')
plt.title('Bar Chart')
plt.show()
```

### Histogram

```python
import numpy as np

data = np.random.randn(1000)

plt.hist(data, bins=30, color='purple', alpha=0.7)
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Histogram')
plt.show()
```

## Customization

### Colors

```python
# Named colors
plt.plot(x, y, color='red')

# Hex colors
plt.plot(x, y, color='#FF5733')

# RGB tuples
plt.plot(x, y, color=(0.1, 0.2, 0.5))

# Short codes
plt.plot(x, y, 'r-')  # red solid line
plt.plot(x, y, 'b--') # blue dashed line
plt.plot(x, y, 'go')  # green circles
```

### Line Styles

```python
plt.plot(x, y, linestyle='-')   # Solid
plt.plot(x, y, linestyle='--')  # Dashed
plt.plot(x, y, linestyle='-.')  # Dash-dot
plt.plot(x, y, linestyle=':')   # Dotted
```

### Markers

```python
plt.plot(x, y, marker='o')   # Circle
plt.plot(x, y, marker='s')   # Square
plt.plot(x, y, marker='^')   # Triangle
plt.plot(x, y, marker='*')   # Star
```

### Multiple Plots

```python
x = [1, 2, 3, 4, 5]
y1 = [1, 4, 9, 16, 25]
y2 = [1, 2, 3, 4, 5]

plt.plot(x, y1, label='Quadratic', color='blue')
plt.plot(x, y2, label='Linear', color='red')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Multiple Lines')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Subplots

```python
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# Top left
axes[0, 0].plot([1, 2, 3], [1, 4, 9])
axes[0, 0].set_title('Plot 1')

# Top right
axes[0, 1].scatter([1, 2, 3], [1, 4, 9])
axes[0, 1].set_title('Plot 2')

# Bottom left
axes[1, 0].bar(['A', 'B', 'C'], [1, 4, 9])
axes[1, 0].set_title('Plot 3')

# Bottom right
axes[1, 1].hist([1, 2, 2, 3, 3, 3, 4, 4, 5])
axes[1, 1].set_title('Plot 4')

plt.tight_layout()
plt.show()
```

## Saving Figures

```python
plt.plot([1, 2, 3], [1, 4, 9])
plt.savefig('my_plot.png', dpi=300, bbox_inches='tight')
plt.savefig('my_plot.pdf')  # Vector format
```

## Practice Problems

After studying this material, try these problems:
- **Simple Line Plot** (Basic) - Create your first plot
- **Bar Charts** (Basic) - Visualize categorical data
- **Scatter Plots** (Basic) - Plot relationships between variables

## Next Steps

Continue to:
- **Customization** - Master plot styling and formatting
- **Subplots** - Create complex multi-plot figures
- **Advanced Plots** - 3D plots, contours, and animations
