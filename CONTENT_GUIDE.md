# Content Management Guide

This guide explains how to add and manage practice problems and study materials for the KaizenStat practice platform.

## 📁 Folder Structure

```
content/
├── study/                          # Curated study materials
│   ├── numpy/
│   ├── pandas/
│   └── matplotlib/
│
└── practice/                       # Practice problems
    ├── numpy/
    │   ├── basic/
    │   ├── medium/
    │   └── hard/
    ├── pandas/
    │   ├── basic/
    │   ├── medium/
    │   └── hard/
    └── matplotlib/
        ├── basic/
        ├── medium/
        └── hard/
```

## 📝 Adding Practice Problems

### File Naming Convention

Use descriptive, kebab-case filenames:
- ✅ `array-creation.md`
- ✅ `groupby-aggregation.md`
- ✅ `line-plots.md`
- ❌ `problem1.md`
- ❌ `Array_Creation.md`

### Practice Problem Template

Create a new `.md` file in the appropriate directory (e.g., `/content/practice/numpy/basic/your-problem.md`):

```markdown
---
id: np-b-2
topic: NumPy
difficulty: Basic
title: Your Problem Title
type: MCQ
companyTags: [Google, Amazon]
acceptanceRate: 85
---

# Scenario

Describe the real-world scenario or problem context here. Make it practical and relatable.

## Options

- `option1`
- `option2`
- `option3`
- `option4`

## Correct Answer

```python
option1
```

## Explanation

Explain why this is the correct answer. Include:
- Why this approach works
- Key concepts involved
- Common pitfalls to avoid

### Additional Tips:

You can add more context, examples, or best practices here.
```

### For Code-Type Problems

```markdown
---
id: pd-m-2
topic: Pandas
difficulty: Medium
title: Data Filtering
type: Code
companyTags: [Netflix, Spotify]
acceptanceRate: 68
---

# Scenario

You have a DataFrame `df` with columns "Name", "Age", and "Salary". Write code to filter rows where Age is greater than 30 and Salary is less than 50000.

## Correct Answer

```python
df[(df['Age'] > 30) & (df['Salary'] < 50000)]
```

## Explanation

This uses boolean indexing with multiple conditions:
- Each condition is wrapped in parentheses
- Use `&` for AND, `|` for OR
- The result is a filtered DataFrame

### Alternative Approaches:

```python
# Using query method
df.query('Age > 30 and Salary < 50000')

# Using loc
df.loc[(df['Age'] > 30) & (df['Salary'] < 50000)]
```
```

## 📚 Adding Study Materials

### File Naming Convention

Use numbered prefixes for ordering:
- ✅ `01-basics.md`
- ✅ `02-advanced-operations.md`
- ✅ `03-best-practices.md`

### Study Material Template

Create a new `.md` file in the appropriate directory (e.g., `/content/study/numpy/02-arrays.md`):

```markdown
---
title: Arrays and Operations
topic: NumPy
order: 2
---

# Arrays and Operations

Introduction to the topic...

## Key Concepts

### Concept 1

Explanation...

```python
# Code example
import numpy as np
arr = np.array([1, 2, 3])
```

### Concept 2

More explanation...

## Common Operations

### Operation 1

```python
# Example code
```

### Operation 2

```python
# Example code
```

## Best Practices

- Tip 1
- Tip 2
- Tip 3

## Practice Problems

After studying this material, try these problems:
- **Problem Name** (Difficulty) - Description
- **Another Problem** (Difficulty) - Description
```

## 🎯 Metadata Fields

### Practice Problems

| Field | Required | Type | Description | Example |
|-------|----------|------|-------------|---------|
| `id` | ✅ | string | Unique identifier | `np-b-1`, `pd-m-3` |
| `topic` | ✅ | string | NumPy, Pandas, or Matplotlib | `NumPy` |
| `difficulty` | ✅ | string | Basic, Medium, or Hard | `Medium` |
| `title` | ✅ | string | Problem title | `Array Creation` |
| `type` | ✅ | string | MCQ or Code | `MCQ` |
| `companyTags` | ❌ | array | Companies that ask this | `[Google, Amazon]` |
| `acceptanceRate` | ❌ | number | Percentage (0-100) | `85` |

### Study Materials

