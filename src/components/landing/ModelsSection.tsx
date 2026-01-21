import { motion } from "framer-motion";
import { Zap, Gauge, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "Pitinf-Small",
    size: "<10B params",
    icon: Zap,
    description: "Lightning-fast inference for high-frequency trading signals and real-time decision making.",
    features: [
      "Sub-100ms latency",
      "High-frequency compatible",
      "Cost-effective at scale",
      "Ideal for signal generation",
    ],
    highlight: false,
    cta: "Start Free",
  },
  {
    name: "Pitinf-Medium",
    size: "<100B params",
    icon: Gauge,
    description: "Balanced performance for general trading workflows, research, and portfolio analysis.",
    features: [
      "Optimal price-performance",
      "Complex reasoning tasks",
      "Multi-asset analysis",
      "Research & backtesting",
    ],
    highlight: true,
    cta: "Most Popular",
  },
  {
    name: "Pitinf-Large",
    size: ">500B params",
    icon: Rocket,
    description: "Frontier-level reasoning for complex financial analysis and institutional applications.",
    features: [
      "State-of-the-art accuracy",
      "Deep financial reasoning",
      "Custom fine-tuning available",
      "Enterprise SLA & support",
    ],
    highlight: false,
    cta: "Contact Sales",
  },
];

export const ModelsSection = () => {
  return (
    <section id="models" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Model Tiers
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Choose Your <span className="gradient-text">PiT Model</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three model tiers designed for different use cases, from high-frequency 
            trading to complex institutional analysis.
          </p>
        </motion.div>

        {/* Model Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {models.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                model.highlight
                  ? "border-2 border-primary bg-card glow-effect"
                  : "glass-card"
              }`}
            >
              {model.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                    model.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <model.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-2xl font-bold">{model.name}</h3>
                <p className="font-mono text-sm text-muted-foreground">{model.size}</p>
              </div>

              <p className="mb-6 text-muted-foreground">{model.description}</p>

              <ul className="mb-8 space-y-3">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  model.highlight
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {model.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Technical Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          All models use a January 2020 temporal cutoff to ensure zero lookahead bias for post-2020 financial data.
        </motion.p>
      </div>
    </section>
  );
};
