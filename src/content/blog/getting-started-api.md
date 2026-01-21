---
title: "Getting Started with PiT-Inference API"
excerpt: "A step-by-step guide to integrating point-in-time language models into your financial AI workflow."
category: "Tutorial"
date: "2025-01-05"
readTime: "5 min read"
featured: false
author: "Alex Rivera"
---

# Getting Started with PiT-Inference API

This guide will walk you through integrating PiT-Inference models into your financial AI workflow. In just a few minutes, you'll be making predictions with models that are guaranteed free of lookahead bias.

## Prerequisites

Before you begin, you'll need:

- A PiT-Inference API key (get one at [pitinference.com/pricing](/pricing))
- Python 3.8+ or Node.js 16+
- Basic familiarity with REST APIs

## Quick Start

### Python

```python
import requests

API_KEY = "your-api-key-here"
BASE_URL = "https://api.pitinference.com/v1"

def predict_stock_movement(ticker: str, context: str) -> dict:
    response = requests.post(
        f"{BASE_URL}/predict",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": "pitinf-medium",
            "task": "stock_movement",
            "ticker": ticker,
            "context": context,
            "temporal_cutoff": "2020-01-01"
        }
    )
    return response.json()

# Example usage
result = predict_stock_movement(
    ticker="AAPL",
    context="Apple reported strong iPhone sales in the holiday quarter..."
)
print(result)
# {"prediction": "up", "confidence": 0.73, "reasoning": "..."}
```

### JavaScript

```javascript
const PitInference = require('pitinference');

const client = new PitInference({
  apiKey: 'your-api-key-here'
});

async function predictStockMovement(ticker, context) {
  const result = await client.predict({
    model: 'pitinf-medium',
    task: 'stock_movement',
    ticker,
    context,
    temporalCutoff: '2020-01-01'
  });
  
  return result;
}

// Example usage
const result = await predictStockMovement(
  'AAPL',
  'Apple reported strong iPhone sales in the holiday quarter...'
);
console.log(result);
// { prediction: 'up', confidence: 0.73, reasoning: '...' }
```

## Choosing the Right Model

We offer three model tiers:

| Model | Best For | Latency | Cost |
|-------|----------|---------|------|
| `pitinf-small` | High-frequency signals, real-time alerts | ~50ms | $ |
| `pitinf-medium` | General trading workflows, daily analysis | ~200ms | $$ |
| `pitinf-large` | Complex analysis, research, portfolio optimization | ~800ms | $$$ |

## Available Tasks

The API supports several financial prediction tasks:

### Stock Movement Prediction

```python
client.predict({
    "task": "stock_movement",
    "ticker": "TSLA",
    "context": "Tesla announces new gigafactory...",
    "horizon": "1d"  # 1d, 1w, 1m
})
```

### Sentiment Analysis

```python
client.predict({
    "task": "sentiment",
    "text": "Company beats earnings expectations by 15%...",
    "granularity": "fine"  # coarse, fine
})
```

### Volatility Forecasting

```python
client.predict({
    "task": "volatility",
    "ticker": "SPY",
    "context": "Fed announces rate decision...",
    "horizon": "1w"
})
```

## Rate Limits

| Plan | Requests/min | Requests/day |
|------|--------------|--------------|
| Starter | 60 | 1,000 |
| Professional | 300 | 50,000 |
| Enterprise | Unlimited | Unlimited |

## Error Handling

```python
try:
    result = client.predict(...)
except PitInferenceError as e:
    if e.code == "rate_limit_exceeded":
        time.sleep(60)
        result = client.predict(...)  # Retry
    elif e.code == "invalid_ticker":
        print(f"Unknown ticker: {e.details['ticker']}")
    else:
        raise
```

## Best Practices

1. **Batch requests** when possible to reduce latency
2. **Cache results** for identical inputs
3. **Use webhooks** for async processing of large batches
4. **Set appropriate timeouts** based on model tier

## Next Steps

- Explore the [full API reference](/docs/api)
- Check out [example notebooks](https://github.com/pitinference/examples)
- Join our [Discord community](https://discord.gg/pitinference)

---

*Questions? Contact us at support@pitinference.com*
