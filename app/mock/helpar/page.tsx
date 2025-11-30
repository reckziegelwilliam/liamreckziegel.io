// app/mock/helpar/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HELPAR – NFC Analytics (Concept UI)",
  description:
    "Conceptual HELPAR multi-tenant NFC analytics dashboard UI for portfolio case study.",
};

const kpis = [
  {
    label: "Total scans",
    value: "12,483",
    detail: "+18% vs last 30 days",
  },
  {
    label: "Unique items",
    value: "1,204",
    detail: "SKU-level tagged inventory",
  },
  {
    label: "Repeat scan rate",
    value: "27%",
    detail: "Users scanning > 1 time",
  },
  {
    label: "Avg. time-to-landing",
    value: "1.3s",
    detail: "P95 across all tenants",
  },
];

const tenants = [
  { name: "GreenFields Co.", scans: 4120, percent: 62, trend: "+12%" },
  { name: "Urban Harvest", scans: 3050, percent: 46, trend: "+5%" },
  { name: "Sunrise Farms", scans: 2100, percent: 32, trend: "-3%" },
  { name: "Other", scans: 3213, percent: 48, trend: "+2%" },
];

const campaigns = [
  {
    name: "Spring Launch · Bottle NFC",
    tenant: "GreenFields Co.",
    scans: "1,820",
    uniques: "1,230",
    ctr: "12.4%",
    route: "NFC → PDP → subs flow",
  },
  {
    name: "QR + NFC Pilot",
    tenant: "Urban Harvest",
    scans: "1,102",
    uniques: "890",
    ctr: "8.3%",
    route: "QR/NFC → story → shop",
  },
  {
    name: "Farmer's Market Rollout",
    tenant: "Sunrise Farms",
    scans: "786",
    uniques: "620",
    ctr: "9.7%",
    route: "NFC → recipe → email",
  },
];

const anomalies = [
  {
    label: "Spike in off-hours scans",
    impact: "Potential resellers",
    when: "Last 48h",
  },
  {
    label: "Underperforming QR-only campaign",
    impact: "Consider NFC upgrade",
    when: "Last 7d",
  },
];

