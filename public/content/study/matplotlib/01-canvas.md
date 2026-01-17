---
id: intro
title: The Canvas
description: Understanding the Figure and Axes - The philosophy of plotting.
order: 1
---

## The Artist's Studio

Matplotlib is not just a graphing tool; it's an object-oriented drawing library.
To master it, you must understand two objects:

1.  **Figure**: The blank canvas (the window).
2.  **Axes**: The plot itself (where the x/y lines are).

### The Standard Setup

We rarely use `plt.plot()` directly anymore. We use the "OO Interface" because it gives us control.

```python
import matplotlib.pyplot as plt
import numpy as np

# Create a Figure (the window) and one Axes (the graph)
fig, ax = plt.subplots()

# Now we draw ON the axes
x = np.linspace(0, 10, 100)
y = np.sin(x)

ax.plot(x, y)

plt.show() # Display it
```

### Why two objects?
Because you might want *multiple* plots (Axes) on one canvas (Figure).

### Key Commands

*   `fig.savefig('my_plot.png')`: Save the whole canvas.
*   `ax.set_title("My Plot")`: Set the title of *this* graph.
*   `ax.set_xlabel("Time")`: Label the x-axis.

Think of yourself as a painter. `fig` is your easel, `ax` is your paper.
