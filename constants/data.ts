export const PERSONAL_INFO = {
  name: 'Pratik Solanki',
  role: 'iOS Developer — Swift & Apple Ecosystem',
  tagline: 'Building secure, AI-powered, and spatially aware mobile applications using Swift and Apple\'s advanced frameworks.',
  bio: `iOS Developer with deep expertise in building secure, AI-powered, and spatially aware mobile applications using Swift and Apple's advanced frameworks. Proven ability to architect modular, privacy-compliant systems incorporating CoreML, Vision Framework, ARKit, RealityKit, Passkeys, and on-device LLM function execution. Experienced in designing high-performance applications with real-time processing, LiDAR-based occlusion handling, and secure PII management. Passionate about engineering scalable, production-ready iOS systems that align with fintech, enterprise, and next-generation spatial computing environments.`,
  email: 'psolanki4095@gmail.com',
  phone: '(548) 384-8008',
  location: 'Waterloo, ON',
  github: 'https://github.com/solankipratik8008',
  linkedin: 'https://bit.ly/4mRiZLH',
  resumeUrl: '#',
  photoUrl: '',
};

export const STATS = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Apple Frameworks', value: '8+' },
  { label: 'Certifications', value: '5' },
  { label: 'Languages Known', value: '6' },
];

export const SKILL_CATEGORIES = [
  {
    title: 'iOS Development',
    skills: [
      { name: 'Swift', level: 90 },
      { name: 'UIKit / Storyboard', level: 88 },
      { name: 'Auto Layout', level: 85 },
      { name: 'Core Data / SQLite', level: 82 },
      { name: 'MVVM Architecture', level: 88 },
    ],
  },
  {
    title: 'Apple Frameworks & APIs',
    skills: [
      { name: 'CoreLocation / MapKit', level: 85 },
      { name: 'URLSession / REST APIs', level: 88 },
      { name: 'JSON Parsing', level: 90 },
      { name: 'VisionKit / Vision', level: 70 },
      { name: 'ARKit / RealityKit', level: 65 },
    ],
  },
  {
    title: 'Additional Skills & Tools',
    skills: [
      { name: 'Xcode / Git / GitHub', level: 90 },
      { name: 'Kotlin / Java', level: 72 },
      { name: 'Python', level: 75 },
      { name: 'C# / ASP.NET', level: 70 },
      { name: 'React.js', level: 68 },
    ],
  },
];

// ── Featured Projects (Advanced iOS Pillars) ────────────────────────
export const PROJECTS = [
  {
    id: '1',
    title: 'SecureScan Pro',
    description:
      'A high-performance document scanner for sensitive files — IDs, bank statements, and confidential documents. Uses VisionKit for the scanning interface and Vision Framework for fully on-device OCR, ensuring zero data ever leaves the phone. Features real-time PII Masking powered by on-device AI that automatically detects and blurs Social Insurance Numbers and credit card digits in the live camera preview.',
    image: null,
    tags: ['Swift', 'VisionKit', 'Vision Framework', 'On-Device OCR', 'PII Detection', 'Privacy'],
    githubUrl: 'https://github.com/solankipratik8008/securescan-pro',
    liveUrl: '#',
    color: '#EF4444',
    pillar: 'Banking — Privacy & Security',
  },
  {
    id: '2',
    title: 'Agentic Personal Assistant',
    description:
      'A next-generation productivity tool that uses Agentic AI to execute tasks within the app. A user says "Move $50 from my savings to my trip fund" and the AI identifies the intent, triggers Function Calling, and invokes a Swift function to update the SwiftData database in real time. Built with a robust intent-parsing pipeline and modular function registry.',
    image: null,
    tags: ['Swift', 'LLM Integration', 'Function Calling', 'SwiftData', 'Agentic AI', 'MVC'],
    githubUrl: 'https://github.com/solankipratik8008/agentic-assistant',
    liveUrl: '#',
    color: '#7C3AED',
    pillar: 'AI — LLM Integration & Architecture',
  },
  {
    id: '3',
    title: 'Spatial Inventory Manager',
    description:
      'An AR-powered inventory tracker for small businesses. Point the camera at a shelf and the app recognizes objects, overlaying interactive "Digital Twin" 3D labels using RealityKit. Features LiDAR Mesh-based Occlusion so virtual labels realistically hide behind physical objects — the foundation for VisionOS development.',
    image: null,
    tags: ['Swift', 'ARKit', 'RealityKit', 'LiDAR', 'SceneKit', 'VisionOS-Ready'],
    githubUrl: 'https://github.com/solankipratik8008/spatial-inventory',
    liveUrl: '#',
    color: '#2563EB',
    pillar: 'Hardware — ARKit & Spatial Computing',
  },
  {
    id: '4',
    title: 'Eco-Pay Modular Wallet',
    description:
      'A digital wallet tracking the carbon footprint of purchases. Built as a modular Swift Package (SPM) — not a monolithic app — to demonstrate enterprise-grade code that plugs into large corporate codebases. Implements Passkey authentication and full Apple Privacy Manifests compliance for Canada\'s strict data privacy regulations.',
    image: null,
    tags: ['Swift', 'SPM', 'Passkeys', 'Privacy Manifests', 'Modular Architecture'],
    githubUrl: 'https://github.com/solankipratik8008/ecopay-wallet',
    liveUrl: '#',
    color: '#10B981',
    pillar: 'Architecture — Modularization & Security',
  },
  {
    id: '5',
    title: 'Visual Auditor',
    description:
      'A real-time camera tool that audits physical spaces for safety compliance — detecting hard hats, clear exits, and hazard markers. Powered by a custom CoreML model trained with CreateML. Displays live AI confidence scores and is optimized for 60 FPS inference without device overheating.',
    image: null,
    tags: ['Swift', 'CoreML', 'CreateML', 'AVFoundation', 'Real-Time CV', '60 FPS'],
    githubUrl: 'https://github.com/solankipratik8008/visual-auditor',
    liveUrl: '#',
    color: '#F59E0B',
    pillar: 'Computer Vision — CoreML & Real-Time',
  },
];

