import Link from "next/link";

type Chip = { href: string; label: string };

export function ChipRail({ chips }: { chips: Chip[] }) {
  return (
    <ul className="chip-scroller">
      {chips.map((chip) => (
        <li key={chip.href}>
          <Link href={chip.href}>{chip.label}</Link>
        </li>
      ))}
    </ul>
  );
}
