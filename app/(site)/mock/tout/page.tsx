// app/mock/tout/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOUT – Trusted Feed (Concept UI)",
  description:
    "Conceptual TOUT core feed UI for portfolio case study. Invite-only, women-first social recommendations feed.",
};

const systemMetrics = [
  {
    label: "Crash-free sessions",
    value: "99.4%",
    hint: "Last 7 days · target ≥ 99%",
  },
  {
    label: "Avg. session length",
    value: "7m 32s",
    hint: "Cohort: Alpha · 10 members",
  },
  {
    label: "Invite conversion",
    value: "63%",
    hint: "Invites → joined this week",
  },
];

const feedSegments = ["For you", "From your circle", "Local", "Saved"] as const;

const feedItems = [
  {
    name: "Amelia R.",
    initials: "AR",
    role: "Founder · LA",
    context: "Recommends · Home & Cleaning",
    text: "Switched to refillable cleaning tablets this month. Cheaper than pods and way less plastic under my sink.",
    tags: ["#household", "#eco", "#refill"],
    comments: 18,
    likes: 72,
    shares: 4,
    trustScore: 9.3,
    cohort: "Founding circle",
  },
  {
    name: "Jasmin T.",
    initials: "JT",
    role: "Designer · NYC",
    context: "Recommends · Beauty",
    text: "This mineral sunscreen has no white cast on darker skin and survived 90°F subway platforms. Holy grail status.",
    tags: ["#spf", "#melanin-safe", "#summer"],
    comments: 25,
    likes: 104,
    shares: 9,
    trustScore: 9.7,
    cohort: "Beauty cohort · 24 members",
  },
  {
    name: "Lena M.",
    initials: "LM",
    role: "Engineer · SF",
    context: "Recommends · Finance",
    text: "Moved my emergency fund into a 4.5% HYSA with sub-accounts for rent, travel, and surprise vet bills. Zero mental math.",
    tags: ["#money", "#automation", "#calm"],
    comments: 11,
    likes: 44,
    shares: 3,
    trustScore: 8.9,
    cohort: "Money cohort · 18 members",
  },
];

export default function ToutMockPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-10">
      {/* Soft glow behind phone */}
      <div className="pointer-events-none absolute inset-x-0 top-24 h-72 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-fuchsia-500/10 blur-3xl opacity-80" />

      {/* Phone shell with gradient border */}
      <div className="relative">
        <div className="absolute -inset-[2px] rounded-[42px] bg-gradient-to-br from-emerald-500/70 via-sky-500/50 to-fuchsia-500/70 opacity-70" />
        <div className="relative w-[390px] h-[800px] rounded-[40px] bg-slate-950 border border-slate-800/80 shadow-[0_30px_130px_rgba(15,23,42,1)] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full shadow-inner" />
          <div className="h-10" />

          {/* App header */}
          <header className="px-5 pt-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-slate-950 text-xs font-black tracking-tight">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  TOUT
                </span>
                <span className="text-[11px] text-slate-400">
                  Invite-only women&apos;s recommendations
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-8 items-center gap-1 rounded-full bg-slate-900/80 px-3 text-[11px] text-slate-100 border border-slate-700/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live cohort
              </button>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-300 text-xs border border-slate-700/80">
                ⚙️
              </button>
            </div>
          </header>

          {/* Segment selector */}
          <div className="px-5 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-slate-50">
                  Trusted feed
                </h1>
                <p className="text-[11px] text-slate-400">
                  Ranked by trust graph, not virality.
                </p>
              </div>
              <div className="hidden text-[10px] text-slate-500 sm:block">
                <span className="font-medium text-emerald-300">
                  α10 · crash-free
                </span>{" "}
                · first cohort
              </div>
            </div>
            <div className="flex gap-2 text-[11px] overflow-x-auto">
              {feedSegments.map((segment, idx) => (
                <button
                  key={segment}
                  className={[
                    "whitespace-nowrap rounded-full px-3 py-1 border transition-colors",
                    idx === 0
                      ? "bg-slate-100 text-slate-900 border-slate-100 font-medium"
                      : "bg-slate-900/80 text-slate-100 border-slate-700 hover:border-slate-500",
                  ].join(" ")}
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>

          {/* System health / advanced metrics */}
          <section className="px-5 pb-2">
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/90 to-slate-950/90 px-3 py-2.5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px]">
                    📈
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300">
                    System health · Alpha
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Auto-snapshotted every 15 min
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {systemMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl bg-slate-950/70 border border-slate-800/90 px-2.5 py-2 flex flex-col gap-0.5"
                  >
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-50">
                      {metric.value}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {metric.hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="mx-5 mb-2 border-b border-slate-800/80" />

          {/* Feed */}
          <section className="px-5 pb-3 h-[540px] overflow-y-auto space-y-3 pr-1.5">
            {feedItems.map((item, idx) => (
              <article
                key={item.name + idx}
                className="rounded-3xl bg-slate-950/90 border border-slate-800/80 px-4 py-3 flex flex-col gap-2.5 shadow-[0_14px_40px_rgba(15,23,42,0.8)]"
              >
                {/* Author row */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-[11px] font-semibold text-slate-950">
                    {item.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-50">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.role}
                    </span>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-0.5">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Trust score
                    </span>
                    <div className="inline-flex items-baseline gap-1 text-[13px] font-semibold text-emerald-300">
                      <span>{item.trustScore.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-500">/10</span>
                    </div>
                  </div>
                </div>

                {/* Context & cohort */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    {item.context}
                  </p>
                  <span className="rounded-full bg-slate-900/80 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300">
                    {item.cohort}
                  </span>
                </div>

                {/* Body */}
                <p className="text-[13px] leading-snug text-slate-100">
                  {item.text}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Advanced context row */}
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Seen in 3 circles · 7 saves</span>
                  <span>Surfaced via trust graph v2.1</span>
                </div>

                {/* Stats row */}
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      💬 <span>{item.comments}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      ❤️ <span>{item.likes}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      🔁 <span>{item.shares}</span>
                    </span>
                  </div>
                  <span className="text-slate-500">2h ago · LA</span>
                </div>
              </article>
            ))}
          </section>

          {/* Bottom nav */}
          <nav className="absolute bottom-0 left-0 right-0 h-16 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
            <div className="flex h-full items-center justify-around text-[11px]">
              <button className="flex flex-col items-center gap-0.5 text-slate-50">
                <span>🏠</span>
                <span className="font-medium">Feed</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-slate-400">
                <span>🔍</span>
                <span>Discover</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-slate-400">
                <span>💬</span>
                <span>Messages</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 text-slate-400">
                <span>👤</span>
                <span>Profile</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

