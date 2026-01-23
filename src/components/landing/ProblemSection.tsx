import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Clock, Brain } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Temporal Leakage",
    description:
      "Standard LLMs are trained on internet-scale data that extends past backtest cutoffs. What looks like intelligence is often recall.",
  },
  {
    icon: TrendingUp,
    title: "Fake Alpha",
    description:
      "Models look brilliant in backtests because the test period overlaps with their training history. Performance collapses live.",
  },
  {
    icon: AlertTriangle,
    title: "Bigger Models, Bigger Losses",
    description:
      "Scaling increases memorization. Larger models often show higher backtest alpha—and faster out-of-sample decay.",
  },
  {
    icon: Clock,
    title: "Backtesting Contamination",
    description:
      "Chronological splits don’t matter in backtesting, if the LLM used already knows what happened next.",
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="absolute inset-0 glow-bg opacity-50" />

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
            The Problem
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Your LLM Has <span className="gradient-text">Look Ahead Bias</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Backtesting assumes a clean separation between past and future.
LLMs blur that line.
Their apparent performance often comes from memorization, not real forecasting ability.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group rounded-xl p-6 transition-all hover:border-primary/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 rounded-2xl border border-border bg-card/50 p-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Standard LLM */}
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Standard LLMs</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">DeepSeek-V3.2</span>
                  <span className="font-mono text-destructive">-21.77pp</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">Llama-3.1-70B</span>
                  <span className="font-mono text-destructive">-15.25pp</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">Llama-3.1-8B</span>
                  <span className="font-mono text-destructive">-17.23pp</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Alpha decay when moving from in-sample to out-of-sample data
              </p>
            </div>

            {/* PiT Models */}
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-accent">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">PiT-Inference</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">Pitinf-Large</span>
                  <span className="font-mono text-accent">+0.47pp</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">Pitinf-Medium</span>
                  <span className="font-mono text-accent">+1.23pp</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm">Pitinf-Small</span>
                  <span className="font-mono text-accent">+0.89pp</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Consistent performance across all evaluation periods
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
