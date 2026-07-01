import type { DimensionMeta, DimensionKey } from "./types";

// 六大性格维度定义
export const DIMENSIONS: DimensionMeta[] = [
  {
    key: "introversion",
    name: "内省倾向",
    highLabel: "内向沉思",
    lowLabel: "外向行动",
    poem: "向内观照，于静默处听见潮汐",
  },
  {
    key: "intuition",
    name: "直觉感知",
    highLabel: "抽象想象",
    lowLabel: "具象现实",
    poem: "越过表象，捕捉事物背后的隐喻",
  },
  {
    key: "feeling",
    name: "情感导向",
    highLabel: "共情细腻",
    lowLabel: "理性分析",
    poem: "以心称量世界，于细微处动容",
  },
  {
    key: "openness",
    name: "开放求新",
    highLabel: "求新冒险",
    lowLabel: "稳重传统",
    poem: "拥抱未知，在陌生中辨识自己",
  },
  {
    key: "melancholy",
    name: "忧郁气质",
    highLabel: "沉郁深邃",
    lowLabel: "明朗乐观",
    poem: "于怅惘中品味存在的厚度",
  },
  {
    key: "solitude",
    name: "独处偏好",
    highLabel: "独处静思",
    lowLabel: "群聚社交",
    poem: "独行是另一种丰盈的对话",
  },
];

export const DIMENSION_KEYS: DimensionKey[] = DIMENSIONS.map((d) => d.key);

export const DIMENSION_MAP: Record<DimensionKey, DimensionMeta> = DIMENSIONS.reduce(
  (acc, d) => ({ ...acc, [d.key]: d }),
  {} as Record<DimensionKey, DimensionMeta>
);
