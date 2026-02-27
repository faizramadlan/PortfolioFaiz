export default function Summary() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-4">ABOUT</div>
        <p className="text-sm md:text-base leading-relaxed">
          Technical Consultant and Developer with expertise in enterprise software solutions and full-stack development. Proven track record of leading requirement analysis, supervising development teams, and delivering scalable applications.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        <span className="brutal-tag">■ CONSULTING</span>
        <span className="brutal-tag">■ FULL-STACK</span>
        <span className="brutal-tag">■ LEADERSHIP</span>
      </div>
    </div>
  );
}
