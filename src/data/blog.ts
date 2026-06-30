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
    title: 'Research Log',
    slug: 'research-log-phase-1-coordination-gap',
    date: '2026-06-30',
    excerpt:
      'Phase 1: testing whether two communicating agents underperform a single agent on the CooperBench flash subset — solo vs coop.',
    body: `## Phase 1 — Coordination gap: solo vs 2-agent coop (flash subset)

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
    title: 'Research Update',
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
