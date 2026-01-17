---
id: text-date
title: Text & Date
description: Cleaning messy data with LEFT, RIGHT, TRIM, and DATE functions.
order: 6
---

## Cleaning the Mess

Data entered by humans is always dirty. Extra spaces, weird dates, mixed case.
Excel has a suite of janitor tools.

### 1. Text Cleaning

*   `=TRIM(text)`: Removes extra spaces (e.g., "  David " -> "David").
*   `=PROPER(text)`: Capitalizes First Letter (e.g., "david" -> "David").
*   `=UPPER(text)` / `=LOWER(text)`: Case conversion.

### 2. Slicing Strings

*   `=LEFT(text, 3)`: Gets first 3 chars. "Excel" -> "Exc".
*   `=RIGHT(text, 2)`: Gets last 2 chars. "Excel" -> "el".
*   `=MID(text, start, length)`: Extracts from the middle.

#### Example: Extracting Initials
Cell A1: "John Smith"
`=LEFT(A1, 1) & LEFT(RIGHT(A1, 5), 1)`
(This is hard. In modern Excel, try Flash Fill using Ctrl+E).

### 3. Date Math

Excel stores dates as numbers (days since Jan 1, 1900).
*   `=TODAY()`: Current date.
*   `=NOW()`: Current date and time.
*   `=YEAR(date)`, `=MONTH(date)`, `=DAY(date)`: Extract parts.
*   `=DATEDIF(start, end, "y")`: Calculates age in years.

**Pro Tip**: `Ctrl + ;` inserts the static current date instantly.
