---
id: attention-transformers
title: Attention Mechanism & Transformers
description: >
  Learn about the revolution that powered ChatGPT. Understand the
  concepts of Self-Attention and the Transformer architecture.
order: 16
---

In 2017, a paper titled **"Attention Is All You Need"** changed Artificial Intelligence forever. It introduced the **Transformer** model, which replaced RNNs as the standard for Natural Language Processing.

## Motivation for Attention

RNNs process data word-by-word, which is slow. Transformers can process an entire sentence **all at once**. To do this, they need to know which words in the sentence are most important to each other—this is **Attention**.

## Self-Attention Concept

Imagine the sentence: *"The animal didn't cross the street because **it** was too tired."*
To understand what "**it**" refers to, the network needs to "pay attention" to the word "**animal**."
Self-Attention allows every word in a sequence to "look" at every other word to find relevant information.

## Transformer Architecture

A Transformer consists of two main parts:
1. **Encoder**: Reads the input sentence and converts it into a complex mathematical representation (understanding the meaning).
2. **Decoder**: Takes that representation and generates the output sentence word-by-word.

## Key Advantages over RNNs

- **Parallelization**: Since sentences are processed all at once, Transformers can be trained on massive clusters of GPUs much faster than RNNs.
- **Long-term Dependency**: Unlike LSTMs, which still struggle with very long distances, Attention can link words regardless of how far apart they are.

## Scaling to "Large Language Models" (LLMs)

Modern AI like ChatGPT, Claude, and Gemini are essentially just **massive Transformers**. They have billions of parameters and were trained on almost the entire internet.

---

## The "Transformer-Vision" (ViT)
While originally designed for text, researchers have recently applied Transformers to images (**Vision Transformers**). In many cases, they are beginning to outperform traditional CNNs on large datasets!
