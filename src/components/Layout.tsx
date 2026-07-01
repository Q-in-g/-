import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Flourish } from "./Ornaments";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  variant?: "full" | "framed"; // full = 首页全屏式，framed = 内页带留白
}

export function Layout({ children, variant = "framed" }: LayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-paper">
              <BookOpen className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div className="leading-none">
              <p className="font-display text-xl font-semibold tracking-wide text-ink">
                书魂
              </p>
              <p className="font-quote text-[10px] tracking-widest2 text-ink-muted">
                SHUHUN
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-6">
            <NavLink to="/" active={pathname === "/"} label="序章" />
            <NavLink to="/quiz" active={pathname === "/quiz"} label="探心" />
            <NavLink to="/result" active={pathname === "/result"} label="命中" />
          </nav>
        </div>
      </header>

      {/* 主体 */}
      <main className={cn("flex-1", variant === "framed" && "py-12 sm:py-16")}>
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-ink/10 bg-paper-deep/40">
        <div className="container py-10 text-center">
          <Flourish className="mb-5" />
          <p className="font-quote text-base italic tracking-wide text-ink-muted">
            “每一本书都是一次相遇，每一次相遇都是一次自我辨认。”
          </p>
          <p className="mt-4 font-chinese text-xs tracking-widest text-ink-light">
            书魂 · 个性文学荐读 · 谨献给每一个向内寻书的灵魂
          </p>
          <p className="mt-1 font-quote text-[10px] tracking-widest2 text-ink-light">
            © MMXXVI · SHUHUN
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, active, label }: { to: string; active: boolean; label: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "relative px-1 py-1 font-chinese text-sm tracking-widest transition-colors",
        active ? "text-gold" : "text-ink-muted hover:text-ink"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300",
          active ? "w-5" : "w-0"
        )}
      />
    </Link>
  );
}
