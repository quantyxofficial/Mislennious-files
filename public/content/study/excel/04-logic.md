---
id: logic
title: Logical Functions
description: Teaching Excel to think - IF, AND, OR, and Nested Layouts.
order: 4
---

## Making Decisions

Excel can make choices for you. "If sales > 1000, verify 'Bonus', otherwise say 'Keep Pushing'."

### 1. The `IF` Function

`=IF(logical_test, value_if_true, value_if_false)`

```excel
=IF(B2 >= 50, "Pass", "Fail")
```
If cell B2 contains 70, this shows "Pass". If 40, "Fail".

### 2. `AND` / `OR`

These helpers check multiple conditions. They return TRUE or FALSE.

*   `=AND(cond1, cond2)`: Both must be true.
*   `=OR(cond1, cond2)`: At least one must be true.

### 3. Putting them together (Nested IF)

"If Sales > 100, 'Gold'. If > 50, 'Silver'. Else 'Bronze'."

```excel
=IF(A1 > 100, "Gold", IF(A1 > 50, "Silver", "Bronze"))
```
**Warning**: Too many nested IFs are hard to read. Modern Excel has `=IFS()`, which is cleaner.

```excel
=IFS(A1 > 100, "Gold", A1 > 50, "Silver", TRUE, "Bronze")
```

Logic allows you to build automated flags and alerts in your dashboards.
