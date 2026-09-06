/**
 * AI news fetched via the Tavily Search API — official blogs (OpenAI,
 * Anthropic), general web news, and X/Twitter discussions.
 *
 * Skipped silently when TAVILY_API_KEY is not set (same pattern as ph.ts).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TavilyItem {
  title: string;
  url: string;
  /** Excerpt returned by Tavily, trimmed at fetch time. */
  content: string;
  publishedDate: string; // may be empty
  score: number;
  queryLabel: string;
}

export interface TavilyData {
  items: TavilyItem[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_URL = "https://api.tavily.com/search";
const MAX_RESULTS_PER_QUERY = 10;
const MAX_ITEMS = 40;
/** Only results published within this many days are returned. */
const SEARCH_DAYS = 2;
/** Prompts only ever show a snippet, so excerpts are trimmed at fetch time. */
const CONTENT_LIMIT = 500;

interface TavilyQuery {
  q: string;
  label: string;
  includeDomains?: string[];
}

const SEARCH_QUERIES: TavilyQuery[] = [
  {
    q: "OpenAI announcement new model feature",
    label: "openai-blog",
    includeDomains: ["openai.com"],
  },
  {
    q: "Anthropic Claude announcement engineering",
    label: "anthropic-blog",
    includeDomains: ["anthropic.com"],
  },
  { q: "AI agent LLM release news", label: "web" },
  {
    q: "AI agent LLM",
    label: "x-twitter",
    includeDomains: ["x.com", "twitter.com"],
  },
];

// ---------------------------------------------------------------------------
// Response type
// ---------------------------------------------------------------------------

interface TavilyResultItem {
  title?: string;
  url?: string;
  content?: string;
  published_date?: string;
  score?: number;
}

interface TavilyResponse {
  results?: TavilyResultItem[];
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function fetchTavilyData(): Promise<TavilyData> {
  const apiKey = process.env["TAVILY_API_KEY"] ?? "";
  if (!apiKey) {
    console.log("  [tavily] TAVILY_API_KEY not set — skipping.");
    return { items: [], fetchSuccess: false };
  }

  const seen = new Set<string>();
  const all: TavilyItem[] = [];

  await Promise.all(
    SEARCH_QUERIES.map(async ({ q, label, includeDomains }) => {
      try {
        const resp = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "agents-radar/1.0",
          },
          body: JSON.stringify({
            api_key: apiKey,
            query: q,
            days: SEARCH_DAYS,
            max_results: MAX_RESULTS_PER_QUERY,
            ...(includeDomains ? { include_domains: includeDomains } : {}),
          }),
        });

        if (!resp.ok) {
          console.error(`  [tavily] "${label}": HTTP ${resp.status}`);
          return;
        }

        const data = (await resp.json()) as TavilyResponse;
        let added = 0;
        for (const r of data.results ?? []) {
          if (!r.url || seen.has(r.url)) continue;
          seen.add(r.url);
          all.push({
            title: r.title ?? "(untitled)",
            url: r.url,
            content: (r.content ?? "").slice(0, CONTENT_LIMIT),
            publishedDate: r.published_date ?? "",
            score: r.score ?? 0,
            queryLabel: label,
          });
          added++;
        }
        console.log(`  [tavily] "${label}": ${added} new items`);
      } catch (err) {
        console.error(`  [tavily] "${label}": ${err}`);
      }
    }),
  );

  const items = all.sort((a, b) => b.score - a.score).slice(0, MAX_ITEMS);
  console.log(`  [tavily] ${items.length} items (from ${all.length} unique)`);
  return { items, fetchSuccess: items.length > 0 };
}
