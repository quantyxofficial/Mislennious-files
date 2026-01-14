---
id: dl-nlp
title: Deep Learning for NLP
description: >
  Learn how computers understand human language using techniques like
  Tokenization, Word Embeddings, and Sequence-to-Sequence models.
order: 17
---

Natural Language Processing (NLP) is the branch of AI that gives computers the ability to understand text and spoken words. Deep Learning has transformed NLP from simple rule-based systems to the fluid, human-like generation we see in LLMs.

## Text Preprocessing

Computers cannot process words; they can only process numbers. We must convert text through several steps:
1. **Tokenization**: Breaking a sentence down into smaller units called **Tokens** (words, sub-words, or characters).
2. **Cleaning**: Removing punctuation, converting to lowercase, and removing "stop words" (common words like 'the', 'is' that don't add much meaning).
3. **Encoding**: Assigning a unique number to every token.

## Word Embeddings

Instead of just assigning a random number to a word, we want to capture its **meaning**. Word Embeddings represent words as vectors in a high-dimensional space.
- Similar words (e.g., "King" and "Queen") are mathematically placed close to each other.
- **Word2Vec**: An early technique that learned embeddings by predicting surrounding words.
- **GloVe**: A model that uses global word-to-word statistics.

## Sequence-to-Sequence (Seq2Seq) Models

Seq2Seq models are used for tasks where the input is a sequence and the output is another sequence (e.g., Language Translation).
- **Encoder**: Summarizes the input sentence into a "context vector."
- **Decoder**: Uses that context to generate the translated sentence word-by-word.

## Language Models

A Language Model is a system that predicts the **next word** in a sequence.
- *Simple*: "How are [you]?"
- *Advanced*: AI writing entire essays by repeatedly predicting the most likely next token based on a massive "Context Window."

---

## The Vector Math of Beauty
One of the most famous results of word embeddings is that you can perform math on vectors:
`Vector("King") - Vector("Man") + Vector("Woman") ≈ Vector("Queen")`
This shows that the model has truly captured the abstract concept of gender and royalty!
