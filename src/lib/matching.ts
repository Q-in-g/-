import { QUESTIONS } from "@/data/questions";
import { BOOKS } from "@/data/books";
import { ARCHETYPES } from "@/data/profiles";
import { DIMENSION_KEYS } from "@/data/dimensions";
import type {
  DimensionKey,
  PersonalityProfile,
  Recommendation,
} from "@/data/types";

// answers[i] = 第 i 题选中的选项下标（-1 表示未答）
export type AnswerMap = number[];

// 1. 累加各维度原始分
function accumulateRawScores(answers: AnswerMap): Record<DimensionKey, number> {
  const raw: Record<DimensionKey, number> = {
    introversion: 0,
    intuition: 0,
    feeling: 0,
    openness: 0,
    melancholy: 0,
    solitude: 0,
  };

  answers.forEach((optIdx, qIdx) => {
    if (optIdx < 0) return;
    const question = QUESTIONS[qIdx];
    if (!question) return;
    const option = question.options[optIdx];
    if (!option) return;
    for (const key of DIMENSION_KEYS) {
      raw[key] += option.scores[key] ?? 0;
    }
  });

  return raw;
}

// 2. 归一化到 0-1
// 每个维度的理论最大/最小分由题库决定，这里用实际累加分做线性映射到 [0,1]
function normalize(raw: Record<DimensionKey, number>): Record<DimensionKey, number> {
  // 计算每题每维度的最大可能贡献（取该题所有选项中的最大正分与最小负分）
  const range: Record<DimensionKey, { min: number; max: number }> = {
    introversion: { min: 0, max: 0 },
    intuition: { min: 0, max: 0 },
    feeling: { min: 0, max: 0 },
    openness: { min: 0, max: 0 },
    melancholy: { min: 0, max: 0 },
    solitude: { min: 0, max: 0 },
  };

  QUESTIONS.forEach((q) => {
    DIMENSION_KEYS.forEach((key) => {
      const values = q.options.map((o) => o.scores[key] ?? 0);
      const max = Math.max(...values);
      const min = Math.min(...values);
      // 取最大正贡献与最大负贡献
      range[key].max += max > 0 ? max : 0;
      range[key].min += min < 0 ? min : 0;
    });
  });

  const normalized: Record<DimensionKey, number> = {} as Record<DimensionKey, number>;
  for (const key of DIMENSION_KEYS) {
    const { min, max } = range[key];
    const span = max - min || 1;
    // 将 raw 线性映射到 0-1
    const clamped = Math.max(min, Math.min(max, raw[key]));
    normalized[key] = (clamped - min) / span;
  }

  return normalized;
}

// 3. 余弦相似度
function cosineSimilarity(a: Record<DimensionKey, number>, b: Record<DimensionKey, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const key of DIMENSION_KEYS) {
    dot += a[key] * b[key];
    normA += a[key] * a[key];
    normB += b[key] * b[key];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// 找到最贴近的原型
function matchArchetype(scores: Record<DimensionKey, number>) {
  let best = ARCHETYPES[0];
  let bestSim = -1;
  for (const arch of ARCHETYPES) {
    const sim = cosineSimilarity(scores, arch.profile);
    if (sim > bestSim) {
      bestSim = sim;
      best = arch;
    }
  }
  return { archetype: best, similarity: bestSim };
}

// 根据用户画像与书目画像，找出最契合的若干理由维度
function buildReason(scores: Record<DimensionKey, number>, book: typeof BOOKS[number]): string {
  // 找出用户与书画像都偏高的维度，作为契合理由
  const sharedHigh = DIMENSION_KEYS
    .map((key) => ({
      key,
      combined: scores[key] + book.matchProfile[key],
    }))
    .sort((a, b) => b.combined - a.combined)
    .slice(0, 2)
    .map((item) => item.key);

  if (sharedHigh.length === 0) return book.why;
  return book.why;
}

// 主入口：根据答案生成性格画像 + 推荐书单
export function evaluate(answers: AnswerMap): {
  profile: PersonalityProfile;
  recommendations: Recommendation[];
} {
  const raw = accumulateRawScores(answers);
  const scores = normalize(raw);

  const { archetype } = matchArchetype(scores);

  const profile: PersonalityProfile = {
    type: archetype.type,
    subtitle: archetype.subtitle,
    traits: archetype.traits,
    description: archetype.description,
    scores,
  };

  // 计算每本书的相似度并排序
  const ranked = BOOKS.map((book) => {
    const sim = cosineSimilarity(scores, book.matchProfile);
    return {
      book,
      similarity: sim,
      reason: buildReason(scores, book),
    };
  }).sort((a, b) => b.similarity - a.similarity);

  // 取 Top 5，并归一化展示分数到 0.6-0.99 区间以增强可读性
  const top = ranked.slice(0, 5);
  const maxSim = top[0]?.similarity ?? 1;
  const recommendations: Recommendation[] = top.map((r) => ({
    ...r,
    similarity: 0.6 + (r.similarity / (maxSim || 1)) * 0.39,
  }));

  return { profile, recommendations };
}
