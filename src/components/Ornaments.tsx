import { cn } from "@/lib/utils";

// 羽毛笔装饰
export function Quill({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 50 C 22 40, 36 30, 52 12 C 48 22, 42 32, 30 42 L 22 44" />
      <path d="M22 44 C 28 42, 34 38, 40 32" opacity="0.6" />
      <path d="M14 50 L 12 56 L 18 52" />
      <path d="M48 14 L 54 10" opacity="0.5" />
    </svg>
  );
}

// 印章装饰
export function Seal({ text = "书", className }: { text?: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex h-14 w-14 items-center justify-center rounded-sm border-2 border-seal/80 bg-seal/5 font-chinese text-2xl font-semibold text-seal/90",
        className
      )}
      style={{
        boxShadow: "inset 0 0 0 2px rgba(139,44,44,0.15)",
        transform: "rotate(-8deg)",
      }}
      aria-hidden
    >
      {text}
    </div>
  );
}

// 章节分隔花饰
export function Flourish({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold/70", className)} aria-hidden>
      <span className="hairline-gold w-16 sm:w-24" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2 C 14 8, 16 10, 22 12 C 16 14, 14 16, 12 22 C 10 16, 8 14, 2 12 C 8 10, 10 8, 12 2 Z" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      <span className="hairline-gold w-16 sm:w-24" />
    </div>
  );
}

// 小型菱形分隔点
export function Diamond({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("h-2 w-2 text-gold/60", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 0 L12 6 L6 12 L0 6 Z" />
    </svg>
  );
}

// 页码式装饰
export function PageMark({ num, total }: { num: string; total: string }) {
  return (
    <div className="flex items-center gap-3 font-quote text-sm tracking-widest text-ink-muted" aria-hidden>
      <span className="hairline w-8" />
      <span>
        {num} <span className="text-ink-light">/</span> {total}
      </span>
      <span className="hairline w-8" />
    </div>
  );
}

// 角落装饰花纹
export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("text-gold/40", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M4 4 L 4 24 M 4 4 L 24 4" />
      <path d="M4 4 C 16 4, 20 8, 20 20 C 20 8, 24 4, 36 4" opacity="0.6" />
      <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}
