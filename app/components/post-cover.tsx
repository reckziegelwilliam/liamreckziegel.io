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
    <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-slate-950 mb-8">
      {/* Base background image */}
      <Image
        src="/liam_rex_playbook.png"
        alt=""
        fill
        priority={false}
        className="object-cover"
      />

      {/* Gradient overlay - darker on left, lighter on right for text */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/10" />

      {/* Content Grid - Split into two halves */}
      <div className="relative z-10 grid grid-cols-2 h-full">
        {/* Left Side - Label Badge */}
        <div className="flex items-start p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400" />
            {label}
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 bg-white/95 dark:bg-slate-950/95">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 md:mb-4">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300 mb-4 md:mb-6">
              {subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 mt-auto">
            <span>Author: Liam Reckziegel</span>
            <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>{label} · deep dive</span>
          </div>
        </div>
      </div>
    </div>
  );
}

