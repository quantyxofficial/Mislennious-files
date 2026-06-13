---
id: nlp
title: Text & NLP (Bonus)
description: The exact same pipeline on text data — TF-IDF, embeddings, and self-healing.
order: 15
---

## Same API, Different Data

Everything you've learned was on *tabular* data — rows and columns of numbers and categories. But a huge share of real-world data is **text**: product reviews, support tickets, emails, tweets. The remarkable thing about KaizenStat is that the **API does not change at all.** You point the `DataDoctor` at text and it routes the entire pipeline to NLP-specialized modules automatically.

```python
from kaizenstat import DataDoctor

doctor = DataDoctor("reviews.csv", target="sentiment")
doctor.fit()
print(doctor.mode())   # → "text"   (auto-detected)

doctor.health()        # text quality: noise, duplicates, vocabulary, imbalance
doctor.validate()      # token skew, stopword dominance, label leakage
doctor.train()         # TF-IDF + size-adaptive classifier, benchmarked
doctor.debug_model()   # sparsity, rare-token overfitting, bias slices
doctor.improve()       # n-grams, embeddings, augmentation
```

Same methods, same mental model. The skills transfer directly.

## How Text Becomes Numbers

Models can't read words, so the first job is **vectorization** — turning text into numbers. The standard approach is **TF-IDF** (Term Frequency–Inverse Document Frequency):

- **Term Frequency** — how often a word appears in a document. Frequent-in-this-doc = important here.
- **Inverse Document Frequency** — how rare the word is across *all* documents. Words that appear everywhere ("the", "and") are down-weighted; distinctive words are up-weighted.

The result is a vector per document where the standout, meaningful words carry the most weight. A word like "refund" in a review is rare overall but frequent in angry reviews — TF-IDF makes it a strong signal. Once text is a numeric vector, every model from this course (logistic regression, SVM, trees) applies directly.

## Mode Detection

KaizenStat switches to text mode when a column looks like real prose — average word count above ~3 and average length above ~20 characters, and not a low-cardinality category. You don't flag it; `fit()` detects the dominant text column and routes everything accordingly.

## Text-Specific Health & Validation

Text has its own failure modes, and KaizenStat checks for them:

**Health penalties** — empty/very short docs, near-duplicate documents, noise (URLs, HTML tags, special characters), low vocabulary diversity, extreme length variance, class imbalance.

**Validation checks** — token-frequency skew (a few words dominate everything), stopword dominance, rare-token explosion (overfitting risk), and — critically — **text label leakage**: tokens that appear almost exclusively in one class.

```
🚨 Leakage detected: token 'refunded' appears in 98% of the 'negative' class
```

That's the same leakage lesson from Chapter 3, in text form. A giveaway word inflates your score and vanishes in production.

## The Text Model Benchmark

Just like tabular `train()` benchmarks several algorithms, text `train()` **races multiple pipelines** and keeps the winner:

| Pipeline | Best for |
|---|---|
| `TFIDF + LogReg` (word 1–2 grams) | Fast baseline, any dataset size |
| `TFIDF_char + LogReg` (char 3–5 grams) | Noisy text, typos, short docs, multilingual |
| `TFIDF + LinearSVC` (calibrated) | Highest accuracy on medium–large datasets |
| `Embeddings + LogReg` (`all-MiniLM-L6-v2`) | Semantic meaning — adopted only if it beats TF-IDF by >1% |

The last option upgrades to **sentence embeddings** — dense vectors from a transformer model that capture *meaning*, so "great" and "fantastic" land near each other (TF-IDF treats them as unrelated). KaizenStat only adopts embeddings if they actually win on cross-validation, so you never pay the extra cost for nothing.

## Text Self-Healing

The most striking text feature is the automatic improvement loop. `auto_improve_text()` runs a full diagnose-clean-retrain cycle and reports the before-vs-after:

```python
result = doctor.auto_improve_text()
# Baseline → debug → clean noise/URLs/HTML → retrain → compare
```

```
Baseline:   F1 = 0.74
Cleaned:    removed URLs, HTML, normalized whitespace
Retrained:  F1 = 0.81   (+0.07)
```

It found the noise, cleaned it, retrained, and proved the gain — the entire debugging loop from Chapter 13, automated for text.

## The Takeaway

Text feels like a different world, but with KaizenStat it's the *same pipeline* you already know — health, validate, fix, train, debug, improve, report — with NLP-aware internals. Learn the workflow once, apply it to numbers *or* words. That consistency is the point: you've learned a way of *thinking* about ML problems, not a one-off recipe.

Now it all comes together. The final chapter is a complete, end-to-end capstone: raw CSV to a shipped, production-ready model.
