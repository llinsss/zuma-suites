interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ eyebrow, title, subtitle, center = false, light = false }: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4 ${light ? "text-white" : "text-white"}`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-white/60" : "text-white/60"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
