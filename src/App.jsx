import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [roleIndex, setRoleIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
  const roles = ["AI & ML Enthusiast", "Problem Solver", "Software Engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 80 && rect.bottom >= 80;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: "Hybrid Real-Time Emotion Detection System",
      description: "Integrated DeepFace library with a custom fine-tuned CNN model for robust, real-time multi-face emotion recognition. Demonstrates transfer learning and deployment of computer vision models.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "DeepFace"],
      link: "#"
    },
    {
      title: "Real-Time Image Captioning System using BLIP",
      description: "Built a high-performance system using PyTorch and BLIP (HuggingFace Transformers) for real-time webcam image captioning. Features GPU acceleration, beam search decoding for coherent descriptions.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
      tech: ["Python", "PyTorch", "Transformers", "OpenCV", "Pillow"],
      link: "#"
    },
    {
      title: "Stealth Auto Typer with Human-like Behavior",
      description: "Developed a GUI-based auto-typing application using Python (Tkinter) that simulates highly realistic human typing, including random delays, simulated typos, auto-correction, and CPU load detection.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tech: ["Python", "Tkinter", "ctypes", "psutil"],
      link: "#"
    }
  ];

  const education = [
    {
      degree: "B.Tech CSE (Data Science & AI)",
      school: "Dr. M.G.R. Educational and Research Institute",
      year: "2022 - Present",
      location: "Chennai, Tamil Nadu, India",
      gpa: "CGPA: 7.5 (3rd semester)",
      description: "Pursuing a Bachelor's degree in Computer Science and Engineering with a specialization in Data Science & AI. Exploring Data Engineering and AI-driven solutions through projects and research.",
      achievements: [
        "Gained strong academic foundation and problem-solving skills",
        "Actively participated in projects and collaborative learning",
        "Developed consistent interest in technology and innovation"
      ],
      courses: ["Programming", "Databases", "Data Science", "Operating Systems", "Problem Solving"],
      link: "https://drmgrdu.ac.in/",
      icon: "https://drmgrdu.ac.in/images/logo.png"
    },
    {
      degree: "Higher Secondary (12th Grade)",
      school: "Jawahar Higher Secondary School (CBSE)",
      year: "2022 - 2023",
      location: "Neyveli, Tamil Nadu, India",
      gpa: "72% - percentage",
      description: "Completed Higher Secondary education with a focus on Computer Science and Mathematics. Built a strong foundation in logical reasoning and problem solving.",
      achievements: [
        "Learned programming (Python, C++) fundamentals",
        "Developed interest in technology and AI",
        "Built strong foundation in mathematics"
      ],
      courses: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
      link: "https://jawaharcbse.in/",
      icon: null
    },
    {
      degree: "Secondary (10th Grade)",
      school: "Jawahar Higher Secondary School (CBSE)",
      year: "2020 - 2021",
      location: "Neyveli, Tamil Nadu, India",
      gpa: "77% - percentage",
      description: "Successfully completed 10th grade, developing a strong interest in science and technology.",
      achievements: [
        "Completed with strong foundation in core subjects",
        "Developed curiosity for technology",
        "Built basics in science and mathematics"
      ],
      courses: ["Science", "Mathematics", "Social Studies", "English"],
      link: "https://jawaharcbse.in/",
      icon: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } 
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 } 
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gray-900 text-base">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-48 h-48 rounded-full blur-3xl bg-purple-500/20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl bg-pink-500/20"
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-lg bg-gray-900/40 border-gray-700/50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-lg md:text-xl font-bold"
              style={{ color: '#FF6B00' }}
              whileHover={{ scale: 1.05 }}
            >
              SANJAI
            </motion.div>
            
            <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {['home', 'about', 'projects', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize font-medium text-sm cursor-pointer transition-colors duration-200 text-gray-300 hover:text-purple-400"
                  style={activeSection === item ? { color: '#FF6B00' } : {}}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-purple-400">
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-purple-400">
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl w-full"
        >
          <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Hi there I'm Sanjai
          </motion.h1>
            
          <div className="h-12 mb-4 mx-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl font-semibold text-purple-400"
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            AI & ML Enthusiast crafting intelligent solutions for real-world problems.
          </motion.p>

          <div className="flex flex-col items-center justify-center"> 
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg font-semibold text-sm bg-purple-600/50 text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-150"
            >
              Download Resume
            </motion.button>
            
            <motion.a
              href="#about"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              className="mt-8 inline-flex flex-col items-center cursor-pointer text-gray-400 hover:text-purple-400"
            >
              <ChevronDown className="w-6 h-6" />
              <p className="text-sm mt-1">Scroll Down</p>
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl w-full"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400"
          >
            About Me
          </motion.h2>

          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 items-start"
          >
            <div className="md:col-span-1 flex justify-center">
              <div className="relative p-1 rounded-xl bg-purple-600/50 w-full max-w-xs">
                <div className="relative w-full" style={{ paddingBottom: '133.33%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="p-6 rounded-xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 shadow-lg">
                <p className="text-sm md:text-base leading-relaxed mb-4 text-gray-300">
                  Hi there! I'm Sanjai P A, a B.Tech student specializing in Computer Science and Engineering with a strong focus on AI & Machine Learning. I'm passionate about transforming ideas into real-world solutions using technology, data, and code. My curiosity for problem-solving has guided me to explore intelligent applications that make an impact.
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-4 text-gray-300">
                  Through academic projects and personal experiments, I've gained hands-on experience in Python, OpenCV, Tkinter, TensorFlow, Keras, and real-time automation systems. From building an emotion detection system using live video to designing stealthy automation tools, I enjoy blending creativity with technical skills to solve challenging problems.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-300">
                  Beyond coding, I love exploring emerging technologies, experimenting with AI & automation, and constantly learning how software can enhance everyday life. I thrive in collaborative environments and look forward to contributing my skills to innovative projects and meaningful solutions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 shadow-lg hover:border-purple-400/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm font-semibold text-white">Chennai, India</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 shadow-lg hover:border-purple-400/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">College</p>
                      <p className="text-sm font-semibold text-white">Dr. MGR University</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" className="min-h-screen py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400"
          >
            My Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                className="rounded-md overflow-hidden shadow-lg transition-all duration-300 bg-gray-800/40 backdrop-blur-lg border border-gray-700/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-base md:text-lg font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-purple-600/50 text-white hover:scale-103 transition-transform duration-150"
                    whileHover={{ scale: 1.03 }}
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="education" className="min-h-screen py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400"
          >
            My Education
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-7 rounded-2xl transition-all duration-300 bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-start gap-3 mb-4">
                  {edu.icon ? (
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🎓</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎓</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white leading-tight mb-1.5">{edu.degree}</h3>
                    <a 
                      href={edu.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-400 font-semibold hover:text-purple-300 transition-colors text-xs flex items-center gap-1"
                    >
                      {edu.school}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-3 border-b border-gray-700/50">
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>{edu.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span className="text-right">{edu.location}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {edu.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-xs font-bold text-white mb-2.5">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-purple-400 mt-0.5 text-xs">●</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white mb-2.5">Relevant Courses:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="min-h-screen py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400"
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-gray-300 mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                </p>
                
                <div className="space-y-4">
                  <motion.a
                    href="mailto:your.email@example.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-semibold">sanjai@example.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/yourusername"
                    target="_blank"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">GitHub</p>
                      <p className="font-semibold">@yourusername</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">LinkedIn</p>
                      <p className="font-semibold">Sanjai P A</p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50"
            >
              <h3 className="text-xl font-bold text-white mb-5">Send a Message</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm bg-purple-600/50 text-white border border-purple-400/50 shadow-lg hover:shadow-orange-500/50 transition-all duration-150"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <footer className="py-4 text-center text-[10px] text-gray-400 backdrop-blur-sm">
        <p>© 2025 Sanjai P A. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;