---
id: core-formulas
title: Core Formulas
description: The big five - SUM, AVERAGE, COUNT, MIN, MAX.
order: 3
---

## The Grammar of Excel

Formulas are instructions. "Take A1, add it to B1, and show me the result."
Every formula starts with `=`.

### 1. The Big Five (Aggregations)

*   `=SUM(range)`: Adds everything up.
    *   `=SUM(A1:A10)`
*   `=AVERAGE(range)`: Finds the mean.
*   `=COUNT(range)`: Counts cells containing **Numbers**.
*   `=COUNTA(range)`: Counts cells that are **Not Empty** (Text or Numbers).
*   `=MIN(range)` / `=MAX(range)`: Finds extremas.

### 2. Basic Math Operators

You don't always need functions.
*   Add: `=A1 + B1`
*   Subtract: `=A1 - B1`
*   Multiply: `=A1 * B1`
*   Divide: `=A1 / B1`
*   Power: `=A1 ^ 2` (Squared)

### 3. Syntax Rules

1.  **Colon (`:`)**: "Through". `A1:A5` means A1, A2, A3, A4, A5.
2.  **Comma (`,`)**: "And". `SUM(A1, C1)` means add A1 and C1 (skip B1).
3.  **Parentheses `()`**: Order of operations. formulas work just like algebra.

Practice writing formulas manually until it feels natural.
