---
term: "Machine Learning Bias"
slug: "machine-learning-bias"
definition: "Systematic errors in AI systems that produce unfair or discriminatory outcomes. Bias can come from skewed training data, flawed algorithms, or feedback loops. In privacy contexts, biased systems may disproportionately surveil or deny services to certain groups."
category: "Emerging Threats"
relatedTerms:
  - "ai-hiring-discrimination"
  - "automated-decision-making"
  - "facial-recognition-ban"
---

AI doesn't eliminate human bias—it amplifies it. Machine learning systems learn from data, and if that data reflects historical discrimination, the AI will too.

## Sources of Bias

### Data Bias
- **Historical bias**: Training data reflects past discrimination (e.g., hiring data where women were underhired)
- **Representation bias**: Underrepresented groups have less data, so models perform worse for them
- **Measurement bias**: The thing being measured doesn't capture what we care about
- **Aggregation bias**: One model for all groups when different groups need different treatment

### Algorithmic Bias
- **Optimization**: Model optimizes for wrong metric (clicks over fairness)
- **Feedback loops**: Model's predictions influence future data (recommendation systems)
- **Proxy discrimination**: Using correlated features (ZIP code as proxy for race)

## Privacy and Surveillance Implications

- **Facial recognition**: Higher error rates for women and people of color—wrongful arrests
- **Predictive policing**: Reinforces over-policing of minority neighborhoods
- **Credit scoring**: AI may encode historical lending discrimination
- **Hiring**: Resume screening AI may reject qualified candidates from non-traditional backgrounds
- **Advertising**: Job and housing ads shown differently by demographic

## Mitigation

- Diverse training data and teams
- Auditing for disparate impact
- Human oversight of high-stakes decisions
- Transparency and explainability
- Regulatory frameworks (EU AI Act, sector-specific rules)
