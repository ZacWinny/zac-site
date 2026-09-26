import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <section className="space-y-5">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-800 dark:text-amber-400">
          {site.role}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.name}
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {site.tagline}
        </p>
        <p className="text-sm text-zinc-500">{site.location}</p>
      </section>

      <section id="projects" className="mt-20 scroll-mt-20">
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
          Projects
        </h2>
        <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
          {site.projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.href}
                className="group block py-6 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium group-hover:text-amber-800 dark:group-hover:text-amber-400">
                    {project.title}
                  </h3>
                  <span className="hidden text-sm text-zinc-400 sm:inline">
                    {project.tags.join(" · ")}
                  </span>
                </div>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {project.blurb}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="mt-16 scroll-mt-20 space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
          About
        </h2>
        <p className="max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
          I work as a software engineer. This site is a home for personal
          projects — swap the copy in{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-900">
            lib/site.ts
          </code>{" "}
          and add your own work.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Reach me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline decoration-zinc-300 underline-offset-4 hover:decoration-amber-700"
          >
            {site.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
