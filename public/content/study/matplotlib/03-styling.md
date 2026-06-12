---
id: styling
title: Styling Masterclass
description: Make it beautiful - Colors, Markers, Linestyles, and Themes.
order: 3
---

## Making It Pop

Default Matplotlib looks like 1990s Excel. Let's fix that.

### 1. The Global Theme

The easiest trick: Set a style sheet at the start of your script.

```python
plt.style.use('seaborn-v0_8-darkgrid')
# Others: 'ggplot', 'fivethirtyeight', 'dark_background'
```

### 2. Customizing Lines

`ax.plot()` has powerful arguments.
*   `color`: 'red', '#FF0000', 'tab:blue'.
*   `linestyle`: '--' (dashed), ':' (dotted), '-' (solid).
*   `linewidth`: Thickness.
*   `marker`: 'o' (circle), 's' (square), '*' (star).

```python
ax.plot(x, y, color='purple', linestyle='--', linewidth=3, marker='o')
```

### 3. Labels and Grid

Data without labels is useless.

```python
ax.set_title("Annual Growth", fontsize=16)
ax.set_xlabel("Year")
ax.set_ylabel("Revenue ($)")

ax.grid(True, linestyle=':', alpha=0.6) # Add a subtle grid
```

### 4. Legends

If you have two lines, you need a legend.

```python
ax.plot(x, y1, label='Company A')
ax.plot(x, y2, label='Company B')
ax.legend() # Automatically places the box
```

A good plot explains itself without you needing to speak.
