import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import emailjs from '@emailjs/browser';

emailjs.init('-PMLg8tkfHdrZTZJr');

const SECTION_IDS = ["home", "about", "skills", "projects", "education", "contact"];
const ROLES = ["AI & ML Enthusiast", "Problem Solver", "Software Engineer"];

const SKILLS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React / R3F", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

const TOOLS = [
  { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "n8n", icon: "https://n8n.io/favicon.ico" },
];

const PROJECTS = [
  {
    title: "Real-Time Emotion Detection System",
    description:
      "Real-time webcam emotion detection combining MTCNN and Haar Cascade for face detection. Uses Mini-XCEPTION model trained on FER2013 dataset with confidence scoring.",
    fullStory: "Imagine a computer that can understand how you feel just by looking at your face — that's what this project aims to achieve. I built a real-time system that reads emotions from a live webcam feed, almost like giving the machine a basic emotional awareness.\n\nThe process starts by detecting your face instantly using MTCNN and Haar Cascade, two popular computer-vision techniques known for their speed and accuracy. Once the face is detected, the system uses a deep-learning model called Mini-XCEPTION, trained on the FER2013 dataset, to classify emotions like happiness, sadness, anger, surprise, and more.\n\nEvery frame from the webcam is analyzed within milliseconds, and the result appears along with a confidence score. The system feels interactive — when you smile, it reacts; when you frown, it changes instantly.\n\nThis project combines real-time processing, computer vision, and emotion AI, showing how machines can understand humans in a more natural and intuitive way.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "MTCNN"],
    link: "https://github.com/sanjai0727/Emotion-Detection-From-Realtime-Video",
  },
  {
    title: "AI-Powered Webcam Image Captioning",
    description:
      "Offline AI image captioning using Salesforce BLIP model with live webcam capture. Features GPU auto-detection (CUDA), beam search decoding, and optimized 384×384 preprocessing.",
    fullStory: "This project brings together computer vision and natural language generation in a single offline AI tool. The idea was simple: can a computer look at a scene through the webcam and explain what it sees in words?\n\nThe system captures an image from the webcam and passes it to the Salesforce BLIP model, a powerful AI model capable of generating human-like descriptions of images. What makes this tool special is that it works completely offline — no servers, no API calls, everything runs locally.\n\nIt intelligently detects whether your system has a GPU (CUDA) and speeds up caption generation automatically. The images are pre-processed at 384×384 resolution for better accuracy, and beam search decoding ensures that the generated captions are not just quick but also meaningful.\n\nThe experience feels almost magical: click a button, the AI \"observes\" the image, and then tells you exactly what it thinks is happening. It demonstrates the power of multimodal AI — understanding both visuals and language at the same time.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80&auto=format&fit=crop",
    tech: ["Python", "PyTorch", "Transformers", "OpenCV", "BLIP"],
    link: "https://github.com/sanjai0727/aicamera_local",
  },
  {
    title: "Human-Mode Auto Typer",
    description:
      "Smart typing automation mimicking human behavior with natural delays, random typos, auto-correction, and CPU-aware pausing. Features hotkey controls and real-time status updates.",
    fullStory: "This project was built around one idea: typing automation shouldn't look robotic. Instead of typing at an unnatural machine-perfect speed, what if an auto-typer behaved just like a human?\n\nThe Human-Mode Auto Typer simulates realistic typing by introducing natural variations — sometimes typing faster, sometimes slower, occasionally making typos and then fixing them just like a real person would. It even pauses automatically when CPU usage gets too high, preventing lag or stutter.\n\nThe system is controlled with global hotkeys, making it convenient to start or stop instantly. A small status display keeps you updated on what the typer is doing in real time.\n\nThis tool showcases how automation can feel \"alive.\" It doesn't just type words; it mimics the imperfections of a real human, making the output indistinguishable from actual typing. It's useful for productivity, testing, demonstrations, and any workflow that benefits from ultra-realistic automated typing.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
    tech: ["Python", "Tkinter", "psutil", "keyboard"],
    link: "https://github.com/sanjai0727/AutoTyper-HumanMode",
  },
  {
    title: "Pocket AI",
    description:
      "Offline AI assistant powered by Phi-3 Mini and Phi-3 Vision with private text, voice, and image processing.",
    fullStory:
      "Pocket AI is a fully offline, privacy-first personal assistant built to run smoothly even on low-power devices like the Raspberry Pi 5. All processing happens locally — from voice recognition to image analysis — ensuring your data never leaves your device.\n\nThe assistant uses Phi-3 Mini for fast, natural text and voice conversations, paired with the Vosk engine for offline speech-to-text. For visual tasks, it switches to Phi-3 Vision, allowing it to understand objects, scenes, and labels captured through the connected camera.\n\nEverything is integrated into a clean, modern React dashboard that displays system status, conversation history, and customizable privacy modes. You can run Pocket AI in strict OFFLINE_ONLY mode for complete isolation or enable HYBRID mode to combine local and cloud intelligence.\n\nDesigned for makers, students, and privacy enthusiasts, Pocket AI demonstrates the power of local multimodal AI — giving you a portable, intelligent companion that works anywhere, even with no internet.",
    image: "/pocket_ai.png",
    tech: ["Python", "FastAPI", "Phi-3 Mini / Phi-3 Vision", "Vosk (Offline STT)"],
    link: "https://github.com/sanjai0727/Pocket_AI",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech CSE (Data Science & AI)",
    school: "Dr. M.G.R. Educational and Research Institute",
    year: "2023 - Present",
    location: "Chennai, Tamil Nadu, India",
    gpa: "CGPA: 7.5 (3rd semester)",
    description:
      "Pursuing a Bachelor's degree in Computer Science and Engineering with a specialization in Data Science & AI. Exploring Data Engineering and AI-driven solutions through projects and research.",
    achievements: [
      "Gained strong academic foundation and problem-solving skills",
      "Actively participated in projects and collaborative learning",
      "Developed consistent interest in technology and innovation",
    ],
    courses: [
      "Programming",
      "Databases",
      "Data Science",
      "Operating Systems",
      "Problem Solving",
    ],
    link: "https://drmgrdu.ac.in/",
  },
  {
    degree: "Higher Secondary (12th Grade)",
    school: "Jawahar Higher Secondary School (CBSE)",
    year: "2022 - 2023",
    location: "Neyveli, Tamil Nadu, India",
    gpa: "72%",
    description:
      "Completed Higher Secondary education with a focus on Computer Science and Mathematics. Built a strong foundation in logical reasoning and problem solving.",
    achievements: [
      "Learned programming (Python, C++) fundamentals",
      "Developed interest in technology and AI",
      "Built strong foundation in mathematics",
    ],
    courses: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
    link: "https://jawaharcbse.in/",
  },
  {
    degree: "Secondary (10th Grade)",
    school: "Jawahar Higher Secondary School (CBSE)",
    year: "2020 - 2021",
    location: "Neyveli, Tamil Nadu, India",
    gpa: "77%",
    description:
      "Successfully completed 10th grade, developing a strong interest in science and technology.",
    achievements: [
      "Completed with strong foundation in core subjects",
      "Developed curiosity for technology",
      "Built basics in science and mathematics",
    ],
    courses: ["Science", "Mathematics", "Social Studies", "English"],
    link: "https://jawaharcbse.in/",
  },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handle = () => {
      const current = SECTION_IDS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (s / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function LiquidGlass({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,.25)] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.01] via-pink-500/[0.01] to-purple-500/[0.01]" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)'
      }} />
      <div className="relative">{children}</div>
    </div>
  );
}

