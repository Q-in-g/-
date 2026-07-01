import type { DimensionKey } from "./types";

// 性格原型 · 每个原型有理想化的维度画像，与用户归一化画像匹配以确定类型名与诗意描述
export interface Archetype {
  id: string;
  type: string; // 类型名
  subtitle: string; // 副标题
  traits: string[]; // 关键词
  description: string; // 诗意描述
  profile: Record<DimensionKey, number>; // 理想画像 0-1
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "wanderer",
    type: "沉思的漫游者",
    subtitle: "The Contemplative Wanderer",
    traits: ["内省", "求新", "想象", "独行"],
    description:
      "你向内走得深，向外走得远。在独处中补给，在陌生中辨认自己；对世界的隐喻格外敏感，灵魂始终在路上。",
    profile: { introversion: 0.85, intuition: 0.9, feeling: 0.65, openness: 0.9, melancholy: 0.65, solitude: 0.85 },
  },
  {
    id: "night-watch",
    type: "寂夜的守望者",
    subtitle: "The Night Watcher",
    traits: ["孤寂", "深邃", "怅惘", "夜思"],
    description:
      "你在深夜最为清醒。万籁俱寂时，你与自己的影子对坐，于怅惘中品味存在的厚度，把孤独酿成一种丰盈。",
    profile: { introversion: 0.9, intuition: 0.75, feeling: 0.7, openness: 0.55, melancholy: 0.9, solitude: 0.95 },
  },
  {
    id: "empath",
    type: "温柔的共情者",
    subtitle: "The Gentle Empath",
    traits: ["共情", "细腻", "温情", "敏感"],
    description:
      "你以心称量世界。他人的悲喜在你心中都有回响，你珍视细微的善意，在温柔中保有对生活最深的依恋。",
    profile: { introversion: 0.7, intuition: 0.7, feeling: 0.95, openness: 0.55, melancholy: 0.65, solitude: 0.55 },
  },
  {
    id: "moor-soul",
    type: "荒原上的孤魂",
    subtitle: "The Soul on the Moor",
    traits: ["炽烈", "孤绝", "深情", "苍凉"],
    description:
      "你内里有不轻易示人的风暴。深情与孤绝在你身上并存，如荒原上的呼啸，炽烈而苍凉，只为懂你的人燃烧。",
    profile: { introversion: 0.7, intuition: 0.8, feeling: 0.9, openness: 0.6, melancholy: 0.9, solitude: 0.75 },
  },
  {
    id: "seeker",
    type: "永恒的追寻者",
    subtitle: "The Eternal Seeker",
    traits: ["求索", "想象", "超脱", "灵性"],
    description:
      "你不满足于表象，总在追问背后的意义。在思想与意象的旷野里独行，以一颗求道之心，向更深处跋涉。",
    profile: { introversion: 0.85, intuition: 0.95, feeling: 0.7, openness: 0.85, melancholy: 0.6, solitude: 0.85 },
  },
  {
    id: "still-water",
    type: "静水流深的行者",
    subtitle: "Still Waters Run Deep",
    traits: ["沉静", "坚韧", "内敛", "笃定"],
    description:
      "你外表沉静，内里自有江河。不喧哗，不张扬，以笃定的步调独行，在简朴中抵达属于自己的辽阔。",
    profile: { introversion: 0.8, intuition: 0.5, feeling: 0.6, openness: 0.4, melancholy: 0.55, solitude: 0.9 },
  },
  {
    id: "idealist",
    type: "烈焰中的理想者",
    subtitle: "The Idealist in Flame",
    traits: ["热忱", "求新", "想象", "笃信"],
    description:
      "你为某种信念而燃烧。情感丰沛又勇于冒险，相信世界可以因想象而不同，愿为心中光亮奔赴未知。",
    profile: { introversion: 0.55, intuition: 0.9, feeling: 0.9, openness: 0.9, melancholy: 0.5, solitude: 0.45 },
  },
  {
    id: "twilight-gatherer",
    type: "暮色里的拾光人",
    subtitle: "The Light Gatherer at Twilight",
    traits: ["怅惘", "细腻", "诗意", "怀旧"],
    description:
      "你于黄昏的微光中拾取人世的碎金。对流逝格外敏感，在怅惘里看见美，把每一缕暮色都收进心扉。",
    profile: { introversion: 0.75, intuition: 0.85, feeling: 0.85, openness: 0.6, melancholy: 0.9, solitude: 0.7 },
  },
  {
    id: "wild-philosopher",
    type: "旷野独语的哲人",
    subtitle: "The Soliloquist in the Wild",
    traits: ["孤高", "思辨", "超然", "冷峻"],
    description:
      "你在精神的旷野独自言说。不被世俗共鸣所动，以冷峻的目光丈量价值，于孤独中铸就属于自己的法则。",
    profile: { introversion: 0.9, intuition: 0.9, feeling: 0.4, openness: 0.85, melancholy: 0.7, solitude: 0.9 },
  },
  {
    id: "sober-guest",
    type: "繁花下的清醒客",
    subtitle: "The Sober Guest beneath Blossoms",
    traits: ["清醒", "明朗", "想象", "通透"],
    description:
      "你于繁华中保持清澈。不为怅惘所困，以通透的眼光看待人世，在好奇与想象中，把日子过得轻盈而辽阔。",
    profile: { introversion: 0.6, intuition: 0.85, feeling: 0.6, openness: 0.85, melancholy: 0.35, solitude: 0.5 },
  },
];
