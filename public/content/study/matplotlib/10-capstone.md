---
id: capstone
title: Capstone: Dashboard
description: Combine everything into a professional financial dashboard.
order: 10
---

## Building "The Exec" Dashboard

We will build a single figure with 4 subplots to summarize a company's performance.

### The Layout

*   Top Left: Revenue Trend (Line)
*   Top Right: Revenue Source (Pie)
*   Bottom Left: Employee Satisfaction (Histogram)
*   Bottom Right: Sales vs Marketing Spend (Scatter)

### The Code

```python
import matplotlib.pyplot as plt
import numpy as np

# Apply Theme
plt.style.use('fivethirtyeight')

# Create Figure
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle("Company Performance Dashboard 2025", fontsize=24)

# 1. Revenue (Line)
months = ['Jan', 'Feb', 'Mar', 'Apr']
rev = [10, 15, 13, 18]
ax1.plot(months, rev, color='green', marker='o')
ax1.set_title("Revenue Trend ($M)")

# 2. Source (Pie)
sources = [50, 30, 20]
labels = ['Direct', 'Online', 'Partner']
ax2.pie(sources, labels=labels, autopct='%1.0f%%', explode=(0.1, 0, 0))
ax2.set_title("Revenue Sources")

# 3. Satisfaction (Hist)
scores = np.random.normal(8, 1, 1000) # Mean 8, Std 1
ax3.hist(scores, bins=20, color='purple', alpha=0.7)
ax3.set_title("Employee Satisfaction Info")

# 4. Sales vs Marketing (Scatter)
marketing = np.random.rand(50) * 10
sales = marketing * 3 + np.random.rand(50) * 2
ax4.scatter(marketing, sales)
ax4.set_xlabel("Marketing Spend")
ax4.set_ylabel("Sales Generated")
ax4.set_title("ROI Analysis")

# Final Polish
plt.tight_layout()
plt.show()
```

You have now mastered the art of visual storytelling.
