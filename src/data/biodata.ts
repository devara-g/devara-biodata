export interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "Backend / API" | "System / Dashboard";
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    stars?: number;
    uptime?: string;
    queries?: string;
  };
  features?: string[];
}

export interface TechItem {
  name: string;
  category: "Backend" | "Frontend" | "Database" | "DevOps & Tools";
  proficiency: number;
  icon: string;
  level: "Advanced" | "Proficient" | "Intermediate";
  description: string;
}

export const BIODATA = {
  name: "Muhammad Devara",
  shortName: "Devara",
  systemTag: "DEVARA.SYS",
  role: "Backend Architect & Full Stack Developer",
  status: "ONLINE // AVAILABLE FOR HIRE & COLLABORATIONS",
  location: "Indonesia",
  email: "defarahermawan@gmail.com",
  github: "https://github.com/devara-g",
  linkedin: "https://linkedin.com/in/devara",
  discord: "devara#0001",
  bio: "Saya seorang Backend Programmer & Full Stack Developer yang berfokus pada arsitektur sistem berskala tinggi, optimasi performa query database, perancangan API modern (RESTful & GraphQL), serta otomasi CI/CD & cloud infrastructure. Saya gemar memecahkan algoritma kompleks dan membangun 'mesin tak terlihat' yang menjadi motor penggerak ekosistem digital modern.",
  typewriterRoles: [
    "Backend Architect",
    "Full Stack Developer",
    "Database Craftsman",
    "API & Microservices Engineer",
    "High-Performance System Designer",
  ],
  telemetry: {
    systemHealth: "99.98%",
    apiLatency: "14ms",
    dockerContainers: "12 Active",
    cacheHitRate: "94.2%",
    linesOfCode: "140K+",
    uptime: "99.99%",
  },
  skills: [
    {
      name: "Node.js & Express",
      category: "Backend",
      proficiency: 92,
      icon: "node",
      level: "Advanced",
      description: "High-concurrency asynchronous runtime, EventLoop optimization & microservices.",
    },
    {
      name: "PHP & Laravel",
      category: "Backend",
      proficiency: 90,
      icon: "php",
      level: "Advanced",
      description: "Eloquent ORM, robust MVC architecture, queuing systems, and RESTful APIs.",
    },
    {
      name: "MySQL & PostgreSQL",
      category: "Database",
      proficiency: 88,
      icon: "database",
      level: "Advanced",
      description: "Indexing, relational modeling, complex joins, transaction safety & query tuning.",
    },
    {
      name: "Docker & Containerization",
      category: "DevOps & Tools",
      proficiency: 82,
      icon: "docker",
      level: "Proficient",
      description: "Multi-stage builds, container orchestration, docker-compose environments.",
    },
    {
      name: "JavaScript & TypeScript",
      category: "Frontend",
      proficiency: 89,
      icon: "js",
      level: "Advanced",
      description: "Modern ESNext, strict type safety, asynchronous patterns & DOM manipulation.",
    },
    {
      name: "Next.js & React",
      category: "Frontend",
      proficiency: 85,
      icon: "react",
      level: "Proficient",
      description: "Server Components, App Router, SSR/SSG, state management & UI engineering.",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: 92,
      icon: "tailwind",
      level: "Advanced",
      description: "Modern utility styling, fluid responsive layouts, micro-animations.",
    },
    {
      name: "Git & GitHub CI/CD",
      category: "DevOps & Tools",
      proficiency: 88,
      icon: "git",
      level: "Advanced",
      description: "Branching strategies, Git workflows, automated testing & release pipelines.",
    },
    {
      name: "REST & GraphQL APIs",
      category: "Backend",
      proficiency: 90,
      icon: "api",
      level: "Advanced",
      description: "API contract design, rate-limiting, JWT authentication & OpenAPI docs.",
    },
    {
      name: "Redis & Caching",
      category: "Database",
      proficiency: 78,
      icon: "redis",
      level: "Intermediate",
      description: "In-memory caching, pub/sub messaging, session stores & throttling.",
    },
  ] as TechItem[],
  projects: [
    {
      id: "class-management",
      title: "CLASS_MANAGEMENT_PORTAL",
      category: "Full Stack",
      description:
        "Platform komprehensif untuk manajemen sumber daya edukasi, presensi siswa real-time, dan arsip materi terpusat.",
      longDescription:
        "Sistem informasi sekolah terintegrasi dengan modul absensi otomatis, distribusi materi pelajaran, dashboard guru dan siswa, serta pencatatan nilai terenkripsi.",
      image: "/assets/kelas.png",
      tags: ["PHP", "MySQL", "Bootstrap", "Vanilla JS", "Chart.js"],
      liveUrl: "https://pplg1.wuaze.com",
      githubUrl: "https://github.com/devara-g/class-information-website",
      stats: {
        uptime: "99.8%",
        queries: "1.2k/day",
      },
      features: [
        "Real-time attendance & grade tracking",
        "Role-based access control (Teacher / Student / Admin)",
        "Automated report generation (PDF & Excel)",
      ],
    },
    {
      id: "p3-portal-system",
      title: "P3_ENTERPRISE_SYSTEM",
      category: "Full Stack",
      description:
        "Enterprise-grade web portal untuk sinkronisasi operasional internal, pipeline data dinamis, dan manajemen workflow terdistribusi.",
      longDescription:
        "Arsitektur backend tangguh berbasis Laravel yang menangani manajemen data operasional, validasi data otomatis, serta reporting komprehensif.",
      image: "/assets/p3.png",
      tags: ["Laravel", "Tailwind CSS", "PostgreSQL", "REST API", "Docker"],
      liveUrl: "https://p3test.free.nf",
      githubUrl: "https://github.com/devara-g/information-p3-website",
      stats: {
        uptime: "99.9%",
        queries: "4.5k/day",
      },
      features: [
        "Secure OAuth2 & Token-based authentication",
        "Dynamic query caching with sub-50ms response",
        "Automated audit logs & audit trail",
      ],
    },
    {
      id: "admin-control-center",
      title: "ADMIN_CONTROL_CENTER",
      category: "System / Dashboard",
      description:
        "Pusat kendali administratif modern dengan visualisasi data interaktif, monitoring status server, dan CRUD modular.",
      longDescription:
        "Dashboard modular untuk pemantauan throughput sistem dan pengelolaan data master akademik secara cepat dan aman.",
      image: "/assets/sbadmin.png",
      tags: ["JavaScript", "Bootstrap 5", "SQL", "REST API", "Analytics"],
      liveUrl: "#",
      githubUrl: "https://github.com/devara-g/crud-akademik",
      stats: {
        uptime: "100%",
        queries: "800/day",
      },
      features: [
        "Real-time chart updates & telemetry graphs",
        "Batch export and bulk dataset processing",
        "Custom cyber dark/light responsive interface",
      ],
    },
  ] as Project[],
  achievements: [
    {
      year: "2026",
      title: "Backend Architect & System Engineer",
      desc: "Designing high-throughput APIs, caching layers, and scalable cloud solutions.",
    },
    {
      year: "2025",
      title: "Lead Full Stack Developer on Educational Platforms",
      desc: "Delivered production-ready portals serving hundreds of concurrent daily users.",
    },
    {
      year: "2024",
      title: "Deep Dive Database Architecture & Microservices",
      desc: "Mastered relational query optimization, indexing strategies, and Docker orchestration.",
    },
  ],
};
