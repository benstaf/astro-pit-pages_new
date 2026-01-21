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

const benchmarkData = [
  { name: "DeepSeek-V3", p1: 42.3, p2: 20.53, decay: -21.77, isPiT: false },
  { name: "GPT-4o", p1: 38.5, p2: 24.67, decay: -13.83, isPiT: false },
  { name: "Claude-3.5", p1: 35.2, p2: 22.1, decay: -13.1, isPiT: false },
  { name: "Llama-3-70B", p1: 40.1, p2: 20.54, decay: -19.56, isPiT: false },
  { name: "Qwen-2.5-72B", p1: 36.8, p2: 18.9, decay: -17.9, isPiT: false },
  { name: "Pitinf-Small", p1: 28.5, p2: 29.39, decay: 0.89, isPiT: true },
  { name: "Pitinf-Medium", p1: 31.2, p2: 32.43, decay: 1.23, isPiT: true },
  { name: "Pitinf-Large", p1: 33.8, p2: 34.27, decay: 0.47, isPiT: true },
];

type ViewMode = "decay" | "comparison";

export const BenchmarkChart = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("decay");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-lg">
          <p className="mb-2 font-semibold">{label}</p>
          {viewMode === "decay" ? (
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                Alpha Decay:{" "}
                <span
                  className={`font-mono font-bold ${
                    data.decay >= 0 ? "text-accent" : "text-destructive"
                  }`}
                >
                  {data.decay >= 0 ? "+" : ""}
                  {data.decay.toFixed(2)}pp
                </span>
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                In-Sample (P1):{" "}
                <span className="font-mono font-bold text-primary">{data.p1}%</span>
              </p>
              <p className="text-muted-foreground">
                Out-of-Sample (P2):{" "}
                <span className="font-mono font-bold text-accent">{data.p2}%</span>
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="benchmarks" className="relative py-24 md:py-32">
      <div className="absolute inset-0 glow-bg opacity-30" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Benchmark Results
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            The <span className="gradient-text">Look-Ahead-Bench</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of alpha decay across 35+ models. PiT models 
            maintain consistent performance while standard LLMs show significant degradation.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="mb-8 flex justify-center gap-2">
          <Button
            variant={viewMode === "decay" ? "default" : "outline"}
            onClick={() => setViewMode("decay")}
            size="sm"
          >
            Alpha Decay
          </Button>
          <Button
            variant={viewMode === "comparison" ? "default" : "outline"}
            onClick={() => setViewMode("comparison")}
            size="sm"
          >
            P1 vs P2 Comparison
          </Button>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-[400px] max-w-4xl rounded-2xl border border-border bg-card/50 p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "decay" ? (
              <BarChart
                data={benchmarkData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `${value}pp`}
                  domain={[-25, 5]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                <Bar dataKey="decay" radius={[4, 4, 0, 0]}>
                  {benchmarkData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isPiT ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                data={benchmarkData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="p1" fill="hsl(var(--primary))" name="In-Sample" radius={[4, 4, 0, 0]} />
                <Bar dataKey="p2" fill="hsl(var(--accent))" name="Out-of-Sample" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-destructive" />
            <span className="text-muted-foreground">Standard LLMs (negative = alpha decay)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-accent" />
            <span className="text-muted-foreground">PiT Models (stable performance)</span>
          </div>
        </div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 text-center"
        >
          <h3 className="mb-2 font-semibold text-primary">The Scaling Paradox</h3>
          <p className="text-sm text-muted-foreground">
            Larger models show <strong>greater alpha decay</strong>. DeepSeek-V3 (685B params) 
            loses 21.77pp while smaller models lose less—because larger models memorize 
            more future data during training.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
