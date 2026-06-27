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
