// components/PostCover.tsx
import Image from "next/image";

type PostCoverProps = {
  title: string;
  subtitle?: string;
  label?: string;
};

export function PostCover({
  title,
  subtitle,
  label = "Playbook",
}: PostCoverProps) {
  return (
    <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 mb-8">
      {/* Base background image */}
      <Image
        src="/liam_rex_playbook.png"
        alt=""
        fill
        priority={false}
        className="object-cover"
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/10" />

      {/* Text overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-200 w-fit">
          <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400" />
          {label}
        </div>

        <div className="mt-6 space-y-3 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-slate-200/80">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300/80">
          <span>Author: Liam Reckziegel</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span>Playbook · deep dive</span>
        </div>
      </div>
    </div>
  );
}

