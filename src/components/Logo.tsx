export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="inline-block size-[7px] rotate-45 border border-current"
      />
      <span className="font-display text-2xl leading-none font-bold">نُور</span>
      <span className="text-[0.62rem] tracking-[0.42em] opacity-60">NOOR</span>
    </span>
  );
}
