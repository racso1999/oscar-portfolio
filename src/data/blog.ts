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
    title: 'Graduated with Distinction',
    slug: 'graduated-with-distinction',
    date: '2026-11-02',
    excerpt:
      'Finished Computer Science with a distinction while juggling a part-time job and the DataSoc presidency — next up, rebuilding Jobe from scratch.',
    body: `I’m incredibly pleased to announce that I have received a distinction for my studies in Computer Science! Balancing the demands of a part-time job, presidency of DataSoc and my degree was quite tricky at times and certainly took some doing, but it’s made it all the more satisfying now it’s finished.

The main thing to take away from the degree was perhaps the experience I got from working with other engineers. I met some great people along the way, some of whom were always happy to help me understand some new tech or just chat about problem solving.

I’m spending my time now solidifying my skills with some projects. I’ve decided to rebuild Jobe from scratch, and I’m hoping to have something testable by the end of November. I’m incredibly excited for the future and can’t wait to see what I can build next. Stay tuned.`,
  },
  {
    title: 'Weekly Review - 12-09-26',
    slug: 'weekly-review-2026-09-12',
    date: '2026-09-12',
    excerpt:
      'China’s done, university’s done, and the new routine is two hours of DSA and an hour of job applications a day — plus a finances tracker that plugs into my banking app.',
    body: `China was a blast. University is done. And now sat back in front of my MacBook.

Two hours of data structures and algorithms daily, one hour of job applications. Let's see how long it takes me to get a role.

I'm also working on another full stack app to prepare me for work. I'm building a simple finances tracker, that plugs into my banking app.`,
  },
  {
    title: 'Research Log',
    slug: 'the-curse-of-coordination-reproduced',
    date: '2026-07-18',
    excerpt:
      'Reproduced CooperBench’s coordination gap: pass rate fell 3.6x from solo to two messaging agents, and every joint failure was a merge conflict, not broken code.',
    body: `## The Curse of Coordination, Reproduced

This week: replication.

We're testing why multi-agent coding systems underperform solo ones. Our bet is the communication efficiency problem: split a compute budget across agents and coordination eats the difference.

This week's goal was to reproduce CooperBench's coordination gap on our own setup. We ran its 50-pair "flash" subset with Claude Sonnet 5, comparing solo (one agent, both features) against cooperative (two agents, one feature each, free-text messaging), paired at the pair level. About 47 pairs were usable.

## Results

Pass rate fell from 44.2% solo to 12.3% with messaging, a 3.6x gap. Cost efficiency fell further, from 0.675 to 0.107 passes per dollar, a 6.3x gap. Both differences are significant (Wilcoxon, p < .001). So the gap reproduced, and once cost is counted it nearly doubles.

## What we found

The failure isn't capability, it's integration. Agents passed their own test suite just as often as solo (21/47 vs 20/47), but of 20 solo-solvable pairs, cooperation delivered only 5. Every joint failure was a textual merge conflict, not broken code. The coordination gap is really an integration gap.

## Next: scaling

We're now varying only team size (N from 1 to 4) on a fixed workload, splitting each agent's tokens into context, task, communication, and rework to ask one question: is coordination cost superlinear in N? Results in a future update.

Built on CooperBench (Khatua et al., 2026) and Fu et al. (2026).`,
  },
  {
    title: 'Research Log',
    slug: 'research-update-local-ollama-linux',
    date: '2026-06-30',
    excerpt:
      'Tested three CooperBench backends for cost and speed. All three fell short: Claude wrapper too expensive, local LLM too slow, Gemini API too expensive.',
    body: `## What we did

Ran CooperBench across three model backends to find a workable cost and speed setup. Tested the Claude wrapper, a local LLM on the RTX 4070, and the Gemini API.

## What went wrong

None of the three are viable yet. The Claude wrapper is too expensive, burning a full session token allowance in a single run. The local LLM is too slow, with concurrency stuck at 1 due to VRAM limits. The Gemini API is also too expensive. One full run lands around £15 to £20.

## What's next

Find a cheaper or faster backend that can sustain a full 50 set run without blowing the budget, then move on to testing context protocols between agents.

## Phase 1 — Coordination gap: solo vs 2-agent coop (flash subset)

Hypothesis: Splitting a task across two communicating agents underperforms a single agent doing the whole task (CooperBench coordination deficit).

## Setup

- Dataset: flash subset — 50 feature pairs, 20 tasks, 11 repos (seed=42, sampled from lite).
- Agent: claude_code (Claude Code CLI), model claude-sonnet-4-6, billed via Claude Max subscription (OAuth token auto-read from ~/.claude/.credentials.json).
- Backend: local Docker, amd64 task images prebuilt locally.
- Only variable across conditions: --setting. No --git (isolates messaging as the sole coordination channel).

## Conditions

- flash-solo — 1 agent implements both features.
- flash-coop — 2 agents (one feature each), freeform Redis messaging ON (default).

## Commands

\`\`\`bash
cd /home/oscar/CooperBench
docker run -d -p 6379:6379 --name cb-redis redis:7   # message bus (required for coop)

# Solo: one agent does both features
uv run cooperbench run -n flash-solo -s flash \\
  -a claude_code -m claude-sonnet-4-6 --setting solo -c 8

# Coop: two agents, one feature each, messaging on
uv run cooperbench run -n flash-coop -s flash \\
  -a claude_code -m claude-sonnet-4-6 --setting coop -c 8
\`\`\`

## Flag meaning

- -n — experiment name → logs/<name>/
- -s flash — 50-pair subset (fixed seed → both conditions see identical pairs)
- -a claude_code -m claude-sonnet-4-6 — Claude wrapper, Sonnet 4.6
- --setting solo|coop — single agent vs 2 communicating agents
- -c 8 — tasks in parallel (solo: 8 containers; coop: 8×2 = 16)

## Scoring

- Solo: single patch tested against both feature suites (test_solo).
- Coop: the two agents' patches are auto-merged, then both suites run on the merged tree (test_merged); merge conflicts recorded.
- Primary metric: both_passed rate per pair. Secondary (coop): merge-conflict rate.
- Auto-eval runs after each; results in logs/<name>/summary.json and per-pair eval.json.
- Gap = both_passed(solo) − both_passed(coop).

## Notes

- Run solo first, then coop (RAM headroom; coop doubles container count).
- Redis required for coop only; harmless for solo.
- --force to re-run over existing results.

## Results — Claude runs

- One full run burns through nearly 100% of the session limit on the max plan.`,
  },
  {
    title: 'Research Log',
    slug: 'research-update-2026-06-27',
    date: '2026-06-27',
    excerpt:
      'Wrestling CooperBench onto a Linux box, rebuilding ~200GB of Docker containers for amd64, and a new amd64 mini dataset.',
    body: `CooperBench is continuing to be a pain in the ass. Before I finish complaining, I am not saying that this is a bad benchmark — it's just a little heavy. The benchmark requires pulling around 200GB of Docker containers, which on my small MacBook is quite a lot. I've now switched over to my Linux machine, which has 32GB of RAM, meaning we can turn the concurrency up a little.

Another issue is that the benchmark appears to provide Docker images built specifically for arm architectures. My task this weekend has been rebuilding all of the containers for my amd64 machine. I also created a new amd64 mini dataset containing 10 containers built for amd machines. I intend to fully rebuild the whole dataset for amd64, allowing a larger distribution of the benchmark in the future.

ALSO -> new 480GB SSD is on the way as we speak. Stay tuned.`,
  },
  {
    title: 'Weekly Review - 25-06-26',
    slug: 'weekly-review-2026-06-25',
    date: '2026-06-25',
    excerpt:
      'Adapting Ollama for CooperBench, running benchmarks on a remote GPU, and a new side project: an AI assistant inside a retro alarm clock.',
    body: `This week's rundown. It has been an incredibly hot week, so much so that my devices have decided that they need a break too, no WiFi at home :(. I've managed to adapt Ollama to work with CooperBench, and I'm now running CooperBench from my Mac using the GPU on a remote machine for compute. It's been tricky getting the machine set up for benchmarking. Despite the models being sent off to the remote GPU, my local machine is still responsible for running the benchmark containers, especially with the concurrency turned up to 10! My plan for this week is to set it up on my Linux machine at home and run it from there. The next plan is to run a 50-set benchmark on CooperBench and then start testing some different context protocols between agents, checking how they affect the output. This is my new direction for my research. Context is everything in the world of agents, and we certainly need to work on their communication.

I'm excited to get to work on my new side project. I'm setting up a brain for my machines in a retro digital alarm clock that I plan on doubling as a home assistant/AI voice assistant. £50 for a 2GB Pi 4. What has the world come to.`,
  },
];
