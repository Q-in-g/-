import { Bookmark, Plus, Check } from "lucide-react";
import type { Book } from "@/data/types";
import { useFavorites } from "@/store/favorites";
import { cn } from "@/lib/utils";

// 书脊式卡片：用于首页精选书目与结果页书单
interface BookSpineProps {
  book: Book;
  similarity?: number; // 0-1，结果页传入显示匹配度
  index?: number;
  expanded?: boolean;
  onToggleExpand?: () => void;
  variant?: "spine" | "card";
}

export function BookSpine({
  book,
  similarity,
  index = 0,
  expanded = false,
  onToggleExpand,
  variant = "spine",
}: BookSpineProps) {
  const isFav = useFavorites((s) => s.bookIds.includes(book.id));
  const toggle = useFavorites((s) => s.toggle);

  if (variant === "spine") {
    // 竖向书脊，用于首页横向陈列
    return (
      <article
        className="group relative w-24 shrink-0 cursor-default transition-transform duration-500 hover:-translate-y-3 sm:w-28"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div
          className="relative flex h-72 flex-col justify-between px-3 py-6 text-paper shadow-spine transition-shadow duration-500 group-hover:shadow-spine-hover sm:h-80"
          style={{
            background: `linear-gradient(to right, ${book.coverColor}, ${book.coverColor} 88%, rgba(0,0,0,0.35))`,
          }}
        >
          {/* 顶部装饰条 */}
          <div
            className="mx-auto h-px w-10"
            style={{ background: book.accentColor, opacity: 0.7 }}
          />
          {/* 竖排书名 */}
          <h3
            className="writing-vertical mx-auto font-chinese text-lg font-medium leading-tight tracking-wide"
            style={{ color: book.accentColor }}
          >
            {book.title}
          </h3>
          <p
            className="text-center font-quote text-[10px] tracking-widest2 opacity-80"
            style={{ color: book.accentColor }}
          >
            {book.author}
          </p>
          <div
            className="mx-auto h-px w-10"
            style={{ background: book.accentColor, opacity: 0.7 }}
          />
        </div>
      </article>
    );
  }

  // card 变体：结果页横向卡片
  return (
    <article
      className="animate-fade-up overflow-hidden border border-ink/10 bg-paper/60 shadow-page transition-all duration-500 hover:border-gold/40 hover:shadow-gold"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-0">
        {/* 书脊色块 */}
        <div
          className="relative w-20 shrink-0 sm:w-28"
          style={{
            background: `linear-gradient(to right, ${book.coverColor}, ${book.coverColor} 85%, rgba(0,0,0,0.4))`,
          }}
        >
          <div className="flex h-full min-h-[180px] flex-col items-center justify-between px-3 py-6">
            <div className="h-px w-8" style={{ background: book.accentColor, opacity: 0.7 }} />
            <h3
              className="writing-vertical font-chinese text-base font-medium leading-tight sm:text-lg"
              style={{ color: book.accentColor }}
            >
              {book.title}
            </h3>
            <p
              className="writing-vertical font-quote text-[9px] tracking-widest2 opacity-80"
              style={{ color: book.accentColor }}
            >
              {book.author}
            </p>
            <div className="h-px w-8" style={{ background: book.accentColor, opacity: 0.7 }} />
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-quote text-xs tracking-widest2 text-gold">
                  {book.genre}
                </span>
                <span className="text-ink-light">·</span>
                <span className="font-chinese text-xs text-ink-muted">{book.origin}</span>
                <span className="text-ink-light">·</span>
                <span className="font-chinese text-xs text-ink-muted">{book.year}</span>
              </div>
              <h4 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {book.title}
              </h4>
              <p className="mt-0.5 font-chinese text-sm text-ink-muted">{book.author}</p>
            </div>

            {similarity !== undefined && (
              <div className="shrink-0 text-right">
                <div className="font-display text-3xl font-semibold text-gold">
                  {Math.round(similarity * 100)}
                  <span className="text-base">%</span>
                </div>
                <p className="font-quote text-[10px] tracking-widest2 text-ink-muted">
                  MATCH
                </p>
              </div>
            )}
          </div>

          {/* 标签 */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {book.tags.map((t) => (
              <span
                key={t}
                className="border border-ink/15 px-2 py-0.5 font-chinese text-xs text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 节选引文 */}
          <blockquote className="mt-4 border-l-2 border-gold/40 pl-4">
            <p className="font-quote text-base italic leading-relaxed text-ink-soft">
              {book.excerpt}
            </p>
          </blockquote>

          {/* 展开详情 */}
          {expanded && (
            <div className="animate-fade-in mt-4 space-y-3">
              <p className="font-chinese text-sm leading-relaxed text-ink-soft">
                {book.description}
              </p>
              <div className="border-t border-ink/10 pt-3">
                <p className="font-quote text-xs tracking-widest2 text-gold">
                  为何与你契合
                </p>
                <p className="mt-1 font-chinese text-sm leading-relaxed text-ink-muted">
                  {book.why}
                </p>
              </div>
            </div>
          )}

          {/* 操作 */}
          <div className="mt-4 flex items-center gap-3">
            {onToggleExpand && (
              <button
                onClick={onToggleExpand}
                className="font-chinese text-xs tracking-wider text-gold transition-colors hover:text-gold-dark"
              >
                {expanded ? "收起" : "展开详情"}
              </button>
            )}
            <button
              onClick={() => toggle(book.id)}
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 border px-3 py-1.5 font-chinese text-xs tracking-wider transition-all",
                isFav
                  ? "border-gold/40 bg-gold/10 text-gold-dark"
                  : "border-ink/20 text-ink-muted hover:border-gold hover:text-gold"
              )}
            >
              {isFav ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              {isFav ? "已收藏" : "收藏"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// 紧凑的「加入收藏」按钮（首页用）
export function FavoriteMiniButton({ bookId }: { bookId: string }) {
  const isFav = useFavorites((s) => s.bookIds.includes(bookId));
  const toggle = useFavorites((s) => s.toggle);
  return (
    <button
      onClick={() => toggle(bookId)}
      aria-label={isFav ? "取消收藏" : "收藏"}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all",
        isFav
          ? "border-gold bg-gold/10 text-gold-dark"
          : "border-ink/20 text-ink-muted hover:border-gold hover:text-gold"
      )}
    >
      {isFav ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
    </button>
  );
}
