import { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";

/**
 * Look-Ahead-Bench — exact results from the paper
 * Alpha values are in percentage points (pp)
 */

const benchmarkData = [
  {
    name: "Llama 3.1 8B",
    alphaP1: 13.81,
    alphaP2: -3.42,
    decay: -17.23,
    isPiT: false,
  },
  {
    name: "Llama 3.1 70B",
    alphaP1: 19.27,
    alphaP2: 4.02,
    decay: -15.25,
    isPiT: false,
  },
  {
    name: "DeepSeek 3.2",
    alphaP1: 20.73,
    alphaP2: -1.04,
    decay: -21.77,
    isPiT: false,
  },
  {
    name: "Pitinf-Small",
    alphaP1: -0.25,
    alphaP2: 0.06,
    decay: 0.31,
    isPiT: true,
  },
  {
    name: "Pitinf-Medium",
    alphaP1: 2.44,
    alphaP2: 3.29,
    decay: 0.85,
    isPiT: true,
  },
  {
    name: "Pitinf-Large",
    alphaP1: 6.02,
    alphaP2: 7.32,
    decay: 1.30,
    isPiT: true,
  },
];

type ViewMode = "decay" | "collapse";

export const BenchmarkChart = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("decay");

  /**
   * progress = 0 → P1 (in-sample)
   * progress = 1 → P2 (out-of-sample)
   */
  const progress = useMotionValue(0);

  useEffect(() => {
    animate(progress, viewMode === "collapse" ? 1 : 0, {
      duration: 1.6, // slower = more cinematic for landing page
      ease: "easeInOut",
    });
  }, [viewMode, progress]);

  /**
   * Interpolated alpha for animated collapse
   */
  const animatedData = benchmarkData.map((d) => {
    const p = progress.get();
    return {
      ...d,
      animatedAlpha: d.alphaP1 + p * (d.alphaP2 - d.alphaP1),
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;

    return (
      <div className="rounded-lg border border-border bg-card p-4 shadow-lg">
        <p className="mb-2 font-semibold">{label}</p>

        {viewMode === "decay" ? (
          <p className="text-sm text-muted-foreground">
            Alpha Decay:{" "}
            <span
              className={`font-mono font-bold ${
                d.decay >= 0 ? "text-accent" : "text-destructive"
              }`}
            >
              {d.decay > 0 ? "+" : ""}
              {d.decay.toFixed(2)} pp
            </span>
          </p>
        ) : (
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              In-Sample (P1):{" "}
              <span className="font-mono font-bold text-primary">
                {d.alphaP1.toFixed(2)} pp
              </span>
            </p>
            <p className="text-muted-foreground">
              Out-of-Sample (P2):{" "}
              <span className="font-mono font-bold text-accent">
                {d.alphaP2.toFixed(2)} pp
              </span>
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="benchmarks" className="relative py-24 md:py-32">
      <div className="absolute inset-0 glow-bg opacity-30" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Look-Ahead-Bench
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            When Models Leave{" "}
            <span className="gradient-text">Memorized History</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Models that look brilliant in backtests can collapse when markets
            move beyond their training data. This chart shows why.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mb-2 flex justify-center gap-2">
          <Button
            size="sm"
            variant={viewMode === "decay" ? "default" : "outline"}
            onClick={() => setViewMode("decay")}
          >
            Why Standard LLMs Fail
          </Button>
          <Button
            size="sm"
            variant={viewMode === "collapse" ? "default" : "outline"}
            onClick={() => setViewMode("collapse")}
          >
            What Happens After Cutoff
          </Button>
        </div>

        {/* Guided narration */}
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Watch what happens when models move from memorized history to unseen
          markets.
        </p>

        {/* Timeline */}
        {viewMode === "collapse" && (
          <div className="mx-auto mb-2 flex max-w-4xl justify-between text-xs text-muted-foreground">
            <span>P1 — 2021 (In-Sample)</span>
            <span>P2 — 2024 (Out-of-Sample)</span>
          </div>
        )}

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-[420px] max-w-4xl rounded-2xl border border-border bg-card/50 p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "decay" ? (
              <BarChart data={benchmarkData} margin={{ bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={90}
                />
                <YAxis domain={[-25, 5]} tickFormatter={(v) => `${v} pp`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} strokeDasharray="3 3" />
                <Bar dataKey="decay" radius={[4, 4, 0, 0]}>
                  {benchmarkData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.isPiT
                          ? "hsl(var(--accent))"
                          : "hsl(var(--destructive))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={animatedData} margin={{ bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={90}
                />
                <YAxis tickFormatter={(v) => `${v} pp`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} strokeDasharray="3 3" />
                <Bar dataKey="animatedAlpha" radius={[4, 4, 0, 0]}>
                  {animatedData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.isPiT
                          ? "hsl(var(--accent))"
                          : "hsl(var(--destructive))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        {/* Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 text-center"
        >
          <h3 className="mb-2 font-semibold text-primary">
            The Scaling Paradox
          </h3>
          <p className="text-sm text-muted-foreground">
            Scaling standard models amplifies memorization — and magnifies
            failure when regimes change.
            <br />
            <br />
            Point-in-Time models remove future knowledge, allowing scale to
            improve real reasoning instead.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
