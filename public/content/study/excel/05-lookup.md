---
id: lookup
title: Lookup Magic
description: The end of manual searching - VLOOKUP, INDEX-MATCH, and XLOOKUP.
order: 5
---

## Connecting Data

You have a "Sales" table with Product IDs (101, 102).
You have a "Products" table that knows ID 101 is an "Apple".
How do you bring the name "Apple" into the Sales table? **Lookups**.

### 1. `VLOOKUP` (The Classic)

`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`

```excel
=VLOOKUP(A2, 'Products'!A:B, 2, FALSE)
```
*   **A2**: The ID (101).
*   **'Products'!A:B**: The table to search. Warning: The ID must be in the *first* column (A).
*   **2**: Return the value from the 2nd column (Name).
*   **FALSE**: Exact Match (Always use False/0).

### 2. `XLOOKUP` (The Modern King)

If you have Excel 365, stop using VLOOKUP. XLOOKUP is better.
`=XLOOKUP(lookup_value, lookup_array, return_array)`

```excel
=XLOOKUP(A2, 'Products'!A:A, 'Products'!B:B)
```
*   It doesn't care if the return column is to the left or right.
*   It defaults to Exact Match.
*   It handles errors gracefully (`if_not_found` argument).

### 3. `INDEX` & `MATCH` (The Old Pro)

Before XLOOKUP, pros used this combination to overcome VLOOKUP's limitations.
`=INDEX(ReturnColumn, MATCH(LookupVal, LookupColumn, 0))`

It's powerful, but XLOOKUP has mostly replaced it.
