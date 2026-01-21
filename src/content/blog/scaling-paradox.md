---
title: "The Scaling Paradox: Why Bigger Models Fail at Finance"
excerpt: "Our research reveals a counterintuitive finding: larger LLMs show greater alpha decay. Here's why model size can hurt financial predictions."
category: "Research"
date: "2025-01-10"
readTime: "6 min read"
featured: false
author: "Dr. Sarah Chen"
---

# The Scaling Paradox: Why Bigger Models Fail at Finance

In the world of AI, bigger has traditionally meant better. GPT-4 outperforms GPT-3. Llama-70B beats Llama-7B. The scaling laws seem immutable.

But our research reveals a troubling exception: **for financial prediction, larger models can actually perform worse**.

## The Counterintuitive Finding

When we evaluated 35+ LLMs on our Look-Ahead-Bench, we expected larger models to show better financial reasoning. Instead, we found the opposite:

- **Smaller models** (under 10B parameters) showed average alpha decay of **-8.2pp**
- **Medium models** (10-100B parameters) showed average alpha decay of **-15.4pp**  
- **Large models** (100B+ parameters) showed average alpha decay of **-22.1pp**

The correlation between model size and alpha decay was **0.73**—a remarkably strong relationship.

## Why This Happens

The explanation lies in how LLMs learn. Larger models have more capacity to memorize specific facts from their training data. This includes:

- Specific stock prices on specific dates
- Earnings report outcomes
- Merger announcements
- Market crash timelines

A 7B parameter model might learn general patterns about market behavior. A 70B parameter model can memorize that "NVIDIA stock doubled between January and June 2023."

## Implications for Quant Finance

This finding has significant implications:

### 1. Model Selection

Funds using LLMs for alpha generation should consider **smaller, specialized models** rather than frontier-scale general-purpose models.

### 2. Backtesting

Any backtest using a standard LLM is likely **overstating performance** due to temporal leakage.

### 3. Risk Management

Risk models built on contaminated predictions will systematically **underestimate tail risks**.

## The PiT Solution

Our Point-in-Time (PiT) models address this by ensuring strict temporal cutoffs during training. A PiT model trained with a January 2020 cutoff has never seen any data that references events after that date.

The result? Consistent performance across time periods:

| Model | P1 Alpha | P2 Alpha | Decay |
|-------|----------|----------|-------|
| Pitinf-Small | +15.23% | +14.78% | -0.45pp |
| Pitinf-Medium | +18.34% | +17.89% | -0.45pp |
| Pitinf-Large | +21.67% | +20.92% | -0.75pp |

Notice that even our largest model maintains stable performance—because scale without contamination is still beneficial.

## Conclusion

The scaling paradox teaches us that **more parameters are only valuable if the training data is clean**. For financial applications, temporal hygiene matters more than model size.

---

*Want to learn more? Read our [full paper](/research) or [try our API](/pricing).*
