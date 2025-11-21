"use client";

import { useEffect, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  duration?: number;
}

export function AnimatedStats({ stats, duration = 2000 }: AnimatedStatsProps) {
  const [counts, setCounts] = useState<number[]>(
    stats.map((stat) => stat.value)
  );

  useEffect(() => {
    setCounts(stats.map(() => 0));

    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts(
        stats.map((stat) => {
          const current = Math.floor(stat.value * easeOutQuad(progress));
          return current;
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(stats.map((stat) => stat.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats, duration]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition"
        >
          <div className="text-4xl font-bold">
            {stat.prefix}
            {counts[idx].toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-black mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function easeOutQuad(t: number): number {
  return t * (2 - t);
}
