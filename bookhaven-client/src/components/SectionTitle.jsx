function SectionTitle({
  eyebrow,
  title,
  subtitle,
  action,
  className = "",
  id,
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-base leading-relaxed text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default SectionTitle;
