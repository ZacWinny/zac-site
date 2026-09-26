const API_URL = "https://api.setlist.fm/rest/1.0";

type SetlistResponse = {
  setlist?: Setlist[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};

export type Attendance = {
  id: string;
  date: string;
  artist: string;
  venue: string;
  city: string;
  country: string;
  url: string;
};

type Setlist = {
  id: string;
  eventDate?: string;
  artist?: { name?: string };
  venue?: {
    name?: string;
    city?: { name?: string; country?: { name?: string } };
  };
  url?: string;
};

export type AttendancesResult =
  | { kind: "ready"; attendances: Attendance[] }
  | { kind: "setup" }
  | { kind: "error" };

async function fetchAttendancesPage(username: string, page: number) {
  const response = await fetch(
    `${API_URL}/user/${encodeURIComponent(username)}/attended?p=${page}`,
    {
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.SETLISTFM_API_KEY ?? "",
      },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error(`Setlist.fm returned ${response.status}`);
  }

  return response.json() as Promise<SetlistResponse>;
}

export async function getAttendances(): Promise<AttendancesResult> {
  const apiKey = process.env.SETLISTFM_API_KEY;
  const username = process.env.SETLISTFM_USERNAME;

  if (!apiKey || !username) {
    return { kind: "setup" };
  }

  try {
    const firstPage = await fetchAttendancesPage(username, 1);
    const itemsPerPage = firstPage.itemsPerPage || 20;
    const totalPages = Math.min(
      Math.ceil((firstPage.total ?? firstPage.setlist?.length ?? 0) / itemsPerPage),
      10,
    );
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
        fetchAttendancesPage(username, index + 2),
      ),
    );
    const setlists = [
      ...(firstPage.setlist ?? []),
      ...remainingPages.flatMap((page) => page.setlist ?? []),
    ];

    return {
      kind: "ready",
      attendances: setlists.map((setlist) => ({
        id: setlist.id,
        date: setlist.eventDate ?? "Unknown date",
        artist: setlist.artist?.name ?? "Unknown artist",
        venue: setlist.venue?.name ?? "Unknown venue",
        city: setlist.venue?.city?.name ?? "Unknown city",
        country: setlist.venue?.city?.country?.name ?? "Unknown country",
        url: setlist.url ?? "https://www.setlist.fm/",
      })),
    };
  } catch {
    return { kind: "error" };
  }
}