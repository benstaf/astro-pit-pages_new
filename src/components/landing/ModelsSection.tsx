import { motion } from "framer-motion";
import { Zap, Gauge, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "Pitinf-Small",
    price: "$10 / MTokens input",
    note: "Output tokens free",
    icon: Zap,
    description:
      "Ultra-low latency model designed for lightweight inference and cost-sensitive workloads.",
    features: [
      "Fast inference",
      "Ideal for simple signals",
      "Low-cost experimentation",
      "Custom cutoff date",
    ],
    highlight: false,
    cta: "Get Started",
  },
    {
  name: "Pitinf-Medium",
  price: "$50 / MTokens input",
  note: "Output tokens free",
  icon: Gauge,
  description:
    "Balanced model for basic reasoning tasks, research workflows, and general financial analysis.",
  features: [
    "Basic reasoning capabilities",
    "Good price–performance balance",
    "No memorization bias",
    "Custom cutoff date",
  ],
  highlight: false,
  cta: "Choose Medium",
},
  {
  name: "Pitinf-Large",
  price: "$200 / MTokens input",
  note: "Output tokens free",
  icon: Rocket,
  description:
    "State-of-the-art reasoning model built for complex financial analysis and agentic workflows, without memorization bias.",
  features: [
    "Frontier-level reasoning",
    "Agentic workflows & tool orchestration",
    "No memorization bias",
    "Custom cutoff date",
  ],
  highlight: true,
  cta: "Recommended",
}
];

export const ModelsSection = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
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
            Pricing
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Simple, Transparent <span className="gradient-text">Token Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pay only for input tokens. Output tokens are free across all Pitinf models.
          </p>
        </motion.div>

        {/* Pricing Cards */}
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
                    model.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <model.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-2xl font-bold">{model.name}</h3>
                <p className="text-lg font-semibold">{model.price}</p>
                <p className="text-sm text-muted-foreground">{model.note}</p>
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
          All models support a configurable temporal cutoff date, adjustable per deployment or dataset.
        </motion.p>
      </div>
{/* API Code Example */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.4 }}
  className="mx-auto mt-16 max-w-3xl"
>
  <h3 className="mb-2 text-center text-lg font-semibold">Quick Start</h3>
  <p className="mb-4 text-center text-sm text-muted-foreground">
    Drop-in replacement for the OpenAI API — just change the base URL.
  </p>

  <div className="overflow-hidden rounded-xl border border-border bg-card">
    <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-3">
      <div className="h-3 w-3 rounded-full bg-destructive/50" />
      <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
      <div className="h-3 w-3 rounded-full bg-green-500/50" />
      <span className="ml-2 font-mono text-xs text-muted-foreground">
        example.py
      </span>
    </div>

    <pre className="overflow-x-auto p-4 font-mono text-sm">
      <code className="text-foreground">
        <span className="text-primary">from</span> openai <span className="text-primary">import</span> OpenAI
        {"\n\n"}
        <span className="text-muted-foreground"># OpenAI-compatible client</span>
        {"\n"}
        client = OpenAI(
        {"\n"}
        {"  "}api_key=<span className="text-accent">"your-api-key"</span>,
        {"\n"}
        {"  "}base_url=<span className="text-accent">"https://pitinference.com/API"</span>
        {"\n"}
        )
        {"\n\n"}
        <span className="text-muted-foreground"># Point-in-time inference</span>
        {"\n"}
        response = client.responses.create(
        {"\n"}
        {"  "}model=<span className="text-accent">"pitinf-medium"</span>,
        {"\n"}
        {"  "}input=<span className="text-accent">"Analyze AAPL earnings outlook as of Jan 15, 2024"</span>,
        {"\n"}
        )
      </code>
    </pre>
  </div>
</motion.div>

      
    </section>
  );
};