// ── Hands-On Projects (Built & Shipped) ─────────────────────────────
export const BUILT_PROJECTS = [
  {
    id: 'b1',
    title: 'iOS Weather App',
    description:
      'Real-time weather application using CoreLocation for automatic location detection and OpenWeatherMap API for live data. Displays temperature, city name, wind speed, dynamic weather icons, and human-readable descriptions. Built with clean MVC architecture and URLSession for network calls.',
    tags: ['Swift', 'CoreLocation', 'URLSession', 'OpenWeatherMap API', 'MVC', 'JSON Parsing'],
    githubUrl: 'https://github.com/solankipratik8008',
    color: '#3B82F6',
    icon: 'cloud',
  },
  {
    id: 'b2',
    title: 'iOS Multipage Travel Planner',
    description:
      'A multi-screen iOS app for complete trip planning — browse destinations, view routes on interactive maps, check weather forecasts, and track travel expenses. Uses Core Data for persistent storage and MapKit for route visualization with annotations.',
    tags: ['Swift', 'Core Data', 'MapKit', 'Multi-Screen', 'Auto Layout', 'MVC'],
    githubUrl: 'https://github.com/solankipratik8008',
    color: '#8B5CF6',
    icon: 'airplane',
  },
  {
    id: 'b3',
    title: 'CoffeeShot Review Platform',
    description:
      'Full-stack web application allowing users to submit coffee shop reviews with star ratings and image uploads. Features user authentication, an admin panel for content moderation, and comment management with a polished, responsive front-end.',
    tags: ['ASP.NET Core MVC', 'C#', 'SQL Server', 'Authentication', 'Image Upload'],
    githubUrl: 'https://github.com/solankipratik8008',
    color: '#D97706',
    icon: 'cafe',
  },
  {
    id: 'b4',
    title: 'Shopping Site Web App',
    description:
      'Group project simulating an e-commerce store with product listings, cart simulation, client-side routing, and alert notifications. Implemented dynamic component architecture, responsive UI, and navigation using React Router and SweetAlert2.',
    tags: ['React.js', 'Vite', 'React Router', 'SweetAlert2', 'Responsive UI'],
    githubUrl: 'https://github.com/solankipratik8008',
    color: '#EC4899',
    icon: 'cart',
  },
  {
    id: 'b5',
    title: 'Rock Paper Scissors Game',
    description:
      'A clean GUI-based game where users play Rock, Paper, Scissors against the computer. Features interactive buttons, randomized computer choices, win/loss tracking, and an intuitive result display — built as a Python desktop application.',
    tags: ['Python', 'Tkinter', 'GUI', 'Game Logic', 'OOP'],
    githubUrl: 'https://github.com/solankipratik8008',
    color: '#14B8A6',
    icon: 'game-controller',
  },
];

