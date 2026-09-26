import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/concerts", label: "Concerts" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-[var(--background)]/80 backdrop-blur-md dark:border-zinc-800">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-medium tracking-tight">
          {site.name}
        </Link>
        <nav className="flex gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
