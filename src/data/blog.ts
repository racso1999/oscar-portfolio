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
    title: 'Weekly Review - 25-06-26',
    slug: 'weekly-review-2026-06-25',
    date: '2026-06-25',
    excerpt:
      'Adapting Ollama for CooperBench, running benchmarks on a remote GPU, and a new side project: an AI assistant inside a retro alarm clock.',
    body: `This week's rundown. It has been an incredibly hot week, so much so that my devices have decided that they need a break too, no WiFi at home :(. I've managed to adapt Ollama to work with CooperBench, and I'm now running CooperBench from my Mac using the GPU on a remote machine for compute. It's been tricky getting the machine set up for benchmarking. Despite the models being sent off to the remote GPU, my local machine is still responsible for running the benchmark containers, especially with the concurrency turned up to 10! My plan for this week is to set it up on my Linux machine at home and run it from there. The next plan is to run a 50-set benchmark on CooperBench and then start testing some different context protocols between agents, checking how they affect the output. This is my new direction for my research. Context is everything in the world of agents, and we certainly need to work on their communication.

I'm excited to get to work on my new side project. I'm setting up a brain for my machines in a retro digital alarm clock that I plan on doubling as a home assistant/AI voice assistant. £50 for a 2GB Pi 4. What has the world come to.`,
  },
];
