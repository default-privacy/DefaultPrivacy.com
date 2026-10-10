---
term: "Federated Learning"
slug: "federated-learning"
definition: "A machine learning approach where the model is trained across multiple devices without raw data leaving each device, preserving data privacy."
category: "Cloud"
relatedTerms:
  - "differential-privacy"
  - "secure-multi-party-computation"
---

Federated learning allows AI to learn from data without collecting it centrally.

## How It Works

1. A model is sent to each user's device
2. The model trains on local data
3. Only model updates (gradients) are sent back — not the raw data
4. Updates are aggregated to improve the global model
5. The improved model is sent back to devices

## Privacy Benefits

- Raw data never leaves the device
- Reduces central data collection
- Can be combined with differential privacy for stronger guarantees

## Limitations

- Model updates can still leak information about the training data
- Gradient inversion attacks can reconstruct training data from updates
- Requires trusting the aggregation server

## Where It's Used

- Google Gboard (keyboard prediction without uploading typed text)
- Apple's on-device ML improvements
- Health research across hospitals without sharing patient records
