export default function Section({ title: heading, children }: { title: string; children: React.ReactNode }) {
  return <section className="case-study-section"><h2>{heading}</h2>{children}</section>;
}
