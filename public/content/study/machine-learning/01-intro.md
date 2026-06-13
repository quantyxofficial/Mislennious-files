---
id: intro
title: What is Machine Learning?
description: The mental model — learning from data, the three paradigms, and where KaizenStat fits.
order: 1
---

## The One-Sentence Definition

Machine learning is the practice of writing programs that **improve at a task by looking at examples**, instead of being told the exact rules.

Classic programming and machine learning solve problems from opposite directions:

> **Classic programming:** you write the rules, the computer applies them to data and produces answers.
>
> **Machine learning:** you give the computer data *and* answers, and it figures out the rules for you.

If you can write the rules yourself — "charge 8% sales tax" — you don't need ML. You reach for ML when the rules are too complex, too numerous, or too fuzzy to write by hand: *Is this email spam? Will this customer churn? What's this house worth?* Nobody can write a clean `if/else` for those. But we have thousands of past examples, and ML turns those examples into a working rule.

## The Three Paradigms

Almost everything in ML falls into one of three buckets.

### 1. Supervised Learning

You have labeled examples — inputs **paired with the correct answer** — and you want to predict the answer for new inputs. This is the vast majority of applied ML.

It splits into two sub-types based on what you're predicting:

- **Regression** — predict a *number*. House price, tomorrow's temperature, expected revenue.
- **Classification** — predict a *category*. Spam / not-spam, churn / stay, cat / dog / horse.

```python
# Supervised: every row has features (X) AND a known answer (y)
#   age  income  tenure  →  churned?
#   34   52000   18         No
#   29   31000   3          Yes   ← the label we learn to predict
```

### 2. Unsupervised Learning

You have data but **no labels**. The goal is to discover structure: natural groupings (clustering) or a lower-dimensional summary (dimensionality reduction). "Segment my customers into groups" with nobody telling you what the groups are.

### 3. Reinforcement Learning

An agent takes **actions** in an environment and learns from **rewards and penalties** over time. This powers game-playing AI, robotics, and engagement-optimizing recommenders. It's the most advanced paradigm and beyond this course's scope — but knowing it exists completes the map.

## The Universal Workflow

Every supervised ML project — whether a weekend Kaggle notebook or a system serving millions of predictions a day — follows the same shape:

```
1. Get data         →  a table of examples
2. Clean it         →  fix missing values, errors, leakage
3. Split it         →  hold out a test set you never train on
4. Train a model    →  fit the rules to the training data
5. Evaluate it      →  measure performance on the unseen test set
6. Improve it       →  tune, add features, try better models
7. Ship it          →  export and serve predictions
```

Most courses teach you to do each of these by hand with raw scikit-learn. That's valuable, and you'll learn it here. But it's also where beginners drown — there are a hundred ways to leak data, forget to scale a feature, or fool yourself with a fake-perfect score.

## Where KaizenStat Fits

**KaizenStat** is a Python library that runs this entire workflow for you — *and catches the mistakes you'd otherwise make.* It doesn't replace your understanding; it amplifies it. Most autoML tools say:

```
❌ Others:    "Found the best model → Accuracy: 1.0"
✅ KaizenStat: "This result is fake. Your data is leaking."
```

That difference — telling you *why* a result is suspicious — is the whole philosophy. Throughout this course you'll learn the theory **and** see KaizenStat in action, so you graduate able to both reason about ML and ship it fast.

The central object is the `DataDoctor`. It loads data, diagnoses it, trains the best model, debugs failures, and reports — through one consistent API:

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("customers.csv", target="churn")
doctor.run()   # health → fix → train → debug → improve → report, in one call
```

## What You'll Build in This Course

By the final chapter you'll take a raw customer-churn CSV and ship a calibrated, production-ready `.joblib` model — understanding every step, every metric, and every warning along the way.

Next: you'll train your very first real model in **three lines of code**, before we touch a single equation. Learning by doing comes first; theory follows to explain what you just saw.