export default function HelparMockPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15)_0,_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.12)_0,_transparent_55%)]" />

      <div className="relative w-full max-w-6xl rounded-3xl border border-slate-800/80 bg-slate-950/90 shadow-[0_40px_180px_rgba(15,23,42,1)] overflow-hidden">
        {/* Top nav */}
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-slate-950 font-black text-lg">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-slate-50">
                HELPAR
              </span>
              <span className="text-xs text-slate-400">
                Multi-tenant NFC engagement & packaging analytics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Tenant
              </span>
              <button className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-100">
                All brands
                <span className="text-slate-500 text-[10px]">▼</span>
              </button>
              <button className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-100">
                Dimension
                <span className="text-slate-400">Scans</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-900 text-slate-300 border border-slate-700 text-xs">
                ?
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-100">
                  LR
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-100">
                    Liam Reckziegel
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Admin · Studio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="px-8 py-6 space-y-6 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          {/* Page header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-slate-50">
                NFC engagement overview
              </h1>
              <p className="text-sm text-slate-400">
                Monitor scans, tenants, and campaigns across your packaging
                footprint. Segment by tenant, SKU, or geography in one place.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-100">
                Last 30 days <span className="text-slate-400 text-[10px]">▼</span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                Export snapshot
              </button>
            </div>
          </div>

          {/* KPI row */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/90 to-slate-950/90 px-4 py-4 flex flex-col gap-1"
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {kpi.label}
                </span>
                <span className="text-2xl font-semibold text-slate-50">
                  {kpi.value}
                </span>
                <span className="text-xs text-slate-400">{kpi.detail}</span>
              </div>
            ))}
          </section>

          {/* Charts + breakdown */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Chart area */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/90 px-5 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-slate-100">
                    Scans over time
                  </span>
                  <span className="text-xs text-slate-400">
                    Daily scans across all tenants · overlay repeat scans in
                    teal.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <button className="rounded-full bg-slate-100 text-slate-900 px-3 py-1 font-medium">
                    Total
                  </button>
                  <button className="rounded-full bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1">
                    By tenant
                  </button>
                  <button className="rounded-full bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1">
                    By geography
                  </button>
                </div>
              </div>

              {/* Concept chart: stacked bars + line hint */}
              <div className="mt-2 h-56 rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-4 flex flex-col justify-between">
                <div className="flex-1 flex items-end gap-2">
                  {Array.from({ length: 14 }).map((_, idx) => {
                    const base = 20 + idx * 3;
                    const repeat = 8 + Math.sin(idx / 1.7) * 6;
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col justify-end gap-1"
                      >
                        {/* total scans bar */}
                        <div
                          className="w-full rounded-t-full bg-slate-700"
                          style={{ height: `${base}px` }}
                        />
                        {/* repeat scans overlay */}
                        <div
                          className="w-full rounded-t-full bg-emerald-500/80"
                          style={{ height: `${repeat}px` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-slate-500">
                  <span>Day 1</span>
                  <span>Day 7</span>
                  <span>Day 14</span>
                  <span>Day 21</span>
                  <span>Day 30</span>
                </div>
              </div>
            </div>

            {/* Tenant breakdown & anomalies */}
            <div className="space-y-4">
              {/* Tenants */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-100">
                    Scans by tenant
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Last 30 days
                  </span>
                </div>
                <div className="space-y-3">
                  {tenants.map((tenant) => (
                    <div key={tenant.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-200">{tenant.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">
                            {tenant.scans.toLocaleString()} scans
                          </span>
                          <span
                            className={
                              tenant.trend.startsWith("-")
                                ? "text-rose-300"
                                : "text-emerald-300"
                            }
                          >
                            {tenant.trend}
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                          style={{ width: `${tenant.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anomalies / insights */}
              <div className="rounded-2xl border border-fuchsia-500/40 bg-slate-950/90 px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/15 text-[11px]">
                      ⚡
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      Anomaly insights
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Auto-detected · last 7 days
                  </span>
                </div>
                <div className="space-y-2">
                  {anomalies.map((a) => (
                    <div
                      key={a.label}
                      className="rounded-xl bg-slate-950/90 border border-slate-800 px-3 py-2.5 flex flex-col gap-0.5"
                    >
                      <span className="text-xs text-slate-100">
                        {a.label}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {a.impact}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {a.when} · surfaced by anomaly engine v1.2
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Campaign table */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/90 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-slate-100">
                  Campaign performance
                </span>
                <span className="text-xs text-slate-400">
                  Top NFC-enabled campaigns and their scan → landing journey.
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <button className="rounded-full bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1">
                  All tenants
                </button>
                <button className="rounded-full bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1">
                  Active only
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-950/95 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Campaign</th>
                    <th className="px-4 py-2 text-left">Tenant</th>
                    <th className="px-4 py-2 text-right">Scans</th>
                    <th className="px-4 py-2 text-right">Unique devices</th>
                    <th className="px-4 py-2 text-right">
                      CTR to landing page
                    </th>
                    <th className="px-4 py-2 text-right">Top route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                  {campaigns.map((row) => (
                    <tr key={row.name}>
                      <td className="px-4 py-3 text-slate-100">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {row.tenant}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-100">
                        {row.scans}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-100">
                        {row.uniques}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-300">
                        {row.ctr}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {row.route}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* Footer note for honesty */}
        <footer className="border-t border-slate-800 bg-slate-950/95 px-8 py-2">
          <p className="text-[10px] text-slate-500">
            Conceptual UI inspired by production work. Data and visuals shown
            here are illustrative, not actual customer data.
          </p>
        </footer>
      </div>
    </div>
  );
}

