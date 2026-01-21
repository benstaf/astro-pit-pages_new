import { motion } from "framer-motion";
import { FileText, Github, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const authors = [
  { name: "Research Team", role: "PiT-Inference" },
];

export const ResearchSection = () => {
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
            Research
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Built on <span className="gradient-text">Rigorous Science</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PiT-Inference is backed by peer-reviewed research and the comprehensive 
            Look-Ahead-Bench benchmark.
          </p>
        </motion.div>

        {/* Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold">
                  Look-Ahead-Bench: Detecting LLMs' Illicit Use of Future
                  Information in Financial Text Understanding
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  A comprehensive benchmark for detecting and quantifying lookahead bias 
                  in large language models applied to financial tasks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    6 Financial Tasks
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    35+ Models Tested
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    Open Source
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Read Paper
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-4"
        >
          {[
            { value: "35+", label: "Models Evaluated" },
            { value: "6", label: "Financial Tasks" },
            { value: "21.77pp", label: "Max Alpha Decay" },
            { value: "0.47pp", label: "PiT Stability" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/50 p-6 text-center"
            >
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Authors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              Developed by leading researchers in financial AI and machine learning
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
