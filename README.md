# Sanjai's Portfolio Website

Welcome to my personal portfolio website! This project is a modern, interactive showcase of my academic journey, technical skills, and projects in the fields of Data Science, Artificial Intelligence, and Software Engineering.

🔗 **Live Site**: [sanjaipa.in](https://sanjaipa.in)

---

## 🌌 Project Overview

This portfolio is designed to be more than just a resume; it's an immersive digital experience. Built with **React** and **Vite**, it features a futuristic "Space/Nebula" theme that reflects my passion for exploring the unknown frontiers of technology. The site leverages advanced animations and glassmorphism to create a premium, depth-rich user interface.

## 🎨 Visual Identity & Design

The design philosophy centers around a dark, atmospheric aesthetic:

*   **Theme**: Deep space background (`#0b0b0b`) populated with dynamic, parallax starfields and floating nebula orbs.
*   **Liquid Glass Effect**: Containers utilize a translucent, blurred "frosted glass" effect with subtle gradients (Orange to Pink to Purple), providing modern depth and hierarchy.
*   **Interactive Elements**:
    *   **Cursor Particles**: A trail of colorful particles follows the user's mouse movement.
    *   **Parallax Stars**: Background elements shift slightly based on cursor position, creating a 3D feel.
    *   **Animations**: Smooth entry transitions using `Framer Motion` and typewriter effects for dynamic text presentation.

## 🚀 Key Sections

1.  **Hero Section**:
    *   A bold introduction featuring a typing animation loop highlighting my roles: "AI & ML Enthusiast", "Problem Solver", "Software Engineer".
    *   Quick access to download my Resume or view my Projects.

2.  **About**:
    *   A personal introduction sharing my background and passion for technology.

3.  **Skills**:
    *   A visual grid of my technical proficiency, featuring icons for **Python**, **JavaScript/TypeScript**, **React**, **TensorFlow**, **Docker**, and more.

4.  **Projects**:
    *   A detailed showcase of my best work, including:
        *   **Real-Time Emotion Detection System**: Webcam-based emotion analysis using MTCNN and Mini-XCEPTION.
        *   **AI-Powered Webcam Image Captioning**: Offline image description generation using the Salesforce BLIP model.
        *   **Human-Mode Auto Typer**: A tool mimicking human typing patterns for automation.
        *   **Pocket AI**: A privacy-first, offline AI assistant powered by Phi-3 Mini.

5.  **Education**:
    *   A timeline of my academic path, from High School to my current B.Tech in CSE (Data Science & AI) at Dr. M.G.R. Educational and Research Institute.

6.  **Contact**:
    *   A fully functional contact form integrated with **EmailJS** for direct messaging.
    *   Direct links to my **GitHub** and **LinkedIn** profiles.

## 🛠️ Technology Stack

This project is built using a modern frontend stack:

*   **Framework**: [React 18](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/) - For lightning-fast development and building.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework.
*   **Animations**:
    *   [Framer Motion](https://www.framer.com/motion/) - For complex enter/exit animations and gestures.
    *   [React Simple Typewriter](https://www.npmjs.com/package/react-simple-typewriter) - For text typing effects.
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Email Service**: [EmailJS](https://www.emailjs.com/)
*   **3D Graphics**: [Three.js](https://threejs.org/)

---

## 💻 Local Development

To run this project locally on your machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sanjai0727/sanjai-portfolio.git
    cd sanjai-portfolio
    ```

2.  **Install Dependencies**:
    Make sure you have Node.js installed.
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` (or the port shown in your terminal).

---

## 🖥️ Production Deployment (PM2 + Nginx)

This project is deployed as a static site served via **PM2** and **serve**, sitting behind an **Nginx** reverse proxy with SSL.

### Prerequisites (on server)

```bash
node -v        # Node.js
npm install -g pm2
npm install -g serve
```

### 1. Clone & Install

```bash
git clone https://github.com/sanjai0727/sanjai-portfolio.git
cd sanjai-portfolio
npm install --omit=dev
```

### 2. Build

```bash
npm run build
```

### 3. Start with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup   # Run the command it outputs to enable auto-start on reboot
```

### 4. Nginx Reverse Proxy

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name sanjaipa.in www.sanjaipa.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 5. SSL with Let's Encrypt (Certbot)

```bash
sudo certbot --nginx -d sanjaipa.in -d www.sanjaipa.in
```

### 🔄 Redeploying Updates

```bash
git pull
npm run build
pm2 restart sanjai-portfolio
```

---

## 📄 License

This project is open source and available for personal use and modification.

---
*Built with ❤️ by Sanjai*
