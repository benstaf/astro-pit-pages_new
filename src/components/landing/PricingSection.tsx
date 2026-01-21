import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for experimentation and proof-of-concept projects.",
    features: [
      "10,000 API calls/month",
      "Pitinf-Small access",
      "Community support",
      "Basic analytics",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "For teams building production financial AI applications.",
    features: [
      "500,000 API calls/month",
      "All model tiers",
      "Priority support",
      "Advanced analytics",
      "Custom rate limits",
      "99.9% uptime SLA",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For institutions requiring dedicated infrastructure.",
    features: [
      "Unlimited API calls",
      "Dedicated instances",
      "Custom fine-tuning",
      "24/7 support & SLA",
      "On-premise deployment",
      "Compliance packages",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="absolute inset-0 glow-bg opacity-30" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.highlight
                  ? "border-2 border-primary bg-card glow-effect"
                  : "glass-card"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1">
                  <div className="flex items-center gap-1 text-sm font-medium text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlight
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* API Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <h3 className="mb-4 text-center text-lg font-semibold">Quick Start</h3>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">example.py</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm">
              <code className="text-foreground">
                <span className="text-primary">import</span> pitinference
                {"\n\n"}
                <span className="text-muted-foreground"># Initialize client</span>
                {"\n"}
                client = pitinference.Client(api_key=<span className="text-accent">"your-api-key"</span>)
                {"\n\n"}
                <span className="text-muted-foreground"># Query with point-in-time context</span>
                {"\n"}
                response = client.analyze(
                {"\n"}
                {"    "}model=<span className="text-accent">"pitinf-medium"</span>,
                {"\n"}
                {"    "}query=<span className="text-accent">"Analyze AAPL earnings outlook"</span>,
                {"\n"}
                {"    "}as_of_date=<span className="text-accent">"2024-01-15"</span>
                {"\n"}
                )
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
