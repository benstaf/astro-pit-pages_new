import { useState } from "react";
import { motion } from "framer-motion";
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
 * Values taken directly from Table 1 of the paper:
 * "Look-Ahead-Bench: a Standardized Benchmark of Look-ahead Bias in PiT LLMs"
 *
 * Alpha is measured in percentage points (pp)
 * Alpha Decay = Alpha_P2 - Alpha_P1
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

type ViewMode = "decay" | "comparison";

export const BenchmarkChart = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("decay");

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
              In-Sample Alpha (P1):{" "}
              <span className="font-mono font-bold text-primary">
                {d.alphaP1.toFixed(2)} pp
              </span>
            </p>
            <p className="text-muted-foreground">
              Out-of-Sample Alpha (P2):{" "}
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
            Look-Ahead-Bench Results
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Measuring <span className="gradient-text">Alpha Decay</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Standard LLMs exhibit severe performance collapse when evaluated
            out-of-sample, while Point-in-Time (PiT) models maintain — and even
            improve — alpha as they scale.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mb-8 flex justify-center gap-2">
          <Button
            size="sm"
            variant={viewMode === "decay" ? "default" : "outline"}
            onClick={() => setViewMode("decay")}
          >
            Alpha Decay
          </Button>
          <Button
            size="sm"
            variant={viewMode === "comparison" ? "default" : "outline"}
            onClick={() => setViewMode("comparison")}
          >
            P1 vs P2 Alpha
          </Button>
        </div>

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
                <YAxis
                  domain={[-25, 5]}
                  tickFormatter={(v) => `${v} pp`}
                />
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
              <BarChart data={benchmarkData} margin={{ bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={90}
                />
                <YAxis tickFormatter={(v) => `${v} pp`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="alphaP1"
                  name="P1 Alpha"
                  fill="hsl(var(--primary))"
                />
                <Bar
                  dataKey="alphaP2"
                  name="P2 Alpha"
                  fill="hsl(var(--accent))"
                />
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
            Standard models suffer <strong>inverse scaling</strong>: larger
            models memorize more and collapse harder out-of-sample.
            <br />
            <br />
            PiT models remove future memory, allowing scale to translate into
            genuine reasoning and improved generalization.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
