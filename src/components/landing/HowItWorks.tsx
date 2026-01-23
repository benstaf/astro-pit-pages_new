import { motion } from "framer-motion";
import { Database, Clock, Shield, LineChart } from "lucide-react";

const steps = [
  {
    icon: Clock,
    title: "Effective Cutoff",
    description: "Training data is capped at a use-case–defined cutoff date, so the model only practically sees what was available at that point in time.",
  },
  {
    icon: Database,
    title: "Clean Data Pipeline",
    description: "Rigorous data filtering removes any content that references future events, earnings, or price movements.",
  },
  {
    icon: Shield,
    title: "Bias Verification",
    description: "Models are validated against the Look-Ahead-Bench to ensure zero information leakage from the future.",
  },
  {
    icon: LineChart,
    title: "Stable Alpha",
    description: "Consistent performance across in-sample and out-of-sample periods proves genuine predictive capability.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-24 md:py-32">
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
            Methodology
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            How <span className="gradient-text">PiT-Inference</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            A clean, repeatable way to eliminate lookahead bias through strict temporal isolation.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mx-auto max-w-4xl">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className={`glass-card inline-block rounded-xl p-6 ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <step.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -bottom-6 font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="rounded-xl border border-border bg-card/50 p-6">
            <h4 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Temporal Boundary
            </h4>
            <div className="relative flex items-center justify-between">
              <div className="text-center">
                <div className="mb-2 h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Training Data</span>
                <p className="font-mono text-sm">Pre-2020</p>
              </div>
              <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-primary to-accent rounded" />
              <div className="text-center">
                <div className="mb-2 h-3 w-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Cutoff</span>
                <p className="font-mono text-sm font-bold text-accent">Jan 2020</p>
              </div>
              <div className="flex-1 mx-4 h-1 bg-muted rounded" />
              <div className="text-center">
                <div className="mb-2 h-3 w-3 rounded-full bg-muted" />
                <span className="text-xs text-muted-foreground">Evaluation</span>
                <p className="font-mono text-sm">Post-2020</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
