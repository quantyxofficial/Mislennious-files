---
id: rnn
title: RNNs & LSTMs
description: Sequential Data - Teaching networks to have memory.
order: 7
---

## Networks with Memory

Standard networks (Feed-Forward) have no memory. They process "Dog" and forget it before processing "Cat".
But language is sequential: "The cat sat on the..." (Next word depends on "cat").

### Recurrent Neural Networks (RNNs)
They have a **Loop**. The output from step 1 is fed back into the network for step 2.

### LSTMs (Long Short-Term Memory)
Standard RNNs forget things quickly (Vanishing Gradient).
LSTMs add a "Cell State" (Long-term memory) and Gates (Forget Gate, Input Gate).
They can remember context for hundreds of words.

```python
from tensorflow.keras.layers import LSTM, Embedding

model.add(Embedding(input_dim=10000, output_dim=64))
model.add(LSTM(128))
```
Used for: Translation (Google Translate), Speech Recognition (Siri).
