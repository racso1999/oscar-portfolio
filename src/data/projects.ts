import droneVideo from '../assets/drone.mov';
import cropDatabasePdf from '../assets/crop-data-sql-database.pdf';
import applioUmlImage from '../assets/applio-uml.svg';

export interface Project {
  title: string;
  slug: string;
  description: string;
  uploadedAt: string;
  technologies: string[];
  githubUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
}

export const projects: Project[] = [
  // Template for adding a new project:
  // {
  //   title: 'Project Title',
  //   slug: 'project-slug',
  //   description: 'Main project description...',
  //   uploadedAt: 'YYYY-MM-DD',
  //   technologies: ['Tech 1', 'Tech 2'],
  //   githubUrl: 'https://github.com/username/repository',
  //   imageUrl: 'https://... or imported asset',
  //   videoUrl: optional,
  //   pdfUrl: optional,
  // },
  {
    title: 'Jobe',
    slug: 'jobe',
    description:
      'Jobe is a lightweight version of a full application suite I built a couple of months back. It is a simple agent that uses the Gmail API and Gemini to read through your emails and find information regarding pending job applications. It then updates a local SQLite database with the job status and displays it all on a simple dashboard. I built this to help keep track of graduate roles and internships that were getting lost deep in my inbox.',
    uploadedAt: '2026-04-02',
    technologies: [
      'Python',
      'FastAPI',
      'Jinja2',
      'Google OAuth 2.0',
      'Gmail API',
      'Gemini API',
      'SQLite',
      'SQLAlchemy',
    ],
    githubUrl: 'https://github.com/racso1999/jobe',
  },
  {
    title: 'Agentic Application System',
    slug: 'agentic-application-system',
    description:
      'A proof-of-concept autonomous multi-agent workflow that discovers, scores, documents, and submits applications while exposing how broken high-volume hiring loops can become.',
    uploadedAt: '2026-03-14',
    technologies: ['FastAPI', 'Next.js 14', 'LiteLLM', 'Playwright', 'aiosqlite', 'Docker'],
    githubUrl: 'https://github.com/racso1999/applio',
    imageUrl: applioUmlImage,
  },
  {
    title: 'Crop Data SQL Database',
    slug: 'crop-data-sql-database',
    description:
      'Designed a relational database and companion REST API for crop data, documenting schema decisions, normalization choices, and the tradeoffs between SQL and document-based models.',
    uploadedAt: '2026-02-10',
    technologies: ['SQL', 'Database Design', 'API Design', 'Data Modeling'],
    pdfUrl: cropDatabasePdf,
  },
  {
    title: 'Autonomous Drone System',
    slug: 'autonomous-drone-system',
    description:
      'This is one of those projects that I\'ve always wanted to do but felt I never had the skillset to achieve. However, after one year of learning Python, I decided with a university colleague to give it a try. We purchased a cheap drone off eBay and began programming.\n\nTo begin with, we started simple. We loaded YOLOv8 for object detection and added some simple commands for it to turn away from any detected objects. We then moved on to generating actionable hardware instructions from natural language commands.\n\nCurrently, we have a few models running on the drone, including YOLOv8 for object detection. This helps the drone begin to understand its surroundings. We also have a link to Groq, which allows the drone to take natural language input and generate commands on the fly for the drone to execute. For example: "fly around the room for 2 minutes and then come home."\n\nThis project has advanced my confidence in developing real-time algorithms and software-hardware interaction. Working alongside another engineer has also been a positive change, whereby I\'ve been able to develop my appreciation for sharing work load and working to each other\'s unique abilities. We collaborate mainly through Git, working on separate branches and merging successful features.\n\nNext up is a return-to-charge feature. The plan is to 3D-print a station that the drone can land on and wirelessly charge from, moving the system towards fully autonomous, continuously operating behaviour.',
    uploadedAt: '2025-12-20',
    technologies: ['Python', 'Control Systems', 'Machine Learning', 'Robotics'],
    githubUrl: 'https://github.com/racso1999/autonomous-drone',
    videoUrl: droneVideo,
  },
  {
    title: 'Greedy Waste Routing Optimizer',
    slug: 'greedy-waste-routing-optimizer',
    description:
      `Efficient waste management is a logistical challenge that directly impacts urban sustainability, operational costs, and public health. To address this, I developed a greedy heuristic algorithm designed to optimize truck routing for municipal waste collection across a dynamic city grid.

    The algorithm tackles a variant of the Vehicle Routing Problem (VRP), a well-studied class of combinatorial optimization problems with real-world implications for fleet management and city planning. The core challenge: given a set of collection points distributed across a municipality, assign and sequence routes for a fixed fleet of trucks in a way that minimizes total travel distance while ensuring all collection points are serviced within a defined time window.

    My approach draws on greedy nearest-neighbor heuristics, where each truck iteratively selects its next collection point based on proximity and priority weighting. Through research into classical VRP literature, I found that while exact solutions become computationally intractable at scale, well-tuned heuristics can produce near-optimal results in a fraction of the time, making them far more practical for real-world deployment. I incorporated a priority scoring system that factors in collection frequency requirements and road network constraints to further refine route quality.

    The algorithm was evaluated against randomized city grid simulations, consistently reducing theoretical total route distance compared to naive sequential scheduling. Key takeaways from the project included the importance of balancing solution quality against runtime efficiency, and the surprising degree to which small changes in priority weighting can cascade into significantly different routing outcomes.

    This project deepened my understanding of combinatorial optimization, graph traversal, and the practical trade-offs involved in applying algorithmic solutions to public infrastructure problems.`,
    uploadedAt: '2025-11-09',
    technologies: ['Optimization', 'Algorithms', 'Heuristics', 'Graph Theory'],
    githubUrl: 'https://github.com/racso1999/greedy_waste_algorithm',
  },
];

