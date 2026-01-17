---
id: pivots
title: Pivot Tables
description: Summarize 100,000 rows in 5 seconds. Drag-and-drop analysis.
order: 7
---

## The Hammer of Analysis

If you only learn one thing in Excel, make it **Pivot Tables**.
They allow you to summarize massive datasets without writing a single formula.

### 1. Creating a Pivot

1.  Select your data (Ctrl + A).
2.  Insert -> PivotTable -> OK.

### 2. The Four Fields

*   **Rows**: This is your "Index" or "Group By". Drag "Region" here.
*   **Columns**: Breaks down the data horizontally. Drag "Year" here.
*   **Values**: The numbers to crunch. Drag "Sales" here.
    *   *Default is SUM. Click to change to COUNT, AVERAGE, etc.*
*   **Filters**: Global filter for the report. Drag "Manager" here.

### 3. Features

*   **Slicers**: Visual buttons to filter the Pivot. (Insert -> Slicer). It makes your sheet look like an app.
*   **Calculated Fields**: Create new metrics (e.g., Profit = Sales - Cost) inside the Pivot.

**Rule**: Your source data must be clean (headers in top row, no blank columns).
