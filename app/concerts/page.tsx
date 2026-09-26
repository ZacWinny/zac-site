import type { Metadata } from "next";
import Link from "next/link";
import { getAttendances } from "@/lib/setlist";

export const metadata: Metadata = {
  title: "Concerts",
  description: "A record of concerts attended.",
};

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  const parsedDate = new Date(date.split("-").reverse().join("-"));
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default async function ConcertsPage() {
  const result = await getAttendances();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm text-zinc-500 transition-colors hover:text-amber-800 dark:hover:text-amber-400"
      >
        ← Back home
      </Link>
      <header className="mt-10 max-w-xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-800 dark:text-amber-400">
          Live music
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Concerts I&apos;ve attended
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A running record of the artists, venues, and countries that made it
          onto the calendar.
        </p>
      </header>

      {result.kind === "setup" && (
        <section className="mt-16 border-y border-zinc-200 py-8 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Setlist.fm is not connected yet</h2>
          <p className="mt-2 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            WIP, pending Setlist.fm API key.
          </p>
        </section>
      )}

      {result.kind === "error" && (
        <section className="mt-16 border-y border-red-200 py-8 dark:border-red-900">
          <h2 className="text-lg font-medium">Concerts could not be loaded</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Setlist.fm did not return the attendance history. Try again later.
          </p>
        </section>
      )}

      {result.kind === "ready" && (
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
              Attendance
            </h2>
            <p className="text-sm text-zinc-500">
              {result.attendances.length} concerts
            </p>
          </div>
          {result.attendances.length === 0 ? (
            <p className="border-y border-zinc-200 py-8 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              No attended concerts found yet.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {result.attendances.map((attendance) => (
                <li key={attendance.id} className="py-6">
                  <a
                    href={attendance.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-lg font-medium group-hover:text-amber-800 dark:group-hover:text-amber-400">
                        {attendance.artist}
                      </h3>
                      <time className="shrink-0 text-sm text-zinc-500">
                        {formatDate(attendance.date)}
                      </time>
                    </div>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {attendance.venue}, {attendance.city}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {attendance.country}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}