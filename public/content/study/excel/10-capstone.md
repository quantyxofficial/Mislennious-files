---
id: capstone
title: Capstone: Sales Dashboard
description: Build a dynamic, interactive report for stakeholders.
order: 10
---

## Building the Exec Dashboard

You have raw sales data. The CEO wants a one-page overview.

### Step 1: Clean with Power Query

*   Load the raw CSV.
*   Fix Date formats.
*   Calculate "Total Profit" column.
*   Load back to Excel Table.

### Step 2: Build Pivot Tables (The Engine)

Create a new sheet "Calc" (hide it later).
*   Pivot 1: Sales by Region.
*   Pivot 2: Sales Trend (Monthly).
*   Pivot 3: Top 5 Products.

### Step 3: Create Charts (The View)

*   Insert Pivot Charts for each table.
*   Format them (remove clutter, match brand colors).
*   Cut and Paste them onto a "Dashboard" sheet.

### Step 4: Add Slicers (The interactivity)

*   Click any chart -> Insert Slicer (Region, Time).
*   **Crucial Step**: Right-click Slicer -> Report Connections -> Check ALL Pivot Tables.
    *   Now clicking "North" filters ALL charts at once.

### Conclusion

You built a full Business Intelligence app inside Excel. No code required.
