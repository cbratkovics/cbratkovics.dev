import { ImageResponse } from "next/og";
import { identity } from "@/data/projects";

export const alt = `${identity.name} | ${identity.role} | ${identity.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "white", background: "linear-gradient(135deg, #0a0a0f 15%, #172554 55%, #4c1d95 100%)" }}>
      <div style={{ display: "flex", color: "#67e8f9", fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>{identity.eyebrow}</div>
      <div style={{ display: "flex", fontSize: 38, fontWeight: 700, marginTop: 26 }}>{identity.name}</div>
      <div style={{ display: "flex", fontSize: 72, fontWeight: 800, marginTop: 20 }}>{identity.role}</div>
      <div style={{ display: "flex", fontSize: 32, color: "#e5e7eb", marginTop: 16 }}>{identity.specialty}</div>
      <div style={{ display: "flex", fontSize: 32, color: "#a5f3fc", marginTop: 20 }}>{identity.tagline}</div>
      <div style={{ display: "flex", fontSize: 22, color: "#cbd5e1", marginTop: 26 }}>{identity.coreStack.join(" · ")}</div>
      <div style={{ display: "flex", fontSize: 22, color: "#cbd5e1", marginTop: 12 }}>{identity.supportingExpertise}</div>
      <div style={{ display: "flex", width: 180, height: 8, marginTop: 30, borderRadius: 8, background: "linear-gradient(90deg, #22d3ee, #a855f7)" }} />
    </div>, size
  );
}
