const variants = {
  primary:
    "bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  accent:
    "bg-amber-500 text-white shadow-sm shadow-amber-500/20 hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500",
  outline:
    "border border-slate-200/80 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  ghost:
    "text-slate-600 hover:bg-slate-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg",
  md: "px-4 py-2.5 text-sm font-medium rounded-xl",
  lg: "px-6 py-3 text-base font-medium rounded-xl",
};

function Button({
  as,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}) {
  const Root = as || "button";
  return (
    <Root
      className={`inline-flex items-center justify-center gap-2 transition duration-200 disabled:pointer-events-none disabled:opacity-50 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Root>
  );
}

export default Button;
