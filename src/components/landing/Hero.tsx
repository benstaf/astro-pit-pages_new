import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden hero-gradient pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 glow-bg" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Introducing Look-Ahead-Bench</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          >
            Point-In-Time {" "}
            <span className="gradient-text">Inference</span>
            <br />
            for Financial AI
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Point-in-Time LLMs for financial AI. Eliminate lookahead bias and get 
            reliable predictions based on information that was actually available 
            at the time of decision.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Standard LLMs:</span>
              <span className="font-mono font-bold text-destructive">-21.77pp</span>
              <span className="text-muted-foreground">alpha decay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-muted-foreground">PiT Models:</span>
              <span className="font-mono font-bold text-accent">+0.47pp</span>
              <span className="text-muted-foreground">stable alpha</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group bg-primary px-8 hover:bg-primary/90">
              Get API Access
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group px-8">
              <Play className="mr-2 h-4 w-4" />
              See Benchmark Results
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 border-t border-border/50 pt-8"
          >
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              Built on rigorous academic research
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <span className="font-mono text-sm">Look-Ahead-Bench</span>
              <span className="text-border">|</span>
              <span className="font-mono text-sm">35+ Models Tested</span>
              <span className="text-border">|</span>
              <span className="font-mono text-sm">6 Financial Tasks</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
