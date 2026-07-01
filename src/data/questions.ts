import type { Question } from "./types";

// 12 道性格测评题，覆盖 MBTI 倾向、生活习惯、阅读情境、情感偏好四个维度
export const QUESTIONS: Question[] = [
  // ───────── 第一卷 · 性情本相（MBTI 倾向）─────────
  {
    id: 1,
    category: "mbti",
    categoryLabel: "性情本相",
    text: "周末的清晨，你更愿意怎样开启一天？",
    hint: "回想你最自在的那个清晨",
    options: [
      {
        label: "独自泡一杯茶，在窗边静坐，听风翻动书页",
        scores: { introversion: 3, solitude: 2, melancholy: 1 },
      },
      {
        label: "约三两好友，去喧闹的市集与咖啡馆",
        scores: { introversion: -3, solitude: -2, openness: 1 },
      },
      {
        label: "背起包去陌生的街巷漫游，遇见什么算什么",
        scores: { openness: 3, intuition: 1, introversion: -1 },
      },
      {
        label: "整理房间、列下周计划，让一切井然有序",
        scores: { openness: -2, feeling: -1, melancholy: -1 },
      },
    ],
  },
  {
    id: 2,
    category: "mbti",
    categoryLabel: "性情本相",
    text: "面对一个新想法，你首先想到的是？",
    hint: "第一反应往往最真实",
    options: [
      {
        label: "它背后的意义、可能延伸出的图景与隐喻",
        scores: { intuition: 3, openness: 2, introversion: 1 },
      },
      {
        label: "它是否可行、需要哪些具体步骤去落地",
        scores: { intuition: -3, openness: -1, feeling: -1 },
      },
      {
        label: "它会牵动谁的情绪、对他人意味着什么",
        scores: { feeling: 3, introversion: 1, melancholy: 1 },
      },
      {
        label: "它够不够新奇、值不值得为之冒险一试",
        scores: { openness: 3, intuition: 1, melancholy: -1 },
      },
    ],
  },
  {
    id: 3,
    category: "mbti",
    categoryLabel: "性情本相",
    text: "做一个重要决定时，你最终的依据是？",
    options: [
      {
        label: "内心的直觉与价值观，它是否符合我的本心",
        scores: { feeling: 3, intuition: 1, introversion: 1 },
      },
      {
        label: "客观的利弊分析，逻辑上最优的那一个",
        scores: { feeling: -3, melancholy: -1, openness: -1 },
      },
      {
        label: "想象未来几种可能走向，选择最有想象力的",
        scores: { intuition: 2, openness: 2, feeling: 1 },
      },
      {
        label: "回望过往经验，循最稳妥熟悉的路径前行",
        scores: { openness: -3, intuition: -1, melancholy: 1 },
      },
    ],
  },

  // ───────── 第二卷 · 日常起居（生活习惯）─────────
  {
    id: 4,
    category: "lifestyle",
    categoryLabel: "日常起居",
    text: "理想中的居所，窗外应是？",
    options: [
      {
        label: "无人的山林或海岸，四季自有声色",
        scores: { solitude: 3, introversion: 2, openness: 1, melancholy: 1 },
      },
      {
        label: "热闹的老城街区，烟火气与市井声不绝",
        scores: { solitude: -3, introversion: -2, openness: 1 },
      },
      {
        label: "异国的陌生街角，永远有未知的转角",
        scores: { openness: 3, intuition: 1, melancholy: -1 },
      },
      {
        label: "有年头的旧宅院，雨天听得见瓦上的雨声",
        scores: { melancholy: 3, introversion: 1, solitude: 1, openness: -1 },
      },
    ],
  },
  {
    id: 5,
    category: "lifestyle",
    categoryLabel: "日常起居",
    text: "一天之中，你精神最好的时刻是？",
    options: [
      {
        label: "深夜万籁俱寂，灯火可亲",
        scores: { solitude: 2, introversion: 2, melancholy: 2 },
      },
      {
        label: "破晓微明，世界尚未醒来",
        scores: { introversion: 2, melancholy: 1, openness: 1 },
      },
      {
        label: "午后阳光正暖，与人闲谈最是惬意",
        scores: { solitude: -2, introversion: -1, feeling: 1 },
      },
      {
        label: "黄昏将暗未暗，天边有晚霞",
        scores: { melancholy: 3, intuition: 1, feeling: 1 },
      },
    ],
  },
  {
    id: 6,
    category: "lifestyle",
    categoryLabel: "日常起居",
    text: "旅行时，你最在意的环节是？",
    options: [
      {
        label: "独自漫步，把陌生街道走成自己的心事",
        scores: { solitude: 3, introversion: 2, melancholy: 1 },
      },
      {
        label: "结伴同行，一路的笑声与争执都是回忆",
        scores: { solitude: -3, feeling: 1, openness: 1 },
      },
      {
        label: "寻找地图上没有的角落，遇见意料之外",
        scores: { openness: 3, intuition: 2, melancholy: -1 },
      },
      {
        label: "探访古迹与旧物，与逝去的时光对坐",
        scores: { melancholy: 3, intuition: 1, introversion: 1 },
      },
    ],
  },

  // ───────── 第三卷 · 书中天地（阅读情境）─────────
  {
    id: 7,
    category: "reading",
    categoryLabel: "书中天地",
    text: "翻开一本书，你最容易被什么留住？",
    hint: "那是你与文字之间真正的引力",
    options: [
      {
        label: "一句击中要害的独白，仿佛替我说出了心事",
        scores: { feeling: 3, introversion: 2, melancholy: 1 },
      },
      {
        label: "一个超出常理的意象，让我久久回味",
        scores: { intuition: 3, openness: 2, melancholy: 1 },
      },
      {
        label: "一段精密如钟表的结构，逻辑严丝合缝",
        scores: { feeling: -2, intuition: -1, openness: -1 },
      },
      {
        label: "一种前所未见的写法，原来书可以这样写",
        scores: { openness: 3, intuition: 2, feeling: 1 },
      },
    ],
  },
  {
    id: 8,
    category: "reading",
    categoryLabel: "书中天地",
    text: "你理想中的阅读场景是？",
    options: [
      {
        label: "雨夜孤灯，一壶茶，一本书，无人打扰",
        scores: { solitude: 3, introversion: 2, melancholy: 2 },
      },
      {
        label: "书店角落，偶尔抬头看人来人往",
        scores: { solitude: -1, feeling: 1, openness: 1 },
      },
      {
        label: "阳光下的公园长椅，读累了便合眼小憩",
        scores: { melancholy: -2, openness: 1, feeling: 1 },
      },
      {
        label: "远行的列车上，窗外风景与书中世界交织",
        scores: { openness: 3, intuition: 2, melancholy: 1 },
      },
    ],
  },
  {
    id: 9,
    category: "reading",
    categoryLabel: "书中天地",
    text: "合上一本好书，你最常有的感受是？",
    options: [
      {
        label: "怅然若失，仿佛刚与故人作别",
        scores: { melancholy: 3, feeling: 2, introversion: 1 },
      },
      {
        label: "胸中豁然，看世界的眼光都变了",
        scores: { openness: 2, intuition: 2, feeling: 1 },
      },
      {
        label: "想立刻与人分享，谈论到天明",
        scores: { solitude: -3, introversion: -2, feeling: 1 },
      },
      {
        label: "陷入长久的沉思，需要独处慢慢消化",
        scores: { introversion: 3, solitude: 2, melancholy: 1 },
      },
    ],
  },

  // ───────── 第四卷 · 心绪深处（情感偏好）─────────
  {
    id: 10,
    category: "emotion",
    categoryLabel: "心绪深处",
    text: "下列哪种情绪，你最能在其中感到「活着」？",
    options: [
      {
        label: "淡淡的怅惘，像秋日薄暮的光",
        scores: { melancholy: 3, introversion: 1, feeling: 1 },
      },
      {
        label: "雀跃的期待，像奔赴一场未知",
        scores: { openness: 3, melancholy: -2, intuition: 1 },
      },
      {
        label: "温柔的感动，为一朵花、一句问候",
        scores: { feeling: 3, melancholy: 1, introversion: 1 },
      },
      {
        label: "清澈的宁静，心如止水而无波澜",
        scores: { solitude: 2, introversion: 2, melancholy: -1 },
      },
    ],
  },
  {
    id: 11,
    category: "emotion",
    categoryLabel: "心绪深处",
    text: "面对人生的遗憾，你的态度更接近？",
    options: [
      {
        label: "细细品味它，遗憾本身也是一种美",
        scores: { melancholy: 3, feeling: 2, introversion: 1 },
      },
      {
        label: "收拾心情向前看，新路自有新风景",
        scores: { openness: 2, melancholy: -2, intuition: 1 },
      },
      {
        label: "与人倾谈，在共鸣里慢慢释怀",
        scores: { solitude: -2, feeling: 2, introversion: -1 },
      },
      {
        label: "独自走一段长路，让时间慢慢消化",
        scores: { solitude: 3, introversion: 2, melancholy: 1 },
      },
    ],
  },
  {
    id: 12,
    category: "emotion",
    categoryLabel: "心绪深处",
    text: "若能选择，你希望被人记住的方式是？",
    options: [
      {
        label: "一个安静而独特的灵魂，不必被太多人懂得",
        scores: { introversion: 3, solitude: 2, melancholy: 1, intuition: 1 },
      },
      {
        label: "曾给许多人带去温暖与力量",
        scores: { feeling: 3, solitude: -2, introversion: -1 },
      },
      {
        label: "做过几件勇敢的事，活得不拘一格",
        scores: { openness: 3, intuition: 1, melancholy: -1 },
      },
      {
        label: "留下一些值得反复重读的文字或作品",
        scores: { melancholy: 2, intuition: 2, introversion: 1, feeling: 1 },
      },
    ],
  },
];
