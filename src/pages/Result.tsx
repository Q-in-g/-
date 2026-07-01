import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, RotateCcw, Sparkles, BookMarked, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BookSpine } from "@/components/BookSpine";
import { DimensionRadar } from "@/components/DimensionRadar";
import { Flourish, Seal, PageMark, Diamond, CornerOrnament } from "@/components/Ornaments";
import { useQuizStore } from "@/store/quiz";
import { useFavorites } from "@/store/favorites";
import { DIMENSIONS } from "@/data/dimensions";

export default function Result() {
  const navigate = useNavigate();
  const { profile, recommendations, reset } = useQuizStore();
  const favCount = useFavorites((s) => s.bookIds.length);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 未完成测评 → 引导
  if (!profile) {
    return (
      <Layout variant="framed">
        <div className="container max-w-2xl py-24 text-center">
          <Seal text="问" className="mx-auto mb-8" />
          <h1 className="font-display text-display-md font-light text-ink">
            尚未探心
          </h1>
          <p className="mt-4 font-quote italic tracking-wide text-ink-muted">
            The journey inward has not begun
          </p>
          <Flourish className="my-8" />
          <p className="mx-auto max-w-md font-chinese text-sm leading-loose text-ink-soft">
            你的性格画像尚未生成。请先完成十二问的探心之旅，再来此处领取为你而选的书单。
          </p>
          <Link to="/quiz" className="btn-gold mt-10 group">
            <Sparkles className="h-4 w-4" />
            开始探心
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Layout>
    );
  }

  const handleRetake = () => {
    reset();
    navigate("/quiz");
  };

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  // 维度从高到低排序，用于侧栏展示
  const sortedDims = [...DIMENSIONS].sort(
    (a, b) => profile.scores[b.key] - profile.scores[a.key]
  );

  return (
    <Layout variant="framed">
      <div className="container">
        {/* ════════ 性格画像 ════════ */}
        <section className="relative overflow-hidden py-12">
          <CornerOrnament className="absolute left-2 top-2 h-16 w-16 opacity-50" />
          <CornerOrnament className="absolute right-2 top-2 h-16 w-16 -scale-x-100 opacity-50" />

          <div className="text-center">
            <PageMark num="V" total="VI" />
            <p className="mt-6 animate-fade-in font-quote text-sm tracking-widest2 text-gold">
              YOUR · ARCHETYPE
            </p>
            <div className="animate-seal-stamp mt-6 inline-block">
              <Seal text="魂" />
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-display-lg font-light text-ink text-balance">
              {profile.type}
            </h1>
            <p className="animate-fade-up mt-2 font-quote text-lg tracking-widest2 text-ink-muted">
              {profile.subtitle}
            </p>
          </div>

          <Flourish className="my-10" />

          {/* 画像主体：左侧描述 + 右侧雷达 */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-fade-up">
              {/* 特质关键词 */}
              <div className="mb-6 flex flex-wrap gap-2">
                {profile.traits.map((t) => (
                  <span key={t} className="seal-tag">
                    {t}
                  </span>
                ))}
              </div>

              <p className="drop-cap font-chinese text-base leading-loose text-ink-soft sm:text-lg">
                {profile.description}
              </p>

              <div className="hairline-gold my-8 w-24" />

              <p className="font-quote text-sm italic tracking-wide text-ink-muted">
                这便是你灵魂此刻的形状。接下来，请收下五卷与这形状相契的书。
              </p>
            </div>

            {/* 雷达图 */}
            <div className="animate-scale-in flex justify-center">
              <div className="relative">
                <DimensionRadar scores={profile.scores} />
                <p className="mt-3 text-center font-quote text-xs tracking-widest2 text-ink-light">
                  六维心象 · SIX DIMENSIONS
                </p>
              </div>
            </div>
          </div>

          {/* 维度条 */}
          <div className="mt-14 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDims.map((dim, i) => {
              const score = profile.scores[dim.key];
              const isHigh = score >= 0.5;
              return (
                <div
                  key={dim.key}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="font-chinese text-sm font-medium text-ink">
                      {dim.name}
                    </span>
                    <span className="font-display text-sm font-semibold text-gold">
                      {Math.round(score * 100)}
                    </span>
                  </div>
                  <div className="relative h-1.5 bg-ink/10">
                    <div
                      className="absolute left-0 top-0 h-full bg-gold transition-all duration-700"
                      style={{ width: `${score * 100}%` }}
                    />
                  </div>
                  <p className="mt-1.5 font-quote text-[11px] tracking-wide text-ink-muted">
                    {isHigh ? dim.highLabel : dim.lowLabel}
                    <span className="mx-1.5 text-ink-light">·</span>
                    <span className="italic">{dim.poem}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════ 推荐书单 ════════ */}
        <section className="border-t border-ink/10 py-16">
          <div className="mb-12 text-center">
            <PageMark num="VI" total="VI" />
            <h2 className="mt-6 font-display text-display-md font-light text-ink">
              为你命中的五卷书
            </h2>
            <p className="mt-4 font-quote italic tracking-wide text-ink-muted">
              Five volumes, matched to your soul
            </p>
            <p className="mx-auto mt-5 max-w-xl font-chinese text-sm leading-loose text-ink-muted">
              依六维心象的余弦相似度，自书库中挑出与你的画像最贴近的五本。点开每一本，读一读它为何与你相契。
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((rec, i) => (
              <BookSpine
                key={rec.book.id}
                book={rec.book}
                similarity={rec.similarity}
                index={i}
                variant="card"
                expanded={expandedId === rec.book.id}
                onToggleExpand={() => toggleExpand(rec.book.id)}
              />
            ))}
          </div>
        </section>

        {/* ════════ 操作区 ════════ */}
        <section className="border-t border-ink/10 py-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <Diamond />
            <h3 className="font-display text-2xl font-light text-ink">
              读罢若有所动，或意犹未尽
            </h3>
            <p className="max-w-lg font-chinese text-sm leading-loose text-ink-muted">
              可重新探心以遇见新的可能，亦可在收藏夹中重温你心仪的书目
              {favCount > 0 && `（已收藏 ${favCount} 本）`}。
            </p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <button onClick={handleRetake} className="btn-outline group">
                <RotateCcw className="h-4 w-4" />
                重新探心
              </button>
              <Link to="/" className="btn-gold group">
                <BookMarked className="h-4 w-4" />
                回到序章
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 已收藏列表 */}
          {favCount > 0 && <FavoritesList />}
        </section>
      </div>
    </Layout>
  );
}

