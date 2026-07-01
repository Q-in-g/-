import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Flourish, Diamond } from "@/components/Ornaments";
import { QUESTIONS } from "@/data/questions";
import { useQuizStore } from "@/store/quiz";
import { cn } from "@/lib/utils";

const TOTAL = QUESTIONS.length;
// 四卷的起始下标与卷名
const VOLUMES = [
  { start: 0, end: 2, name: "性情本相", subtitle: "VOL. I · DISPOSITION" },
  { start: 3, end: 5, name: "日常起居", subtitle: "VOL. II · DAILY LIFE" },
  { start: 6, end: 8, name: "书中天地", subtitle: "VOL. III · IN BOOKS" },
  { start: 9, end: 11, name: "心绪深处", subtitle: "VOL. IV · INNER TIDES" },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { current, answers, select, next, prev, reset, compute } = useQuizStore();
  const question = QUESTIONS[current];
  const selected = answers[current];
  const [animKey, setAnimKey] = useState(0);

  // 题目切换时重置动画 key，触发进入动画
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [current]);

  const isLast = current === TOTAL - 1;
  const answeredCount = answers.filter((a) => a >= 0).length;
  const progress = ((current + 1) / TOTAL) * 100;
  const currentVolume = VOLUMES.find((v) => current >= v.start && current <= v.end)!;

  const handleSelect = (optionIdx: number) => {
    select(optionIdx);
    // 自动前进（最后一题除外，让用户主动提交）
    if (!isLast) {
      setTimeout(() => next(), 280);
    }
  };

  const handleFinish = () => {
    compute();
    navigate("/result");
  };

  const handleRestart = () => {
    reset();
  };

  return (
    <Layout variant="framed">
      <div className="container max-w-3xl">
        {/* 顶部进度区 */}
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-quote text-xs tracking-widest2 text-gold">
                {currentVolume.subtitle}
              </span>
              <Diamond className="h-1.5 w-1.5" />
              <span className="font-chinese text-xs tracking-widest text-ink-muted">
                {currentVolume.name}
              </span>
            </div>
            <span className="font-display text-sm text-ink-muted">
              <span className="text-2xl font-semibold text-gold">{current + 1}</span>
              <span className="mx-1 text-ink-light">/</span>
              <span>{TOTAL}</span>
            </span>
          </div>

          {/* 进度条 */}
          <div className="relative h-px bg-ink/15">
            <div
              className="absolute left-0 top-0 h-px bg-gold transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* 章节标记点 */}
            {VOLUMES.map((v) => (
              <span
                key={v.name}
                className={cn(
                  "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-all duration-300",
                  current >= v.start
                    ? "border-gold bg-gold"
                    : "border-ink/30 bg-paper"
                )}
                style={{ left: `${((v.start + 1) / TOTAL) * 100}%` }}
                title={v.name}
              />
            ))}
          </div>

          <p className="mt-2 text-right font-quote text-[10px] tracking-widest2 text-ink-light">
            已答 {answeredCount} / {TOTAL} 题
          </p>
        </div>

        {/* 问题卡片 */}
        <div key={animKey} className="animate-fade-up">
          {/* 题号装饰 */}
          <div className="mb-8 text-center">
            <p className="font-quote text-sm tracking-widest2 text-ink-light">
              Q. {String(current + 1).padStart(2, "0")}
            </p>
          </div>

          <h2 className="text-center font-display text-display-md font-light leading-tight text-ink text-balance">
            {question.text}
          </h2>

          {question.hint && (
            <p className="mt-4 text-center font-quote text-sm italic tracking-wide text-ink-muted">
              {question.hint}
            </p>
          )}

          <Flourish className="my-10" />

          {/* 选项 */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "group flex w-full items-center gap-4 border bg-paper/60 px-5 py-4 text-left transition-all duration-300 sm:px-7 sm:py-5",
                    isSelected
                      ? "border-gold bg-gold/5 shadow-gold"
                      : "border-ink/15 hover:border-gold/50 hover:bg-paper-deep/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-display text-sm transition-all",
                      isSelected
                        ? "border-gold bg-gold text-paper"
                        : "border-ink/25 text-ink-muted group-hover:border-gold/50 group-hover:text-gold"
                    )}
                  >
                    {isSelected ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-chinese text-base leading-relaxed transition-colors sm:text-lg",
                      isSelected ? "text-ink" : "text-ink-soft"
                    )}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 导航 */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={current === 0}
              className={cn(
                "inline-flex items-center gap-2 font-chinese text-sm tracking-widest transition-all",
                current === 0
                  ? "cursor-not-allowed text-ink-light/40"
                  : "text-ink-muted hover:text-gold"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              上一题
            </button>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 font-chinese text-xs tracking-wider text-ink-light transition-colors hover:text-seal"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              重新开始
            </button>

            {isLast ? (
              <button
                onClick={handleFinish}
                disabled={selected < 0}
                className={cn(
                  "btn-gold",
                  selected < 0 && "cursor-not-allowed opacity-40"
                )}
              >
                揭晓命中
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={next}
                disabled={selected < 0}
                className={cn(
                  "inline-flex items-center gap-2 font-chinese text-sm tracking-widest transition-all",
                  selected < 0
                    ? "cursor-not-allowed text-ink-light/40"
                    : "text-ink-muted hover:text-gold"
                )}
              >
                下一题
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <p className="mt-12 text-center font-quote text-xs italic tracking-wide text-ink-light">
          放慢节奏，凭直觉作答 · 没有标准答案，只有更贴近你的那一本
        </p>
      </div>
    </Layout>
  );
}