function FloatingNebula() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none">
      {/* Large floating nebula orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.6]"
        style={{
          background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)`,
        }}
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          rotate: [360, 180, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.6]"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)',
          transform: `translate(${-mousePos.x * 0.04}px, ${-mousePos.y * 0.04}px)`,
        }}
      />

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -50, 0],
          rotate: [0, -180, -360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/2 right-1/3 w-[450px] h-[450px] rounded-full blur-3xl opacity-[0.6]"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.035}px, ${-mousePos.y * 0.035}px)`,
        }}
      />

      {/* Smaller floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          className="absolute w-32 h-32 rounded-full blur-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${['rgba(255,165,0,0.2)', 'rgba(236,72,153,0.2)', 'rgba(168,85,247,0.2)'][i % 3]
              } 0%, transparent 70%)`,
            transform: `translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`,
          }}
        />
      ))}
    </div>
  );
}

function CursorParticles() {
  const [particles, setParticles] = useState([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        color: ['orange', 'pink', 'purple'][Math.floor(Math.random() * 3)],
        size: Math.random() * 8 + 4,
      };

      setParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -30 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`absolute rounded-full blur-sm`}
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            background:
              particle.color === 'orange'
                ? 'radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,165,0,0) 70%)'
                : particle.color === 'pink'
                  ? 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)'
                  : 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)',
            boxShadow:
              particle.color === 'orange'
                ? '0 0 20px rgba(255,165,0,0.6)'
                : particle.color === 'pink'
                  ? '0 0 20px rgba(236,72,153,0.6)'
                  : '0 0 20px rgba(168,85,247,0.6)',
          }}
        />
      ))}
    </div>
  );
}

function AnimatedBackground() {
  const NUM_STARS = 250;
  const [stars, setStars] = useState([]);

  // State for raw cursor coordinates (in pixels)
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const getStarColor = useCallback((color) => {
    switch (color) {
      case 'orange': return 'rgba(255, 165, 0, ';
      case 'pink': return 'rgba(236, 72, 153, ';
      case 'purple': return 'rgba(168, 85, 247, ';
      default: return 'rgba(255, 255, 255, ';
    }
  }, []);

  useEffect(() => {
    const generateStars = () => {
      let newStars = [];
      for (let i = 0; i < NUM_STARS; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.5,
          twinkleSpeed: Math.random() * 2 + 1,
          color: ['orange', 'pink', 'purple', 'white'][Math.floor(Math.random() * 4)],
          initialDelay: Math.random() * 5,
          depth: Math.random() * 0.15 + 0.05,
        });
      }
      setStars(newStars);
    };

    const handleResize = () => {
      generateStars();
    };

    generateStars();
    window.addEventListener('mousemove', setMouseCoords); // Use direct function reference
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', setMouseCoords);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate center once to normalize cursor movement
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Cursor delta from center (in pixels)
  const mouseDeltaX = mouseCoords.x - centerX;
  const mouseDeltaY = mouseCoords.y - centerY;

  return (
    <>
      {/* Background color and subtle gradient (Lowest Z-index) */}
      <div className="fixed inset-0 -z-20 bg-[#0b0b0b]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5" />
      </div>

      {/* Interactive Starfield (Z-Index 1 - placed ABOVE nebulae) */}
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        {stars.map((star) => {
          const colorBase = getStarColor(star.color);

          // Calculate parallax displacement directly
          const offsetX = mouseDeltaX * star.depth * 0.5;
          const offsetY = mouseDeltaY * star.depth * 0.5;

          return (
            <motion.div
              key={star.id}
              initial={{
                x: star.x - star.size / 2,
                y: star.y - star.size / 2,
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                // Twinkle animation using Framer Motion (fast and reliable)
                opacity: [star.opacity, star.opacity + 0.4, star.opacity],
                scale: [1, 1.3, 1],
                // Parallax translation using Framer Motion (efficient for transforms)
                translateX: offsetX,
                translateY: offsetY,
              }}
              transition={{
                opacity: { duration: star.twinkleSpeed, repeat: Infinity, ease: "easeInOut", delay: star.initialDelay },
                scale: { duration: star.twinkleSpeed / 2, repeat: Infinity, ease: "easeInOut", delay: star.initialDelay },
                // Smooth spring transition for parallax reaction
                translateX: { type: "spring", stiffness: 100, damping: 20 },
                translateY: { type: "spring", stiffness: 100, damping: 20 },
              }}
              className="absolute rounded-full will-change-transform"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: `radial-gradient(circle, ${colorBase}${star.opacity}) 0%, ${colorBase}0) 70%)`,
                boxShadow: `0 0 ${star.size * 4}px ${colorBase}${star.opacity * 0.9})`,
              }}
            />
          );
        })}
      </div>

      {/* Floating Blobs (Nebula-like elements) - now behind the stars */}
      <div className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.6]"
          style={{
            background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)',
          }}
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.6]"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-[0.6]"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Shooting Stars - now behind the stars */}
      <div className="fixed inset-0 -z-[5] overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: '-20%', x: `${Math.random() * 100}%` }}
            animate={{
              y: ['-20%', '120%'],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
            className="absolute w-0.5 h-12 rounded-full"
            style={{
              background: `linear-gradient(to bottom, transparent, ${['rgba(255,165,0,0.7)', 'rgba(236,72,153,0.7)', 'rgba(168,85,247,0.7)'][i % 3]}, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern - lowest layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.08]">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </>
  );
}

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 h-1 z-[90] w-full bg-transparent">
      <motion.div
        style={{ width: `${progress}%` }}
        className="h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
      />
    </div>
  );
}

function FloatingNav({ active }) {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linksRef = useRef({});

  useEffect(() => {
    const updateUnderline = () => {
      if (!navRef.current || !active) return;

      const activeElement = linksRef.current[active];
      if (!activeElement) return;

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeElement.getBoundingClientRect();

      setUnderlineStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    const timer = setTimeout(updateUnderline, 50);

    return () => {
      window.removeEventListener('resize', updateUnderline);
      clearTimeout(timer);
    };
  }, [active]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-5 left-0 right-0 z-[90] flex justify-center px-4"
    >
      <div className="w-full max-w-6xl">
        <LiquidGlass>
          <div className="flex justify-between items-center px-8 py-3 text-[15px]">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Sanjai
            </div>

            <div ref={navRef} className="hidden md:flex items-center gap-8 relative">
              {SECTION_IDS.map((id) => (
                <a
                  key={id}
                  ref={(el) => (linksRef.current[id] = el)}
                  href={`#${id}`}
                  onClick={(e) => scrollToSection(e, id)}
                  className={`relative capitalize transition-colors py-1 ${active === id
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {id}
                </a>
              ))}
              {underlineStyle.width > 0 && (
                <motion.span
                  className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-orange-400 to-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  initial={false}
                  animate={{
                    left: underlineStyle.left,
                    width: underlineStyle.width,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://github.com/sanjai0727"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sanjai27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <button
                onClick={(e) => scrollToSection(e, 'contact')}
                className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(255,107,0,.6)] transition-all"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </motion.nav>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", t, { passive: true });
    return () => window.removeEventListener("scroll", t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="fixed bottom-8 right-8 z-[95] rounded-full border border-white/20 bg-white/[0.03] p-3 text-gray-900 dark:text-purple-200 backdrop-blur-2xl shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Snackbar({ show, message, type }) {
  const bgColor = type === 'error'
    ? "bg-red-500/30 dark:bg-red-800/30 text-red-900 dark:text-red-200 border-red-500/50"
    : "bg-green-500/30 dark:bg-green-800/30 text-green-900 dark:text-green-200 border-green-500/50";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl border px-5 py-2.5 text-sm backdrop-blur-2xl shadow-lg ${bgColor}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="scroll-mt-28 min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent pb-2"
        style={{
          textShadow: '0 0 40px rgba(236,72,153,0.3)',
          lineHeight: '1.1'
        }}
      >
        Hi, I'm Sanjai
      </motion.h1>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-6 text-xl md:text-2xl font-semibold text-purple-600 dark:text-purple-300"
        style={{
          lineHeight: '1.2'
        }}
      >
        <Typewriter words={ROLES} loop cursor cursorStyle="_" typeSpeed={90} deleteSpeed={60} delaySpeed={2000} />
      </motion.div>
      <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        AI & ML Enthusiast crafting intelligent solutions for real-world problems.
      </motion.p>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4">
        <motion.a
          href="/sanjai_resume.pdf"
          download
          whileHover={{ scale: 1.03 }}
          className="rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,.25)] hover:shadow-[0_0_30px_rgba(236,72,153,.5)] transition-all"
        >
          Download Resume
        </motion.a>
        <motion.button
          onClick={(e) => scrollToSection(e, 'projects')}
          whileHover={{ scale: 1.03 }}
          className="rounded-xl border border-white/20 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-2xl shadow-[0_8px_30px_rgba(168,85,247,.25)] hover:shadow-[0_0_30px_rgba(168,85,247,.4)] transition-all cursor-pointer"
        >
          View Projects
        </motion.button>
      </motion.div>
      <motion.button
        onClick={(e) => scrollToSection(e, 'about')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-8 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
      >
        <ChevronDown className="mx-auto h-6 w-6" />
        <div className="text-xs mt-1">Scroll Down</div>
      </motion.button>
    </section>
  );
}

function SectionBox({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400"
          style={{
            textShadow: '0 0 40px rgba(236,72,153,0.2)',
            lineHeight: '1.1' // FIX: Applied line-height here to fix clipped descenders in section headings
          }}
        >
          {title}
        </motion.h2>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <LiquidGlass className="p-6 md:p-8">{children}</LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const profileImageUrl = "/sanjai.jpg";

  return (
    <SectionBox id="about" title="About Me">
      <div className="grid items-center gap-8 md:grid-cols-7">
        <div className="md:col-span-2">
          <LiquidGlass className="p-2">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "130%" }}>
              <img
                src={profileImageUrl}
                alt="Profile"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&auto=format&fit=crop";
                }}
              />
            </div>
          </LiquidGlass>
        </div>

        <div className="md:col-span-5 space-y-4">
          <LiquidGlass className="p-7 md:p-8">
            <div className="space-y-5">
              <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Hi! I'm <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Sanjai P A</span>, a B.Tech Computer Science and Engineering student who loves turning innovative ideas into practical, real-world solutions. I'm deeply passionate about AI, automation, and intelligent systems, and I enjoy exploring how technology can make life smarter, faster, and more efficient.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I've worked with <span className="font-semibold text-purple-600 dark:text-purple-400">Python, OpenCV, TensorFlow, Keras, and Tkinter</span>, building projects like live emotion detection systems and automation tools that simplify complex tasks. Blending creativity with technical expertise, I love solving problems and crafting meaningful tech experiences.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I'm always excited to <span className="font-semibold text-orange-600 dark:text-orange-400">learn, collaborate, and build projects</span> that make a real impact.
              </p>
            </div>
          </LiquidGlass>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LiquidGlass className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-700 dark:text-purple-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Chennai, India</p>
                </div>
              </div>
            </LiquidGlass>

            <LiquidGlass className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-700 dark:text-purple-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">College</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Dr. M.G.R. Educational and Research Institute</p>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </SectionBox>
  );
}

function Skills() {
  return (
    <SectionBox id="skills" title="Professional Skillset & Tools">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <LiquidGlass className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(168,85,247,.4)] transition-all duration-300">
                  <img src={skill.icon} alt={skill.name} className="h-12 w-12 object-contain" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">{skill.name}</p>
                </LiquidGlass>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Tools I Used</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <LiquidGlass className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(168,85,247,.4)] transition-all duration-300">
                  <img src={tool.icon} alt={tool.name} className="h-12 w-12 object-contain" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">{tool.name}</p>
                </LiquidGlass>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionBox>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <SectionBox id="projects" title="Projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <LiquidGlass className="overflow-hidden p-0 hover:shadow-[0_0_40px_rgba(168,85,247,.5)] transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3" style={{ lineHeight: '1.25' }}>{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t, k) => (
                      <span key={k} className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-purple-600/70 dark:bg-purple-600/60 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(168,85,247,.5)]"
                    >
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="inline-flex items-center gap-2 rounded-md border border-purple-500/50 bg-purple-500/10 dark:bg-purple-500/5 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 transition hover:scale-[1.03]"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </SectionBox>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            >
              <LiquidGlass className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6">
                  <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t, k) => (
                    <span key={k} className="rounded-full bg-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-700 dark:text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.fullStory.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,.5)]"
                >
                  View on GitHub <ExternalLink className="h-4 w-4" />
                </a>
              </LiquidGlass>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Education() {
  return (
    <SectionBox id="education" title="My Education">
      <div className="grid items-start gap-8 md:grid-cols-3">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <LiquidGlass className="p-6 h-full hover:shadow-[0_0_30px_rgba(168,85,247,.3)] transition-all duration-300">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">{edu.year} • {edu.location}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{edu.degree}</h3>
              <a
                href={edu.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:opacity-90"
              >
                {edu.school}
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3" style={{ lineHeight: '1.25' }}>{edu.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Key Achievements</h4>
                <ul className="space-y-1.5">
                  {edu.achievements.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400 mt-0.5">●</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Relevant Courses</h4>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c, idx) => (
                    <span key={idx} className="rounded-md border border-white/20 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-900 dark:text-gray-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        ))}
      </div>
    </SectionBox>
  );
}

function Contact({ formData, setFormData, handleSubmit, isSubmitting, submitStatus }) {
  return (
    <SectionBox id="contact" title="Get In Touch">
      <div className="grid gap-10 md:grid-cols-2">
        <LiquidGlass className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I'm open to new projects, creative ideas, and opportunities. Reach out and let's build something great.
          </p>
          <div className="space-y-4">
            <a href="mailto:sanjaiarunraju791@gmail.com" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:opacity-90 transition-opacity">
              <div className="h-12 w-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.03] backdrop-blur-xl">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">sanjaiarunraju791@gmail.com</p>
              </div>
            </a>
            <a href="https://github.com/sanjai0727" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:opacity-90 transition-opacity">
              <div className="h-12 w-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.03] backdrop-blur-xl">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">GitHub</p>
                <p className="font-semibold text-gray-900 dark:text-white">@sanjai0727</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/sanjai27" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:opacity-90 transition-opacity">
              <div className="h-12 w-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.03] backdrop-blur-xl">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">LinkedIn</p>
                <p className="font-semibold text-gray-900 dark:text-white">Sanjai P A</p>
              </div>
            </a>
          </div>
        </LiquidGlass>

        <LiquidGlass className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Send a Message</h3>

          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-lg text-sm ${submitStatus.type === 'success'
                ? 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/50'
                : 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/50'
                }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full rounded-lg border border-white/20 bg-white/[0.03] px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-white/20 bg-white/[0.03] px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message here..."
                className="w-full resize-none rounded-lg border border-white/20 bg-white/[0.03] px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg border border-white/20 py-2.5 text-sm font-semibold text-white transition-all ${isSubmitting
                ? 'bg-gray-500/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(255,107,0,.35)] hover:shadow-[0_0_30px_rgba(255,107,0,.5)]'
                }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </LiquidGlass>
      </div>
    </SectionBox>
  );
}

export default function Portfolio() {
  const active = useActiveSection();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [snack, setSnack] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields!',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Sanjai P A',
      to_email: 'r5v55.portfolio@testmail.app',
    };

    try {
      await emailjs.send(
        'service_ww0lyil',
        'template_tjdy3qn',
        templateParams,
        '-PMLg8tkfHdrZTZJr'
      );

      try {
        const autoReplyParams = {
          to_name: formData.name,
          to_email: formData.email,
          from_name: 'Sanjai P A',
          user_email: formData.email,
          reply_to: formData.email,
        };

        await emailjs.send(
          'service_ww0lyil',
          'template_y8pqh5q',
          autoReplyParams,
          '-PMLg8tkfHdrZTZJr'
        );
      } catch (autoReplyError) {
        console.error('Auto-reply failed:', autoReplyError);
      }

      setFormData({ name: '', email: '', message: '' });
      setSnack(true);
      setSubmitStatus({
        type: 'success',
        message: '✅ Message sent successfully! Check your email for confirmation.',
      });
      setTimeout(() => setSnack(false), 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSnack(true);
      setSubmitStatus({
        type: 'error',
        message: `❌ Failed to send message. Please try again or email me directly.`,
      });
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 7000);
      setTimeout(() => setSnack(false), 5000);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-900 dark:text-white transition-colors overflow-x-hidden">
      <AnimatedBackground />
      <FloatingNebula />
      <CursorParticles />
      <ScrollProgressBar />
      <FloatingNav active={active} />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />

      <ScrollToTop />
      <Snackbar show={snack} message={submitStatus.message} type={submitStatus.type} />

      <footer className="relative py-8 text-center text-[11px] text-gray-700 dark:text-gray-400">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]" />
        <p>© 2025 Sanjai P A. All rights reserved.</p>
      </footer>
    </div>
  );
}