// 收藏书目折叠列表
function FavoritesList() {
  const [open, setOpen] = useState(false);
  const bookIds = useFavorites((s) => s.bookIds);
  const { recommendations } = useQuizStore();

  // 合并本次推荐 + 已有收藏去重
  const favBooks = [
    ...recommendations.map((r) => r.book),
  ].filter((b) => bookIds.includes(b.id));

  return (
    <div className="mt-10 border-t border-ink/10 pt-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="mx-auto flex w-full max-w-md items-center justify-center gap-2 font-chinese text-sm tracking-widest text-ink-muted transition-colors hover:text-gold"
      >
        <BookMarked className="h-4 w-4 text-gold" />
        查看我的收藏（{bookIds.length} 本）
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="animate-fade-in mt-6 space-y-3">
          {favBooks.length === 0 ? (
            <p className="text-center font-quote text-sm italic text-ink-light">
              收藏的书目来自其他时刻的探心，可在重新探心后在此重温。
            </p>
          ) : (
            favBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 border border-ink/10 bg-paper/50 p-4"
              >
                <div
                  className="h-14 w-10 shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${book.coverColor}, ${book.coverColor} 85%, rgba(0,0,0,0.35))`,
                  }}
                />
                <div>
                  <h4 className="font-display text-lg font-semibold text-ink">
                    {book.title}
                  </h4>
                  <p className="font-chinese text-xs text-ink-muted">{book.author}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
