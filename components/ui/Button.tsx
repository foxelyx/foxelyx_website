import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  icon?: "chevron" | "play";
  tabIndex?: number;
  variant?: "solid" | "ghost";
};

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6.25 3.5 10.75 8 6.25 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6.4 4.1v7.8L12.2 8 6.4 4.1Z" fill="currentColor" />
    </svg>
  );
}

export function Button({ href, children, icon = "chevron", tabIndex, variant = "solid" }: ButtonProps) {
  return (
    <Link href={href} className={variant === "ghost" ? "btn-primary btn-ghost" : "btn-primary"} tabIndex={tabIndex}>
      <span>{children}</span>
      <span className="btn-icon" aria-hidden="true">
        {icon === "play" ? <PlayIcon /> : <ChevronIcon />}
      </span>
    </Link>
  );
}
