import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-4">
          <a href={site.links.github} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
