# 🌌 3D Solar System Visualization using Three.js

This project is a stunning and interactive **3D visualization of our solar system**, built using [Three.js](https://threejs.org/). It displays realistic planets orbiting the sun with self-rotation, planetary rings, revolution speeds, and a star-filled background. It also comes with GUI controls for customization.

---

## 🚀 Features

- Realistic sun and planets with textures
- Planetary orbits and self-rotation
- Saturn and Uranus with rings
- Interactive GUI controls (rotation/revolution speed, orbit visibility, light mode)
- Animated stars in the background
- Responsive to window size

---

## Deployed App Link: `https://3d-solar-system-threejs.netlify.app/`

## 📁 Project Structure
solar-system/
├── index.html # Main HTML file
├── js/
│ └── solarSystem.js # Main JavaScript logic using Three.js
├── min.js/
│ └── dat.gui.min.js # dat.GUI for controls
├── image/ # Textures for planets, rings, background
│ ├── sun.jpg
│ ├── mercury.jpg
│ ├── venus.jpg
│ ├── earth.jpg
│ ├── mars.jpg
│ ├── jupiter.jpg
│ ├── saturn.jpg
│ ├── uranus.jpg
│ ├── neptune.jpg
│ ├── pluto.jpg
│ ├── saturn_ring.png
│ ├── uranus_ring.png
│ ├── stars.jpg
│ └── solar-system.png
└── readme.md # You're here!




---

## ⚙️ How to Run the Project

### ✅ Option 1: Using Live Server (Recommended)
1. Make sure you have [Visual Studio Code](https://code.visualstudio.com/) installed.
2. Install the "Live Server" extension.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. Your default browser will open the 3D Solar System.

### ✅ Option 2: Localhost with Python (Alternative)
1. Open terminal in the project root folder.
2. Run a local server:
   - For Python 3:  
     ```bash
     python -m http.server
     ```
   - For Python 2:
     ```bash
     python -m SimpleHTTPServer
     ```
3. Open your browser and go to:  
   `http://localhost:8000`

### ✅ Option 3: GitHub Pages (Online Hosting)
1. Push your project to a GitHub repository.
2. Go to **Settings > Pages**.
3. Set source as root or `/main` branch.
4. After deployment, open the generated URL.

---

## 🖼️ Screenshots

> *(Optional: Add screenshots here)*  
> Example: `C:\Users\Dell\Videos\Captures\solar.mp4`

---

## 🧠 Concepts Used

- **Three.js** WebGL 3D engine
- PerspectiveCamera, SphereGeometry, RingGeometry
- OrbitControls for navigation
- PointLight, AmbientLight for realistic lighting
- TextureLoader for planet maps
- `dat.GUI` for real-time parameter editing
- Particles and BufferGeometry for stars

---

### 🌟 Enjoy Exploring the Universe!