| Field | Required | Type | Description | Example |
|-------|----------|------|-------------|---------|
| `title` | ✅ | string | Material title | `Introduction to NumPy` |
| `topic` | ✅ | string | NumPy, Pandas, or Matplotlib | `NumPy` |
| `order` | ✅ | number | Display order | `1` |

## 🔢 ID Naming Convention

Use this format: `{topic}-{difficulty}-{number}`

**Topic Codes:**
- `np` - NumPy
- `pd` - Pandas
- `plt` - Matplotlib

**Difficulty Codes:**
- `b` - Basic
- `m` - Medium
- `h` - Hard

**Examples:**
- `np-b-1` - NumPy Basic #1
- `pd-m-5` - Pandas Medium #5
- `plt-h-2` - Matplotlib Hard #2

## ✅ Content Checklist

Before adding new content, ensure:

- [ ] File is in the correct directory
- [ ] Filename follows kebab-case convention
- [ ] All required metadata fields are present
- [ ] ID is unique and follows naming convention
- [ ] Scenario is clear and practical
- [ ] Code examples are tested and correct
- [ ] Explanation is comprehensive
- [ ] Markdown formatting is correct

## 🚀 Publishing Content

### Step 1: Create the File

Add your markdown file to the appropriate directory.

### Step 2: Update Content Manifest

Edit the `practice.json` file in the topic folder (e.g., `/public/content/practice/numpy/practice.json`) and add your new problem:

```json
{
  "topic": "NumPy",
  "problems": [
    // ... existing problems
    {
      "id": "np-b-new",
      "file": "basic/your-new-file.md",
      "difficulty": "Basic",
      "title": "Your Problem Title"
    }
  ]
}
```

### Step 3: Test Locally

1. Run the development server: `npm run dev`
2. Navigate to the practice page
3. Verify your problem appears in the list
4. Test solving the problem
5. Verify the explanation displays correctly

### Step 4: Commit and Deploy

```bash
git add public/content/
git commit -m "Add new practice problem: Your Problem Title"
git push
```

## 📊 Best Practices

### Writing Scenarios

✅ **Good:**
> You have a DataFrame with sales data containing columns "Region", "Product", and "Revenue". You need to find the top 5 products by total revenue.

❌ **Bad:**
> Filter a DataFrame.

### Writing Explanations

✅ **Good:**
> The `groupby()` function groups data by one or more columns. When combined with `sum()`, it calculates the total for each group. This is essential for aggregating data in real-world analytics.

❌ **Bad:**
> Use groupby to group data.

### Code Examples

- Always test your code before adding it
- Include comments for complex operations
- Show alternative approaches when relevant
- Use realistic variable names

### Difficulty Guidelines

**Basic:**
- Single concept
- Direct application
- Minimal complexity
- Common operations

**Medium:**
- Multiple concepts
- Requires understanding of relationships
- Some problem-solving needed
- Intermediate operations

**Hard:**
- Complex scenarios
- Multiple steps required
- Advanced concepts
- Optimization needed

## 🔧 Troubleshooting

### Problem not appearing in list

1. Check file is in correct directory
2. Verify filename is added to `fileMap` in `contentLoader.ts`
3. Check frontmatter syntax (must have `---` delimiters)
4. Verify topic and difficulty match directory structure

### Markdown not rendering correctly

1. Check for syntax errors in markdown
2. Ensure code blocks use triple backticks
3. Verify frontmatter is valid YAML
4. Test in a markdown preview tool

### Options not displaying (MCQ)

1. Ensure options are under `## Options` heading
2. Each option must start with `- \``
3. Each option must end with \``
4. Example: `- \`np.array([1, 2, 3])\``

## 📞 Need Help?

If you encounter issues:
1. Check this guide thoroughly
2. Review existing content files for examples
3. Test in development environment
4. Check browser console for errors

## 🎨 Markdown Features

You can use these markdown features in your content:

- **Bold text**: `**bold**`
- *Italic text*: `*italic*`
- `Inline code`: `` `code` ``
- Code blocks: ` ```python ... ``` `
- Lists: `- item` or `1. item`
- Links: `[text](url)`
- Headers: `# H1`, `## H2`, `### H3`
- Blockquotes: `> quote`

---

**Happy content creating! 🎉**
