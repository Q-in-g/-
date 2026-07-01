// 性格测评核心类型定义

// 性格维度键
export type DimensionKey =
  | "introversion" // 内省倾向
  | "intuition" // 直觉感知
  | "feeling" // 情感导向
  | "openness" // 开放求新
  | "melancholy" // 忧郁气质
  | "solitude"; // 独处偏好

// 问题分类
export type QuestionCategory = "mbti" | "lifestyle" | "reading" | "emotion";

// 选项
export interface QuestionOption {
  label: string;
  scores: Partial<Record<DimensionKey, number>>;
}

// 问题
export interface Question {
  id: number;
  category: QuestionCategory;
  categoryLabel: string;
  text: string;
  hint?: string;
  options: QuestionOption[];
}

// 性格维度元信息
export interface DimensionMeta {
  key: DimensionKey;
  name: string;
  highLabel: string; // 高分倾向描述
  lowLabel: string; // 低分倾向描述
  poem: string; // 诗意短句
}

// 书籍
export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  genre: string;
  origin: string; // 国别/语种
  excerpt: string; // 名句节选
  description: string; // 简介
  why: string; // 与性格契合的理由
  tags: string[];
  matchProfile: Record<DimensionKey, number>; // 0-1 倾向
  coverColor: string; // 书脊主色
  accentColor: string; // 书脊装饰色
}

// 性格画像
export interface PersonalityProfile {
  type: string; // 性格类型名称
  subtitle: string; // 副标题
  traits: string[]; // 关键词
  description: string; // 诗意描述
  scores: Record<DimensionKey, number>; // 归一化 0-1
}

// 推荐结果
export interface Recommendation {
  book: Book;
  similarity: number; // 0-1 匹配度
  reason: string; // 匹配理由
}
