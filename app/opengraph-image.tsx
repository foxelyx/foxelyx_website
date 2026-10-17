import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "FOXELYX — Software, Zoho, Digital Marketing & Branding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#ffffff",
          padding: 64,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: "#F97316",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 600 }}>
          FOXELYX
          <div style={{ fontSize: 28, color: "#F97316", marginTop: 12 }}>
            Software, Zoho, marketing and brand
          </div>
        </div>
      </div>
    ),
    size,
  );
}
