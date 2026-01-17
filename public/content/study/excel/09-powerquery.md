---
id: power-query
title: Introduction to Power Query
description: The hidden ETL tool inside Excel. Unpivot and Clean without macros.
order: 9
---

## The ETL Engine

**Power Query** (Get & Transform Data) is the biggest upgrade to Excel in 20 years.
It records your cleaning steps so you can **replay** them next month.

### 1. Importing Data

Data -> Get Data -> From File / From Web.
You can pull data from a folder of CSVs and combine them automatically.

### 2. Transformations

The Power Query Editor window allows you to:
*   **Unpivot**: Turn weird matrix tables back into proper data lists.
*   **Split Column by Delimiter**: Break "New York - USA" into "City" and "Country".
*   **Filter & Sort**: Remove bad rows.

### 3. Close & Load

Once your steps are recorded on the right side ("Applied Steps"), click **Close & Load**.
The result lands in a new clean sheet.
Next month when the source file updates, just right-click -> **Refresh**.

It replaces 90% of old VBA macros.
