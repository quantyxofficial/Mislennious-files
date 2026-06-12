---
id: advanced-rnn-variants
title: Advanced RNN Variants (LSTM & GRU)
description: >
  Deep dive into LSTMs and GRUs. Learn how "gates" allow these models
  to remember information for long periods of time.
order: 15
---

To solve the "short-term memory" problem of basic RNNs, researchers developed more complex neurons that can selectively remember or forget information. The two most popular ones are **LSTM** and **GRU**.

## 1. LSTM (Long Short-Term Memory)

The LSTM is the most famous solution to the vanishing gradient problem. It introduces a **Cell State** ($C_t$) which acts like a conveyor belt through the sequence. It uses "Gates" (sigmoid layers) to control the flow of information:

- **Forget Gate**: Decides what information to throw away from the memory.
- **Input Gate**: Decides what new information to add to the memory.
- **Output Gate**: Decides what the next hidden state should be.

## 2. GRU (Gated Recurrent Unit)

The GRU is a simpler and more efficient version of the LSTM. It combines the Forget and Input gates into a single "**Update Gate**" and merges the cell state into the hidden state.
- **Pros**: Fewer parameters, faster to train than LSTM.
- **Cons**: Might not capture as complex patterns as LSTM for very long sequences.

## LSTM vs GRU: Which one to use?

| Feature | LSTM | GRU |
| :--- | :--- | :--- |
| **Complexity** | High (4 gates) | Moderate (2 gates) |
| **Memory usage** | Higher | Lower |
| **Training Speed**| Slower | Faster |
| **Best For** | Complex, long-term patterns | Most common NLP tasks |

## Applications

Advanced RNNs are the backbone of many technologies:
- **NLP**: Sentiment analysis, text summarization, language modeling.
- **Time Series**: Weather forecasting, stock market prediction.
- **Audio**: Speech-to-text conversion.

---

## Pro-Tip: Go with GRU first
Unless your sequence is extremely long (like a whole book), a **GRU** will usually give you the same performance as an LSTM but train significantly faster.
