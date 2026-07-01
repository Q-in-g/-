import { DIMENSIONS, DIMENSION_KEYS } from "@/data/dimensions";
import type { DimensionKey } from "@/data/types";

interface DimensionRadarProps {
  scores: Record<DimensionKey, number>; // 0-1
  size?: number;
}

// 六边形雷达图 · 纯 SVG 实现
export function DimensionRadar({ scores, size = 320 }: DimensionRadarProps) {
  const center = size / 2;
  const radius = size / 2 - 56; // 留出标签空间
  const n = DIMENSION_KEYS.length;
  const levels = 4; // 同心圈数

  // 计算各顶点角度（从正上方开始，顺时针）
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  // 顶点坐标
  const pointAt = (i: number, r: number) => ({
    x: center + Math.cos(angle(i)) * r,
    y: center + Math.sin(angle(i)) * r,
  });

  // 数据多边形点
  const dataPoints = DIMENSION_KEYS.map((key, i) => {
    const r = Math.max(0.04, Math.min(1, scores[key])) * radius;
    return pointAt(i, r);
  });
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full max-w-sm"
      aria-label="性格维度雷达图"
    >
      {/* 同心圈（六边形） */}
      {Array.from({ length: levels }).map((_, lvl) => {
        const r = (radius * (lvl + 1)) / levels;
        const pts = DIMENSION_KEYS.map((_, i) => {
          const p = pointAt(i, r);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={lvl}
            points={pts}
            fill="none"
            stroke="#1A1614"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        );
      })}

      {/* 轴线 */}
      {DIMENSION_KEYS.map((_, i) => {
        const p = pointAt(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="#1A1614"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        );
      })}

      {/* 数据多边形 */}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="#A8741A"
        fillOpacity={0.16}
        stroke="#A8741A"
        strokeWidth={1.5}
      />

      {/* 数据点 */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#A8741A" />
      ))}

      {/* 中心点 */}
      <circle cx={center} cy={center} r={2} fill="#8B2C2C" fillOpacity={0.6} />

      {/* 维度标签 */}
      {DIMENSIONS.map((dim, i) => {
        const labelR = radius + 28;
        const p = pointAt(i, labelR);
        const score = Math.round(scores[dim.key] * 100);
        return (
          <g key={dim.key}>
            <text
              x={p.x}
              y={p.y - 6}
              textAnchor="middle"
              className="font-chinese"
              fontSize={13}
              fill="#1A1614"
              fillOpacity={0.85}
            >
              {dim.name}
            </text>
            <text
              x={p.x}
              y={p.y + 10}
              textAnchor="middle"
              className="font-display"
              fontSize={12}
              fill="#A8741A"
              fontWeight={600}
            >
              {score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
