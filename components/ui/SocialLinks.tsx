import { SOCIALS } from "@/data/site";

const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.2C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.35-2.55a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 9.5H3.7V20h2.8V9.5ZM5.1 4a1.7 1.7 0 1 0 .05 3.4A1.7 1.7 0 0 0 5.1 4ZM20.3 20h-2.8v-5.6c0-1.6-.6-2.6-2-2.6a2.1 2.1 0 0 0-2 1.4 2.6 2.6 0 0 0-.1.9V20H10.6s.04-9.3 0-10.5h2.8v1.7a3.1 3.1 0 0 1 2.7-1.5c2 0 3.5 1.3 3.5 4.1V20Z"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10.2 15.2V8.8L15.6 12l-5.4 3.2Z"
      />
    </svg>
  ),
} as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIALS.map((social) => (
        <a key={social.id} href={social.href} target="_blank" rel="noreferrer">
          <span className="sr-only">{social.label}</span>
          {ICONS[social.id]}
        </a>
      ))}
    </div>
  );
}
