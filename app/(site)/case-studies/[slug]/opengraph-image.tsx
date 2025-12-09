import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { caseStudies } from "@/app/data/case-studies";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export default async function Image(
  req: NextRequest,
  { params }: { params: Params },
) {
  const { slug } = params;

  // Find the case study from the data
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    // Return a default/fallback image
    return new ImageResponse(
      (
        <div
          style={{
            width: size.width,
            height: size.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
            color: "white",
            fontSize: 48,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Case Study Not Found
        </div>
      ),
      size,
    );
  }

  // Load the base image as ArrayBuffer
  const baseUrl = new URL(
    "../../../public/liam_rex_banner.png",
    import.meta.url,
  );
  const baseImageData = await fetch(baseUrl).then((res) => res.arrayBuffer());

  // Determine accent color based on case study type
  const accentColors = {
    'founding-engineer': '#00D9FF',
    'rescue': '#FFB84D',
    'studio': '#10B981',
  };
  const accentColor = accentColors[caseStudy.type] || '#00D9FF';

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          position: "relative",
          display: "flex",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        }}
      >
        {/* Base image */}
        <img
          // @ts-ignore - ImageResponse handles ArrayBuffer differently
          src={baseImageData}
          alt=""
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
          }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.8), rgba(15,23,42,0.1))",
          }}
        />

        {/* Text block */}
        <div
          style={{
            position: "absolute",
            inset: "60px 60px 60px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 14px",
              borderRadius: "999px",
              border: `1px solid ${accentColor}80`,
              backgroundColor: "rgba(15,23,42,0.9)",
              fontSize: "18px",
              color: "rgba(226,232,240,0.9)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: accentColor,
                marginRight: "10px",
              }}
            />
            Case Study
          </div>

          <div style={{ maxWidth: "720px" }}>
            <h1
              style={{
                fontSize: "54px",
                lineHeight: 1.1,
                fontWeight: 700,
                color: "white",
                marginBottom: "18px",
              }}
            >
              {caseStudy.company}
            </h1>
            <p
              style={{
                fontSize: "28px",
                lineHeight: 1.3,
                color: "rgba(226,232,240,0.9)",
                marginBottom: "12px",
              }}
            >
              {caseStudy.title}
            </p>
            {caseStudy.tagline && (
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: 1.4,
                  color: "rgba(148,163,184,0.9)",
                }}
              >
                {caseStudy.tagline}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "18px",
              color: "rgba(226,232,240,0.85)",
            }}
          >
            {caseStudy.metrics.slice(0, 2).map((metric, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span
                  style={{ fontSize: "12px", color: "rgba(148,163,184,0.9)" }}
                >
                  {metric.label}
                </span>
                <span style={{ fontWeight: 700, color: accentColor }}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

