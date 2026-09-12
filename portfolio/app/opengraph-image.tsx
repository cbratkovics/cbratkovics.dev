import { ImageResponse } from "next/og";

export const alt = "Christopher J. Bratkovics — Data Scientist, Analytics Engineer, Applied AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "white", background: "linear-gradient(135deg, #0a0a0f 15%, #172554 55%, #4c1d95 100%)" }}>
      <div style={{ display: "flex", color: "#67e8f9", fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Portfolio</div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 800, marginTop: 28 }}>Christopher J. Bratkovics</div>
      <div style={{ display: "flex", fontSize: 36, color: "#e5e7eb", marginTop: 28 }}>Data Scientist · Analytics Engineer · Applied AI</div>
      <div style={{ display: "flex", width: 180, height: 8, marginTop: 50, borderRadius: 8, background: "linear-gradient(90deg, #22d3ee, #a855f7)" }} />
    </div>, size
  );
}
