/**
 * Projects Data Configuration
 * 
 * Comprehensive descriptions and technical stacks (strictly technologies, zero model names).
 */

export const projects = [
  {
    id: 1,
    name: "SnapClass",
    description: "SnapClass is an AI-powered smart attendance platform designed to automate classroom roll calls through facial recognition and voice biometric verification. It enables instructors to record attendance in seconds by analyzing single or batch classroom photos via multi-face detection, 128D facial embeddings, and SVM classification. To support multimodal verification, the system also offers voice phrase matching alongside QR-code-driven self-enrollment and real-time attendance analytics. Students benefit from frictionless FaceID logins, profile onboarding, and dedicated dashboards to monitor attendance history across enrolled courses.",
    liveUrl: "https://snap-ai-attend.streamlit.app/",
    icon: "/icons/project-1.png",
    video: "/videos/project-1.mp4",
    poster: "/videos/project-1.jpg",
    tech: ["Streamlit", "dlib", "face_recognition", "Scikit-learn", "Resemblyzer", "Librosa", "Supabase", "PostgreSQL", "bcrypt", "Segno QR"]
  },
  {
    id: 2,
    name: "AI Real-time GYM Coach",
    description: "AI Real-time GYM Coach is an intelligent fitness assistant that uses computer vision and AI to deliver live personal training through a device camera. It performs real-time pose estimation to analyze biomechanics across exercises like squats, push-ups, and curls, automatically counting reps and checking posture. The system delivers proactive, low-latency audio feedback on exercise form using an integrated AI system paired with text-to-speech. Built with a privacy-first approach, it streams and processes video locally in the browser while maintaining workout history, analytics, and authentication via local persistence.",
    liveUrl: "https://gymbuddy-ai.streamlit.app/",
    icon: "/icons/project-2.png",
    video: "/videos/project-2.mp4",
    poster: "/videos/project-2.jpg",
    tech: ["Streamlit", "WebRTC", "MediaPipe", "OpenCV", "Groq API", "TTS Engine", "SQLite", "Pandas"]
  },
  {
    id: 3,
    name: "HackSynth",
    description: "HackSynth is a modular autonomous agent platform designed to orchestrate complex task execution within secure environments. The system utilizes a backend-driven run-loop featuring dedicated planner, summarizer, and executor modules to manage workflows end-to-end. Commands and operations are isolated inside a dedicated Docker sandbox service, ensuring safe and reliable execution. Its modern web frontend provides real-time interaction and monitoring, with the entire multi-service ecosystem containerized for consistent local and cloud deployments.",
    liveUrl: "https://hacksynth-ui.onrender.com/dashboard",
    icon: "/icons/project-3.png",
    video: "/videos/project-3.mp4",
    poster: "/videos/project-3.jpg",
    tech: ["React", "Vite", "Python", "FastAPI", "Docker", "Docker Compose", "Render"]
  },
  {
    id: 4,
    name: "StayNest",
    description: "StayNest is a full-stack vacation rental platform designed for seamless property discovery and booking. Built using the Model-View-Controller (MVC) architectural pattern, it provides complete CRUD functionality for property owners and guests, alongside role-based access control and user authentication via Passport.js. The application enhances user interaction with integrated MapTiler geolocation maps, Cloudinary-powered image hosting, and an interactive review and rating system. Robust backend operations are reinforced by schema-level validation with Joi, session-based state management, and centralized error handling.",
    liveUrl: "https://staynest-xzt0.onrender.com/listings",
    icon: "/icons/project-4.png",
    video: "/videos/project-4.mp4",
    poster: "/videos/project-4.jpg",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Passport.js", "Joi", "MapTiler SDK", "Cloudinary", "Bootstrap 5", "EJS"]
  },
  {
    id: 5,
    name: "ai-youtube-analyzer",
    description: "ai-youtube-analyzer is an intelligent agentic tool designed to extract, interpret, and summarize YouTube video content. Utilizing the Agno framework, the platform orchestrates autonomous AI workflows equipped with reasoning and memory to inspect transcripts and video metadata. It leverages automated AI pipelines to transform hours of video footage into structured overviews, key takeaways, and concise summaries. The solution is wrapped in an interactive Streamlit web interface, offering users an effortless way to analyze videos quickly without manual watch time.",
    liveUrl: "https://agentic-yt-analyzer.streamlit.app/",
    icon: "/icons/project-5.png",
    video: "/videos/project-5.mp4",
    poster: "/videos/project-5.jpg",
    tech: ["Streamlit", "Agno Framework", "Python", "REST APIs", "Video Transcription"]
  },
  {
    id: 6,
    name: "AI Personal Assistant & Summarizer",
    description: "AI Personal Assistant & Summarizer is a lightweight Flask web application that serves as an intelligent assistant for answering questions and summarizing text or emails. It integrates with OpenRouter's API using the OpenAI Python client, providing unified access to multiple backend AI providers. To maximize availability and circumvent API rate limits (HTTP 429), the application implements an automatic model-fallback pipeline that rotates through a prioritized list of provider endpoints. The user interface is cleanly served via Flask's templating engine and exposes RESTful endpoints for real-time querying.",
    liveUrl: "https://aiassistant-dn.vercel.app/",
    icon: "/icons/project-6.png",
    video: "/videos/project-6.mp4",
    poster: "/videos/project-6.jpg",
    tech: ["Python", "Flask", "OpenRouter API", "OpenAI SDK", "REST API", "Jinja2", "JavaScript", "HTML5", "CSS3", "python-dotenv"]
  }
];

export default projects;
