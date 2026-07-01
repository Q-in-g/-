import { Link } from "react-router-dom";
import { ArrowRight, Compass, HeartHandshake, Sparkles, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BookSpine } from "@/components/BookSpine";
import { Flourish, Quill, Seal, PageMark, CornerOrnament, Diamond } from "@/components/Ornaments";
import { BOOKS } from "@/data/books";

// 首页精选书目（取前 10 本做陈列）
const FEATURED = BOOKS.slice(0, 10);

export default function Home() {
  return (
    <Layout variant="full">
      {/* ════════ Hero · 序章 ════════ */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        {/* 角落装饰 */}
        <CornerOrnament className="absolute left-6 top-6 h-20 w-20" />
        <CornerOrnament className="absolute right-6 top-6 h-20 w-20 -scale-x-100" />
        <CornerOrnament className="absolute bottom-6 left-6 h-20 w-20 -scale-y-100" />
        <CornerOrnament className="absolute bottom-6 right-6 h-20 w-20 -scale-100" />

        {/* 漂浮羽毛笔 */}
        <Quill className="absolute left-[12%] top-[22%] h-16 w-16 animate-quill-sway opacity-30" />
        <Quill className="absolute right-[14%] bottom-[26%] h-12 w-12 animate-quill-sway opacity-20 [animation-delay:1.5s]" />

        <div className="container relative z-10 py-20 text-center">
          <div className="animate-fade-in mb-6 flex justify-center">
            <Seal text="魂" />
          </div>

          <p className="animate-fade-up chapter-num mb-6" style={{ animationDelay: "0.1s" }}>
            CHAPTER · I · 序章
          </p>

          <h1 className="animate-fade-up font-display text-display-xl font-light text-ink" style={{ animationDelay: "0.2s" }}>
            书魂
          </h1>
          <p
            className="animate-fade-up mt-2 font-quote text-xl tracking-widest2 text-gold sm:text-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            The Soul of Books
          </p>

          <div className="animate-fade-up mx-auto mt-10 max-w-2xl" style={{ animationDelay: "0.4s" }}>
            <Flourish className="mb-8" />
            <p className="drop-cap text-left font-chinese text-lg leading-loose text-ink-soft sm:text-xl">
              人海茫茫，书海亦茫茫。我们相信，每一颗心灵都有一本命中注定的书——它写于百年之前，却字字句句为你而来。书魂以十二问探你心象，以六维为你画像，于千万卷中，寻那本与你灵魂共振的读物。
            </p>
          </div>

          <div
            className="animate-fade-up mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.5s" }}
          >
            <Link to="/quiz" className="btn-gold group">
              <Sparkles className="h-4 w-4" />
              开启探心之旅
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#philosophy" className="btn-outline">
              何以荐书
            </a>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="h-5 w-5 animate-scroll-hint text-ink-muted" />
        </div>
      </section>

      {/* ════════ 理念阐述 ════════ */}
      <section id="philosophy" className="container py-24 sm:py-32">
        <div className="mb-16 text-center">
          <PageMark num="II" total="VI" />
          <h2 className="mt-6 font-display text-display-md font-light text-ink">
            何以性格，何以荐书
          </h2>
          <p className="mt-4 font-quote italic tracking-wide text-ink-muted">
            How personality shapes the way we read
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3">
          {PHILOSOPHY.map((item, i) => (
            <article
              key={item.title}
              className="animate-fade-up bg-paper p-10 transition-colors hover:bg-paper-deep/50"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="font-quote text-sm tracking-widest2 text-ink-muted">
                  {item.no}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 font-quote text-xs tracking-widest2 text-gold">
                {item.subtitle}
              </p>
              <div className="hairline-gold my-5 w-16" />
              <p className="font-chinese text-sm leading-loose text-ink-soft">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ════════ 精选书目 ════════ */}
      <section className="bg-paper-deep/40 py-24 sm:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <PageMark num="III" total="VI" />
            <h2 className="mt-6 font-display text-display-md font-light text-ink">
              书架一角
            </h2>
            <p className="mt-4 font-quote italic tracking-wide text-ink-muted">
              A glimpse of the library that awaits
            </p>
            <p className="mx-auto mt-5 max-w-xl font-chinese text-sm leading-loose text-ink-muted">
              这里陈列的，仅是书魂书库中的吉光片羽。完成探心之后，你将收到一份专属于你的、由性格画像匹配而生的书单。
            </p>
          </div>

          {/* 书架横梁 */}
          <div className="relative">
            <div className="mb-2 flex gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
              {FEATURED.map((book, i) => (
                <BookSpine key={book.id} book={book} index={i} variant="spine" />
              ))}
            </div>
            {/* 书架隔板 */}
            <div className="h-2 bg-gradient-to-b from-ink/20 to-ink/5 shadow-[0_4px_12px_-4px_rgba(26,22,20,0.3)]" />
            <div className="h-1 bg-ink/10" />
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            <Diamond />
            <p className="max-w-lg text-center font-chinese text-sm leading-loose text-ink-muted">
              「读什么书，其实就是想成为什么样的人。」
              <br />
              ——不如让我们，从认识自己开始。
            </p>
            <Link to="/quiz" className="btn-gold mt-4 group">
              <Compass className="h-4 w-4" />
              现在就去探心
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ 流程预览 ════════ */}
      <section className="container py-24 sm:py-32">
        <div className="mb-16 text-center">
          <PageMark num="IV" total="VI" />
          <h2 className="mt-6 font-display text-display-md font-light text-ink">
            三步之遥，与书相遇
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="animate-fade-up relative text-center"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-paper">
                <span className="font-display text-3xl font-light text-gold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 font-quote text-xs tracking-widest2 text-gold">
                {step.subtitle}
              </p>
              <p className="mx-auto mt-4 max-w-xs font-chinese text-sm leading-loose text-ink-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <Flourish className="mt-20" />

        {/* 末尾召唤 */}
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <HeartHandshake className="h-8 w-8 text-seal" strokeWidth={1.2} />
          <h3 className="font-display text-3xl font-light text-ink">
            你与那本书之间，只隔十二个问题
          </h3>
          <p className="max-w-xl font-chinese text-sm leading-loose text-ink-muted">
            放慢节奏，凭直觉作答。没有标准答案，只有更贴近你的那一本。
          </p>
          <Link to="/quiz" className="btn-gold mt-2 group">
            <Sparkles className="h-4 w-4" />
            开始探心
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

const PHILOSOPHY = [
  {
    no: "01",
    title: "性格即读法",
    subtitle: "PERSONALITY · READS",
    icon: Compass,
    text: "同一段文字，内向者读出独白，外向者读出对白；敏感者听见弦外之音，理性者拆解叙事结构。你是什么样的人，便遇见什么样的书。",
  },
  {
    no: "02",
    title: "六维画像匹配",
    subtitle: "SIX · DIMENSIONS",
    icon: Sparkles,
    text: "我们以内省、直觉、情感、开放、忧郁、独处六个维度为你的阅读气质建模，再以余弦相似度，从书库中寻那本与你画像最贴近的读物。",
  },
  {
    no: "03",
    title: "你的读后即你",
    subtitle: "YOU · ARE · WHAT · YOU · READ",
    icon: HeartHandshake,
    text: "所有答案仅存于你的浏览器，我们不经手、不上传、不分析。这是一场只属于你与书之间的私语。",
  },
];

const STEPS = [
  {
    title: "探心",
    subtitle: "QUIZ · 十二问",
    text: "围绕性情、起居、阅读、心绪四卷，凭直觉作答十二题，让心象自然浮现。",
  },
  {
    title: "画像",
    subtitle: "PROFILE · 六维度",
    text: "系统将你的答案归一为六个性格维度的画像，并为之命名一种属于你的灵魂原型。",
  },
  {
    title: "命中",
    subtitle: "MATCH · 五卷书",
    text: "依画像相似度，从书库中为你挑出五本最契合的文学作品，附上为你而写的契合之语。",
  },
];