export const EXPERIENCES = [
  {
    id: '1',
    role: 'iOS Developer — Independent Projects',
    company: 'Self-Directed',
    duration: 'Sep 2024 — Present',
    description: [
      'Designing and building advanced iOS applications targeting 5 distinct engineering pillars: Security, AI, AR/Spatial, Architecture, and Computer Vision.',
      'Integrating Apple frameworks including VisionKit, CoreML, ARKit, and MapKit into production-style applications.',
      'Implementing clean MVC/MVVM architecture with Core Data persistence and REST API integration.',
      'Exploring on-device machine learning with CreateML and real-time camera processing with AVFoundation.',
    ],
  },
  {
    id: '2',
    role: 'Student — Mobile Solutions Development',
    company: 'Conestoga College',
    duration: 'Jan 2024 — Present',
    description: [
      'Building multi-screen iOS applications with Swift, UIKit, Core Data, and MapKit as part of coursework.',
      'Developing full-stack web applications using ASP.NET Core MVC, React.js, and SQL databases.',
      'Practicing clean code principles, OOP design patterns, and version control with Git/GitHub.',
      'Collaborating on group projects simulating real-world agile development workflows.',
    ],
  },
  {
    id: '3',
    role: 'Bachelor of Computer Applications',
    company: 'Natubhai V Patel College, Gujarat, India',
    duration: '2019 — 2023',
    description: [
      'Graduated with 84% GPA, building a strong foundation in computer science fundamentals.',
      'Coursework: Data Structures, Algorithms, OOP (Java), Database Systems, Software Engineering.',
      'Completed hands-on projects in Java, Python, and C# during academic program.',
      'Earned multiple Coursera certifications in Java EE, AI, Machine Learning, and Python.',
    ],
  },
];

export const EDUCATION = [
  {
    id: '1',
    degree: 'Mobile Solutions Development',
    institution: 'Conestoga College, Waterloo, ON',
    year: 'Jan 2024 — Expected May 2026',
    description: 'Focused on iOS development with Swift, mobile architecture, REST API integration, Core Data persistence, and full-stack web development. Building production-style multi-screen applications.',
  },
  {
    id: '2',
    degree: 'Bachelor of Computer Applications (IT)',
    institution: 'Natubhai V Patel College, Gujarat, India',
    year: '2019 — January 2023',
    description: 'GPA: 84%. Strong foundation in Data Structures, Algorithms, Object-Oriented Programming (Java), Database Systems, and Software Engineering.',
  },
];

export const CERTIFICATIONS = [
  {
    id: '1',
    title: 'Java EE',
    issuer: 'Coursera',
    verifyUrl: 'https://bit.ly/3FMveIY',
    icon: 'code-slash',
  },
  {
    id: '2',
    title: 'Exploratory Data Analysis for Machine Learning',
    issuer: 'Coursera',
    verifyUrl: 'https://bit.ly/43Ej6Ts',
    icon: 'analytics',
  },
  {
    id: '3',
    title: 'Object-Oriented Programming in Java',
    issuer: 'Coursera',
    verifyUrl: 'https://bit.ly/402OmJo',
    icon: 'layers',
  },
  {
    id: '4',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Coursera',
    verifyUrl: 'https://bit.ly/44byOWi',
    icon: 'bulb',
  },
  {
    id: '5',
    title: 'Python for Data Science',
    issuer: 'SoloLearn',
    verifyUrl: 'https://bit.ly/4mYFO0d',
    icon: 'logo-python',
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    quote: 'Pratik consistently demonstrates a deep understanding of iOS development. His Travel Planner app showcased excellent use of Core Data and MapKit — the kind of work that reflects real-world readiness.',
    name: 'Prof. David Mitchell',
    role: 'Mobile Development Instructor',
    company: 'Conestoga College',
  },
  {
    id: '2',
    quote: 'What impresses me about Pratik is his drive to go beyond coursework. While classmates build basic apps, he\'s exploring VisionKit, CoreML, and ARKit on his own. That initiative speaks volumes.',
    name: 'Dr. Anita Sharma',
    role: 'CS Faculty',
    company: 'Natubhai V Patel College',
  },
  {
    id: '3',
    quote: 'Pratik was an excellent collaborator on our Shopping Site project. He took ownership of the component architecture and routing, and his code was always clean and well-structured.',
    name: 'Team Lead',
    role: 'Group Project Partner',
    company: 'Conestoga College',
  },
];

export const NAV_LINKS = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'About', sectionId: 'about' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Built', sectionId: 'built' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Education', sectionId: 'education' },
  { label: 'Certs', sectionId: 'certifications' },
  { label: 'Contact', sectionId: 'contact' },
];
