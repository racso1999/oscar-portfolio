export interface BlogPost {
  title: string;
  slug: string;
  date: string;     // ISO date 'YYYY-MM-DD'
  excerpt: string;  // one-sentence summary shown in bubble and /blog list
  body: string;     // full text rendered on /blog
}

// Source of truth — keep sorted newest-first so both the bubble and /blog page agree
export const blogPosts: BlogPost[] = [
  {
    title: 'Building an Agentic Email Tracker',
    slug: 'building-an-agentic-email-tracker',
    date: '2026-06-19',
    excerpt:
      'How I wired Gmail OAuth, SQLite persistence, and a small LLM pipeline to automatically surface job-application updates buried in my inbox.',
    body: `I've been applying to a lot of roles lately and my inbox had become genuinely unmanageable. Emails from recruiters, auto-rejections, interview invites, follow-up chasers — all mixed in with everything else. I kept missing things. So I built Jobe.

The pipeline is simple. A Gmail OAuth flow authenticates once, stores a refresh token, and every subsequent run is fully headless. A FastAPI worker then fetches the unread threads, passes each one to Gemini with a structured prompt, and extracts whatever job-application signal is in there — company name, role, current status, any action needed from me. That gets written as a row into SQLite via SQLAlchemy, and a Jinja2 dashboard renders the whole thing as a sortable table.

The hard part wasn't the plumbing — it was the prompting. Early versions were pulling company names from email footers and treating them as the employer. The fix was to anchor extraction on the subject line first and only expand to body context if the subject was ambiguous. That single change made accuracy jump from roughly usable to actually reliable.

What I didn't expect was how much calmer it made job hunting feel. There's something about having everything in one place with a clear status column that removes the low-level dread of "did I miss something?" I'm going to add a weekly digest next — a summary email that flags anything that's gone quiet for more than two weeks, so I'm not the one chasing manually.

It's a small project but it solved a real problem I had, which is the best reason to build anything.`,
  },
  {
    title: 'What I Learned Letting an Agent Apply to Jobs',
    slug: 'what-i-learned-letting-an-agent-apply-to-jobs',
    date: '2026-03-22',
    excerpt:
      'A reflection on the Agentic Application System — what it can do, what it exposed about the hiring process, and why I stopped running it at scale.',
    body: `The Agentic Application System started after I got rejected from a role I really wanted. I was frustrated, not just at the outcome but at the process — the volume you have to play, the identical forms on every ATS, the silence. So I built something that could play the volume game for me.

The pipeline has four agents. A Scout scrapes job boards and deduplicates listings. A Matcher scores each one against my CV using an LLM and filters out anything below a threshold. A document stage generates a tailored cover letter and reformatted CV. An Auto Apply Worker fills in the form and submits. End to end, about 90 seconds per application.

I ran it for two weeks. It worked. And then I turned it off.

The problem isn't technical — it's that the system makes a broken process worse. Recruiters are already drowning in applications. Firing off hundreds of low-effort submissions doesn't get me a job, it just adds to the noise that makes everyone's experience worse, including the people I actually want to work with.

What I kept from the project is the infrastructure knowledge. Multi-agent state handoffs, idempotent retries, Playwright-based form submission across wildly inconsistent ATS implementations — that's genuinely useful stuff to understand. The agent scaffolding is solid. I just think the right use of it is targeted and deliberate, not blanket.

There's a version of this that's ethical: use it to find the right 10 roles, not to spray at 500.`,
  },
  {
    title: 'Flying a £60 eBay Drone into Something Useful',
    slug: 'flying-a-60-ebay-drone-into-something-useful',
    date: '2025-12-28',
    excerpt:
      'Notes from the early sessions getting YOLOv8 running on a cracked Tello and building the first obstacle-avoidance loop.',
    body: `The drone came in a beaten-up box with no manual, a cracked bumper, and a battery at 12%. We paid £60 for it off eBay and had no real expectations. That was probably the right mindset.

The Tello exposes a UDP command interface, so the first session was just proving we could talk to it — send takeoff, hover for five seconds, land. Once that worked we had a foundation to build on. We loaded YOLOv8n (the nano variant — anything heavier killed the WiFi throughput) and wired detections into a dead simple rule: if a person or large object appears centre-frame above a confidence threshold, rotate 90 degrees and hold position.

The main problem is latency. Detection-to-command round trip over the local WiFi link runs at around 300ms. At anything approaching full speed, the drone has already closed half the distance before the avoidance command lands. Speed-capping at 20 cm/s made it survivable, if not graceful.

Session two, we got Groq wired in for natural language commands. You can now say "fly slowly around the room for 30 seconds and come back" and it generates the instruction sequence on the fly. It mostly works. The parsing is the easy part — the hard part is that the drone's spatial awareness is still entirely reactive. It doesn't build a map, it just responds to what it sees in the current frame.

Next step is the return-to-charge feature. We're 3D printing a landing pad. If it works, I'll write it up.`,
  },
];
