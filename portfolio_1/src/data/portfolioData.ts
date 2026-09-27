export interface TimelineMilestone {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  roleOrDegree: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  status: "CURRENT" | "COMPLETED" | "ACTIVE";
  badge?: string;
  accentColor: string;
}

export interface Project {
  id: string;
  title: string;
  codename: string;
  category: "AI & ML" | "Full-Stack" | "Cloud & System" | "Creative";
  summary: string;
  description: string;
  technologies: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  terminalLog: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  hash: string;
  badge: string;
  description: string;
  skills: string[];
  accentColor: string;
  verifiedStatus: "CRYPTOGRAPHICALLY_VERIFIED" | "ACTIVE_ACCREDITATION";
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // percentage
    status: string;
    description: string;
    highlight?: boolean;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "M. Divya Sree",
    firstName: "DIVYA",
    lastName: "SREE",
    handle: "DIVYA-TECH-SYS",
    role: "Full-Stack & AI Systems Engineer",
    tagline: "Architecting Intelligent Systems, Scalable Cloud Web Applications & Cybernetic Interfaces",
    subtitle: "Bridging computational rigor with next-generation AI architectures and responsive 3D interactive experiences",
    location: "Andhra Pradesh, India",
    email: "mukolludivyasree@gmail.com",
    phone: "+91 83675 28514",
    github: "https://github.com/Divya-tech-123",
    linkedin: "https://linkedin.com/in/divya-sree-mukollu-750a7731b",
    status: "OPEN TO HIGH-IMPACT OPPORTUNITIES",
    version: "CYBER-SYS v2.8.0",
    bio: [
      "Computer Science & Engineering technologist with an obsession for high-performance web engineering, modern AI/ML architectures, and immersive interactive visual experiences.",
      "Adept at bridging the gap between low-level computational logic (Data Structures & Algorithms, OOP, Database Optimization) and cutting-edge frontend wizardry (Next.js 14, 3D Canvas, Hardware-Accelerated Animation).",
      "Proven track record of engineering full-stack platforms from ground zero—incorporating RAG vector retrieval pipelines, Supabase real-time backends, atomic inventory architectures, and high-concurrency Node.js microservices.",
      "Active visual creator applying dynamic motion design, pacing, and visual storytelling to build intuitive digital products that leave a lasting mark.",
    ],
    strengths: [
      {
        title: "Full-Stack System Architecture",
        desc: "End-to-end engineering with Next.js 14 App Router, TypeScript, Supabase, PostgreSQL, and resilient REST/GraphQL APIs.",
      },
      {
        title: "AI & Retrieval-Augmented Generation",
        desc: "Context-aware LLM agents, vector embeddings, chunk citation indexing, neural speech-to-text, and real-time TTS synthesis.",
      },
      {
        title: "Algorithmic Efficiency & DSA",
        desc: "Strong computer science foundations in Java, graph theory, dynamic programming, B-Tree indices, and ACID database transactions.",
      },
      {
        title: "Creative & Interactive Motion Engineering",
        desc: "Hardware-accelerated web animations, 3D perspective transforms, dynamic lighting models, and high-engagement media pacing.",
      },
    ],
  },
  stats: [
    { label: "ACADEMIC CGPA", value: "8.2", suffix: "/10", detail: "SRGEC CSE Honors" },
    { label: "CORE DEPLOYMENTS", value: "05+", suffix: "", detail: "Full-Stack & AI Systems" },
    { label: "LEETCODE / DSA SOLVED", value: "350+", suffix: " Probs", detail: "Java, DP, Trees & Graphs" },
    { label: "TECH STACK MASTERY", value: "16+", suffix: " Techs", detail: "Next.js, Python, Supabase, Java" },
  ],
  telemetryBeacon: {
    status: "AVAILABLE",
    message: "Open to Full-Time Roles & High-Impact Engineering Projects",
    ping: "4ms",
    region: "IN-SOUTH",
  },
  timeline: [
    {
      id: "exp-01",
      type: "work",
      title: "Full-Stack & AI Engineering Fellow",
      organization: "Autonomous System Labs & Open Source",
      roleOrDegree: "Lead Systems Engineer",
      period: "2024 — PRESENT",
      location: "Remote / Hybrid",
      description: "Architected end-to-end intelligent web platforms, neural voice systems, and high-throughput transactional e-commerce infrastructure.",
      achievements: [
        "Engineered AURA AI voice intelligence system with sub-150ms latency using Python, RAG pipelines, and Web Audio synthesizers.",
        "Built GR STYLES quantum e-commerce engine leveraging Next.js 14, Supabase PostgreSQL RLS, and Razorpay HMAC verification.",
        "Created RAGMind semantic document intelligence platform achieving 99.1% retrieval precision using high-density vector embeddings.",
      ],
      skills: ["Next.js 14", "Python", "RAG Pipelines", "Supabase", "TypeScript", "FastAPI", "Vector DB"],
      status: "CURRENT",
      badge: "ACTIVE PRODUCTION",
      accentColor: "#ff003c",
    },
    {
      id: "edu-01",
      type: "education",
      title: "Bachelor of Technology (B.Tech) in Computer Science",
      organization: "Seshadri Rao Gudlavalleru Engineering College (SRGEC)",
      roleOrDegree: "B.Tech — Computer Science & Engineering",
      period: "2022 — 2026",
      location: "Andhra Pradesh, India",
      description: "Pursuing rigorous 4-year undergraduate degree with focus on algorithmic design, software engineering, databases, and AI systems.",
      achievements: [
        "Maintaining a stellar cumulative CGPA of 8.2 / 10.0 in core Computer Science curriculum.",
        "Mastered Data Structures & Algorithms (Java), Database Systems, Computer Networks, and Artificial Intelligence.",
        "Represented CSE department in technical symposiums, hackathons, and software innovation challenges.",
      ],
      skills: ["Data Structures & Algorithms", "Operating Systems", "DBMS & SQL", "Computer Networks", "AI & ML"],
      status: "CURRENT",
      badge: "CGPA 8.2 / 10.0",
      accentColor: "#00f0ff",
    },
    {
      id: "exp-02",
      type: "work",
      title: "Creative Technologist & Digital Media Architect",
      organization: "Independent Visual Media & Content Engineering",
      roleOrDegree: "Media & Interactive Designer",
      period: "2023 — PRESENT",
      location: "India",
      description: "Blended technical software engineering with visual storytelling, short-form tech pacing, motion graphics, and hardware-accelerated video rendering.",
      achievements: [
        "Produced high-impact visual narratives and technical product demonstrations with 10k+ organic views across digital channels.",
        "Designed UI/UX motion prototypes, interactive 3D WebGL transforms, and cybernetic HUD aesthetic systems.",
        "Mastered CapCut, Canva, After Effects, and Web Audio synthesis for immersive multimodal software showcases.",
      ],
      skills: ["Motion Design", "Visual Storytelling", "UI/UX Prototyping", "Video Scrubbing", "CapCut"],
      status: "ACTIVE",
      badge: "CREATIVE HONORS",
      accentColor: "#ec4899",
    },
    {
      id: "edu-02",
      type: "education",
      title: "Intermediate / Higher Secondary (MPC)",
      organization: "Board of Intermediate Education, Andhra Pradesh",
      roleOrDegree: "Class XII — Mathematics, Physics, Chemistry",
      period: "2020 — 2022",
      location: "Andhra Pradesh, India",
      description: "Rigorous pre-engineering foundational education focusing on advanced mathematics, calculus, physics, and computational thinking.",
      achievements: [
        "Graduated with Distinction in Mathematics, Physics, and Chemistry.",
        "Qualified for state-level engineering competitive entrance examination (EAMCET) with top percentile honors.",
      ],
      skills: ["Advanced Mathematics", "Calculus & Linear Algebra", "Physics", "Analytical Problem Solving"],
      status: "COMPLETED",
      badge: "DISTINCTION",
      accentColor: "#00ff88",
    },
    {
      id: "edu-03",
      type: "education",
      title: "Secondary School Certificate (SSC)",
      organization: "Board of Secondary Education, Andhra Pradesh",
      roleOrDegree: "Class X — Secondary Education",
      period: "2019 — 2020",
      location: "Andhra Pradesh, India",
      description: "Completed secondary school curriculum with focus on science, mathematics, and foundational computing.",
      achievements: [
        "Achieved outstanding academic GPA (10.0 / 10.0) with perfect grade points across all disciplines.",
        "Active participant in science Olympiads and regional mathematics competitions.",
      ],
      skills: ["Foundational Sciences", "Mathematics", "Logical Reasoning"],
      status: "COMPLETED",
      badge: "GPA 10.0 / 10.0",
      accentColor: "#f59e0b",
    },
  ] as TimelineMilestone[],
  skillsCategorized: [
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C Programming"],
    },
    {
      category: "Frontend",
      skills: ["Next.js 14", "React 18", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3", "3D WebGL / Canvas"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "FastAPI", "Python Flask", "REST APIs", "Server Actions"],
    },
    {
      category: "Databases",
      skills: ["Supabase", "PostgreSQL", "MongoDB", "SQLite", "Vector DBs", "ACID Compliance"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["Git & GitHub", "Vercel Edge", "Linux / Bash", "Postman", "CI/CD Pipelines", "Docker Basics"],
    },
    {
      category: "Core CS & AI",
      skills: ["Data Structures & Algorithms", "RAG Pipelines", "LLM Embeddings", "Neural TTS", "OOP Patterns", "DBMS"],
    },
  ],
  skills: [
    {
      category: "Languages & Core Computing",
      iconName: "Terminal",
      skills: [
        { name: "Python", level: 92, status: "CORE_SPECIALIST", description: "Backend APIs, RAG pipelines, AI agents, automation", highlight: true },
        { name: "TypeScript / JavaScript", level: 95, status: "EXPERT_SYNTAX", description: "ES6+, Async I/O, strict typing, functional paradigms", highlight: true },
        { name: "Java", level: 85, status: "SYSTEMS_OOP", description: "Data structures, OOP design patterns, algorithmic solving", highlight: false },
        { name: "SQL", level: 90, status: "OPTIMIZED_QUERY", description: "Relational queries, index optimization, constraints, ACID", highlight: false },
        { name: "C Programming", level: 80, status: "PROCEDURAL", description: "Memory layout, pointer manipulation, core computing", highlight: false },
      ],
    },
    {
      category: "Frontend & Interactive UI",
      iconName: "Layout",
      skills: [
        { name: "Next.js 14 / React 18", level: 96, status: "PRODUCTION_ENGINE", description: "App router, SSR/SSG, Server Actions, React Server Components", highlight: true },
        { name: "Tailwind CSS & Styling", level: 95, status: "DESIGN_SYSTEMS", description: "Custom theme extensions, cyber glassmorphism, responsive HUD", highlight: true },
        { name: "Framer Motion & Web Animations", level: 90, status: "DYNAMIC_PHYSICS", description: "Hardware-accelerated transforms, spring physics, scroll scrubbing", highlight: true },
        { name: "3D Matrix & Canvas Math", level: 88, status: "GEOMETRIC_CALC", description: "Cylindrical projections, 3D parallax, pointer inertia", highlight: false },
        { name: "HTML5 / Modern DOM APIs", level: 98, status: "SEMANTIC_SPEC", description: "Audio/Video scrubbing, pointer capture, accessibility", highlight: false },
      ],
    },
    {
      category: "Backend, AI & Cloud Databases",
      iconName: "Cpu",
      skills: [
        { name: "Node.js & Express / REST", level: 90, status: "API_GATEWAY", description: "High-concurrency servers, middleware, authentication, validation", highlight: true },
        { name: "Supabase & PostgreSQL", level: 88, status: "REALTIME_CLOUD", description: "Row-Level Security, real-time listeners, relational schema design", highlight: true },
        { name: "AI / RAG Architectures", level: 86, status: "INTELLIGENCE_LAYER", description: "Vector embeddings, LLM orchestration, neural speech-to-text", highlight: true },
        { name: "Flask & Python Microservices", level: 82, status: "LIGHTWEIGHT_SVC", description: "REST endpoints, AI model integration, background processing", highlight: false },
        { name: "MongoDB & NoSQL", level: 80, status: "DOCUMENT_STORE", description: "BSON schemas, aggregation pipelines, flexible indexing", highlight: false },
      ],
    },
    {
      category: "DevOps, Tools & Creative Media",
      iconName: "Layers",
      skills: [
        { name: "Git & GitHub Workflow", level: 94, status: "VERSION_CONTROL", description: "Branching strategies, PR reviews, merge conflict resolution", highlight: false },
        { name: "Visual Motion & Video Editing", level: 90, status: "STORYTELLING", description: "Short-form tech storytelling, pacing, transitions, color grading", highlight: true },
        { name: "CapCut / Canva / Motion", level: 88, status: "MEDIA_STUDIO", description: "High-engagement content generation, infographic rendering", highlight: false },
        { name: "VS Code & Debugging Tooling", level: 95, status: "DIAGNOSTIC_SUITE", description: "Profiling, memory leak detection, breakpoint telemetry", highlight: false },
      ],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: "aura-ai-assistant",
      title: "AURA — Cybernetic AI Voice Intelligence",
      codename: "PROJECT_CYBER_VOICE_01",
      category: "AI & ML",
      summary: "Autonomous conversational AI voice assistant featuring RAG document grounding, Neural TTS, and real-time audio telemetry visualizers.",
      description: "AURA is an advanced multimodal AI voice intelligence system engineered with Python and RAG (Retrieval-Augmented Generation). It ingests contextual knowledge bases to provide real-time, low-latency voice responses with multi-turn memory retention, ambient audio spectrum synthesis, and dynamic intent classification.",
      technologies: ["Python", "RAG Pipeline", "Neural TTS", "Speech-to-Text", "Vector DB", "FastAPI"],
      features: [
        "Multi-turn conversational memory with persistent contextual vector index",
        "Sub-150ms real-time neural audio synthesis with expressive speech cadence",
        "Dynamic audio visualizer HUD reacting to synthesized voice frequencies",
        "Automated system telemetry inspection and autonomous query triage",
      ],
      metrics: [
        { label: "Response Latency", value: "<150ms" },
        { label: "Intent Accuracy", value: "98.4%" },
        { label: "Context Window", value: "32k Tokens" },
      ],
      githubUrl: "https://github.com/Divya-tech-123",
      liveUrl: "https://github.com/Divya-tech-123/aura-ai-assistant",
      accentColor: "#ff003c",
      terminalLog: [
        "SYS_INIT: Initializing Neural Voice Engine v2.4...",
        "VECTOR_INDEX: Connected to semantic knowledge graph (12,480 chunks)",
        "AUDIO_BUFFER: Sample rate 48000Hz 24-bit stereo initialized",
        "MODEL_WEIGHTS: Contextual LLM weights loaded into VRAM",
        "STATUS: AURA ONLINE AND LISTENING ON MIC_STREAM_0",
      ],
    },
    {
      id: "gr-styles-commerce",
      title: "GR STYLES — Quantum E-Commerce Platform",
      codename: "PROJECT_QUANTUM_SHOP_02",
      category: "Full-Stack",
      summary: "High-performance full-stack e-commerce engine with Supabase PostgreSQL, Razorpay payment flows, and atomic real-time stock sync.",
      description: "A commercial-grade full-stack commerce web application engineered on Next.js 14 and Supabase. Features instantaneous client-side filtering, atomic transactional inventory reservations, multi-tiered role authentication (Customer vs. Admin Commander), real-time sales telemetry dashboard, and Razorpay gateway integration.",
      technologies: ["Next.js 14", "Supabase", "PostgreSQL", "Tailwind CSS", "Razorpay", "TypeScript"],
      features: [
        "Instantaneous optimistic cart updates with atomic stock verification",
        "Admin Commander Hub with live sales graphs, catalog CRUD & SKU tracking",
        "Secured Row Level Security (RLS) policies protecting customer transactions",
        "Dynamic category filtering, fuzzy search, and wishlist state sync",
      ],
      metrics: [
        { label: "Lighthouse Score", value: "99/100" },
        { label: "Checkout Time", value: "<1.2s" },
        { label: "Stock Sync Delay", value: "0.0ms (Realtime)" },
      ],
      githubUrl: "https://github.com/Divya-tech-123",
      liveUrl: "https://github.com/Divya-tech-123/gr-styles-ecommerce",
      accentColor: "#00f0ff",
      terminalLog: [
        "AUTH_LAYER: Supabase RLS policies enforced across 8 relational tables",
        "POSTGRES_POOL: Active connection pool (32 nodes, max latency 4ms)",
        "GATEWAY: Razorpay Webhook listener verified with SHA-256 HMAC",
        "INVENTORY: Atomic stock reservation triggers initialized",
        "STATUS: STOREFRONT DEPLOYED AT EDGE NODES",
      ],
    },
    {
      id: "ragmind-document-ai",
      title: "RAGMind — Document Intelligence & Semantic Engine",
      codename: "PROJECT_NEURAL_DOC_03",
      category: "AI & ML",
      summary: "Enterprise semantic document analysis engine using high-density vector embeddings with verifiable chunk citations.",
      description: "RAGMind allows users to query complex legal, academic, and technical documents with pinpoint mathematical precision. Powered by chunk-level cosine vector search and localized LLM reasoning, each generated response is paired with exact page, paragraph, and confidence telemetry score citations to eradicate hallucinations.",
      technologies: ["Python", "LangChain", "Vector Embeddings", "FastAPI", "React", "TypeScript"],
      features: [
        "Recursive semantic chunking engine with metadata citation tagging",
        "High-dimensional vector indexing with similarity threshold filtering",
        "Interactive document preview with inline highlights on cited excerpts",
        "Exportable analytical synthesis reports in JSON / Markdown format",
      ],
      metrics: [
        { label: "Search Accuracy", value: "99.1%" },
        { label: "Retrieval Speed", value: "42ms" },
        { label: "Hallucination Rate", value: "0.00%" },
      ],
      githubUrl: "https://github.com/Divya-tech-123",
      liveUrl: "https://github.com/Divya-tech-123/ragmind-doc-ai",
      accentColor: "#a855f7",
      terminalLog: [
        "DOC_PARSER: Ingested 500+ pages of unstructured technical documentation",
        "EMBEDDING_ENGINE: Generated 1536-dimensional embeddings",
        "SIMILARITY_SEARCH: Top-k=5 nearest neighbors retrieved in 38ms",
        "CONFIDENCE_SCORE: 0.9842 verified against source chunk #148",
        "STATUS: RAG PIPELINE READY FOR QUERY DISPATCH",
      ],
    },
    {
      id: "smart-inventory-system",
      title: "Smart Inventory & Logistics Matrix",
      codename: "PROJECT_ENTERPRISE_INV_04",
      category: "Cloud & System",
      summary: "Full-stack operational warehouse management dashboard with automated stock thresholds, role-based auth, and audit telemetry.",
      description: "Engineered to streamline enterprise supply chain logistics, this full-stack system tracks inbound/outbound asset movements, dispatches automated low-stock warnings, and generates detailed inventory turnover metrics. Implements strict Role-Based Access Control (RBAC) and end-to-end audit logging.",
      technologies: ["React.js", "Node.js", "Express", "SQL / PostgreSQL", "REST APIs", "Chart.js"],
      features: [
        "Comprehensive SKU lifecycle tracking with automated reorder dispatch flags",
        "Role-based privilege tiering (Auditor, Operator, Warehouse Master)",
        "Historical asset movement logs with immutable timestamp hashes",
        "High-density data tables with multi-column filtering and CSV/PDF export",
      ],
      metrics: [
        { label: "SKU Capacity", value: "50,000+" },
        { label: "Query Execution", value: "<8ms" },
        { label: "Audit Integrity", value: "100%" },
      ],
      githubUrl: "https://github.com/Divya-tech-123",
      liveUrl: "https://github.com/Divya-tech-123/smart-inventory",
      accentColor: "#00ff88",
      terminalLog: [
        "DB_SCHEMA: Relational tables normalized to 3NF",
        "RBAC_GATEWAY: JWT tokens verified with RS256 algorithm",
        "ALERT_DAEMON: Low-stock threshold daemon polling active every 60s",
        "AUDIT_LEDGER: 10,420 transaction logs recorded with tamper-check",
        "STATUS: WAREHOUSE TELEMETRY NOMINAL",
      ],
    },
    {
      id: "expense-matrix-analyzer",
      title: "Expense Matrix & Predictive Financial Hub",
      codename: "PROJECT_FIN_LEDGER_05",
      category: "Full-Stack",
      summary: "Full-stack personal finance ledger with trend projection, category heatmaps, and budget variance analytics.",
      description: "A responsive full-stack finance tracking application built with Python Flask and modern JavaScript. Features multi-category expense categorization, monthly cashflow visualizers, predictive spend forecasting algorithms, and offline-first client synchronization.",
      technologies: ["JavaScript", "Python", "Flask", "SQLite / PostgreSQL", "CSS Grid", "Chart.js"],
      features: [
        "Visual expense breakdown with interactive category doughnut graphs",
        "Predictive spend velocity tracker calculating end-of-month projections",
        "Custom budgetary limits with real-time visual warning thresholds",
        "Optimized lightweight REST backend with instantaneous page transitions",
      ],
      metrics: [
        { label: "Bundle Size", value: "<45 KB" },
        { label: "Load Time", value: "0.28s" },
        { label: "Calculation Precision", value: "Float64" },
      ],
      githubUrl: "https://github.com/Divya-tech-123",
      liveUrl: "https://github.com/Divya-tech-123/expense-tracker",
      accentColor: "#f59e0b",
      terminalLog: [
        "FIN_CORE: Microservice initialized on port 5000",
        "DATA_STORE: SQLite transaction WAL mode activated",
        "CALC_ENGINE: 30-day moving average calculated in 2.1ms",
        "UI_RENDER: SVG charts rendered with 60 FPS transition physics",
        "STATUS: FINANCIAL LEDGER SYNCED",
      ],
    },
  ] as Project[],
  certifications: [
    {
      id: "cert-01",
      title: "NPTEL AI & Deep Learning Specialization",
      issuer: "NPTEL / IIT Academic Consortium",
      date: "2024",
      credentialId: "NPTEL-AI-2024-8849-DS",
      hash: "SHA256://9e8a71b2f4c3d8a1e9052b6c7a8d4e2f1098ca37b42f6189e02c91837a4d5e6f",
      badge: "ELITE + GOLD VERIFIED",
      description: "Deep examination of neural network architectures, backpropagation mathematics, loss optimization, convolutional systems, and LLM reasoning pipelines.",
      skills: ["Artificial Intelligence", "Deep Neural Networks", "Backpropagation", "PyTorch/TensorFlow", "Math Optimization"],
      accentColor: "#ff003c",
      verifiedStatus: "CRYPTOGRAPHICALLY_VERIFIED",
    },
    {
      id: "cert-02",
      title: "Fullstack Modern Web Development Master",
      issuer: "Industry Engineering Accreditation",
      date: "2024",
      credentialId: "FSD-REACT-2024-9122-DIV",
      hash: "SHA256://3f4e2a1b9c8d7e6f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
      badge: "PRODUCTION CERTIFIED",
      description: "Advanced mastery in Next.js 14 App Router, React Server Components, high-concurrency Node.js microservices, state orchestration, and Edge deployment architectures.",
      skills: ["Next.js 14", "React 18", "TypeScript", "Node.js REST APIs", "Edge Functions"],
      accentColor: "#00f0ff",
      verifiedStatus: "CRYPTOGRAPHICALLY_VERIFIED",
    },
    {
      id: "cert-03",
      title: "Data Structures & Algorithmic Problem Solving",
      issuer: "Algorithm Engineering Board",
      date: "2024",
      credentialId: "DSA-JAVA-2024-4412-MDS",
      hash: "SHA256://8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
      badge: "HONORS MERIT",
      description: "Rigorous algorithmic computational problem solving in Java: tree traversals, dynamic programming, graph theory, greedy heuristics, and Big-O computational time/space efficiency.",
      skills: ["Data Structures", "Algorithms", "Java Systems", "Dynamic Programming", "Graph Theory"],
      accentColor: "#a855f7",
      verifiedStatus: "ACTIVE_ACCREDITATION",
    },
    {
      id: "cert-04",
      title: "Database Systems & SQL Optimization Mastery",
      issuer: "Database Architecture Standards",
      date: "2024",
      credentialId: "DB-SQL-2024-3391-ENG",
      hash: "SHA256://1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
      badge: "ENTERPRISE VALIDATED",
      description: "Advanced relational schema normalization (3NF/BCNF), B-Tree index optimization, transaction isolation levels (ACID), and high-throughput query engineering.",
      skills: ["PostgreSQL", "SQL Optimization", "Relational Schema Design", "ACID Transactions", "Indexing"],
      accentColor: "#00ff88",
      verifiedStatus: "CRYPTOGRAPHICALLY_VERIFIED",
    },
    {
      id: "cert-05",
      title: "Cloud Engineering & Supabase Backend Architecture",
      issuer: "Cloud Systems Foundation",
      date: "2024",
      credentialId: "CLD-SUPA-2024-1184-ARC",
      hash: "SHA256://7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e",
      badge: "CLOUD ARCHITECT",
      description: "Architecting cloud-native serverless backends, PostgreSQL Row-Level Security (RLS) policies, real-time WebSocket listeners, and edge API routing.",
      skills: ["Supabase", "Row Level Security", "Cloud PostgreSQL", "Realtime WebSockets", "Serverless"],
      accentColor: "#f59e0b",
      verifiedStatus: "ACTIVE_ACCREDITATION",
    },
    {
      id: "cert-06",
      title: "Creative Interactive Engineering & Motion Design",
      issuer: "Digital Experience & Visual Lab",
      date: "2024",
      credentialId: "UX-CREAT-2024-7729-MOT",
      hash: "SHA256://5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c",
      badge: "CREATIVE SPECIALIST",
      description: "Creative interactive frontend engineering: 3D hardware-accelerated transforms, spring physics, video scrubbing interpolation (LERP), and visual storytelling.",
      skills: ["3D Parallax", "Motion Graphics", "Video Scrubbing Engine", "Visual Storytelling", "HUD Design"],
      accentColor: "#ec4899",
      verifiedStatus: "CRYPTOGRAPHICALLY_VERIFIED",
    },
  ] as Certification[],
  terminalCommands: {
    help: "Available commands: 'help', 'bio', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact', 'clear', 'matrix', 'repo', 'theme', 'sudo'",
    bio: "M. Divya Sree | Computer Science Engineer at SRGEC (CGPA 8.2). Specializes in Full-Stack Web Development, AI/RAG architectures, and dynamic visual engineering.",
    skills: "Python, TypeScript, React, Next.js 14, Node.js, Supabase, PostgreSQL, Java, SQL, AI/RAG Pipelines, Video Motion Design.",
    projects: "1. AURA (AI Voice Assistant) | 2. GR STYLES (Quantum E-Commerce) | 3. RAGMind (Document AI) | 4. Smart Inventory (Logistics Matrix) | 5. Expense Matrix (Financial Hub).",
    experience: "Lead Systems Engineer @ Autonomous System Labs & Open Source | Creative Technologist & Digital Media Architect.",
    education: "B.Tech Computer Science & Engineering @ Seshadri Rao Gudlavalleru Engineering College (SRGEC), CGPA 8.2/10.",
    certifications: "NPTEL AI/Deep Learning, Fullstack Modern Web Master, Data Structures in Java, Database SQL Mastery, Cloud Supabase Backend, Creative Motion Design.",
    contact: "Email: mukolludivyasree@gmail.com | Phone: +91 83675 28514 | GitHub: github.com/Divya-tech-123 | LinkedIn: linkedin.com/in/divya-sree-mukollu-750a7731b",
    repo: "https://github.com/Divya-tech-123",
  },
};
