export default function FindingBlock({ title: heading, children, why, recommendation }: { title: string; children: React.ReactNode; why: React.ReactNode; recommendation: React.ReactNode }) {
  return <article className="glassmorphism rounded-xl p-6 md:p-8"><h3 className="text-2xl font-semibold text-white">{heading}</h3><div className="case-study-finding"><div><h4>Found</h4>{children}</div><div><h4>Why it matters</h4>{why}</div><div><h4>What I’d tell the decision-maker</h4>{recommendation}</div></div></article>;
}
