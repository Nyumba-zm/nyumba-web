"use client";

import { useEffect, useState } from "react";

interface Node {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  color: string;
}

export function EcosystemNetwork() {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  const nodes: Node[] = [
    {
      id: "buyer",
      label: "Buyers",
      icon: "👤",
      x: 50,
      y: 15,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "seller",
      label: "Sellers",
      icon: "🏠",
      x: 50,
      y: 79,
      color: "from-green-400 to-green-600",
    },
    {
      id: "agent",
      label: "Agents",
      icon: "🤝",
      x: 10,
      y: 50,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "bank",
      label: "Banks",
      icon: "🏦",
      x: 90,
      y: 25,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "inspector",
      label: "Inspectors",
      icon: "🔍",
      x: 90,
      y: 75,
      color: "from-orange-400 to-orange-600",
    },
    {
      id: "nyumba",
      label: "Nyumba",
      icon: "⭐",
      x: 50,
      y: 50,
      color: "from-primary-400 to-primary-600",
    },
  ];

  const connections = [
    [0, 5], // Buyers to Nyumba
    [1, 5], // Sellers to Nyumba
    [2, 5], // Agents to Nyumba
    [3, 5], // Banks to Nyumba
    [4, 5], // Inspectors to Nyumba
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections((prev) => {
        if (prev.length >= connections.length) return [];
        return [...prev, prev.length];
      });
    }, 600);

    return () => clearInterval(interval);
  }, [connections.length]);

  return (
    <div className="relative w-full h-100 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl overflow-hidden border-2 border-primary-200">
      {/* SVG for connections - more reliable rendering */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {connections.map((conn, idx) => {
          const [start, end] = conn;
          const startNode = nodes[start];
          const endNode = nodes[end];
          const isActive = activeConnections.includes(idx);

          return (
            <line
              key={idx}
              x1={`${startNode.x}%`}
              y1={`${startNode.y}%`}
              x2={`${endNode.x}%`}
              y2={`${endNode.y}%`}
              stroke={isActive ? "#0d9488" : "#14b8a6"}
              strokeWidth={isActive ? "4" : "2"}
              className="transition-all duration-500"
              style={{
                opacity: isActive ? 1 : 0.5,
              }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className={`relative bg-gradient-to-br ${node.color} text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer animate-pulse-slow`}
            style={{
              animationDelay: `${idx * 0.2}s`,
            }}
          >
            <div className="text-2xl mb-1">{node.icon}</div>
            <div className="text-xs font-semibold">{node.label}</div>
          </div>
          {/* Ripple effect */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              animationDuration: "3s",
              animationDelay: `${idx * 0.3}s`,
              background: `linear-gradient(to bottom right, ${node.color
                .split(" ")[0]
                .replace("from-", "")}, ${node.color
                .split(" ")[1]
                .replace("to-", "")})`,
            }}
          />
        </div>
      ))}

      {/* Bottom badge */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border-2 border-primary-300">
          <div className="text-sm font-bold text-primary-700">
            One Platform • All Participants
          </div>
        </div>
      </div>
    </div>
  );
}
