import { ImageResponse } from "next/og";

export const alt = "yusi — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FAFBFC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#3E63DD",
            letterSpacing: "0.04em",
            marginBottom: 24,
          }}
        >
          FRONTEND DEVELOPER
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 600,
            color: "#1C2024",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          yusi
        </div>
        <div style={{ fontSize: 34, color: "#60646C", maxWidth: 760 }}>
          turning code into clean architecture.
        </div>
      </div>
    ),
    { ...size },
  );
}
