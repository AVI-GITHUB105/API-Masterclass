# API Masterclass 🚀

API Masterclass is an interactive, browser-based learning environment built to help developers master REST APIs without the hassle of setting up local backends or installing dependencies. It provides a split-pane "Zen Mode" IDE where users can write real Javascript or Python code, execute it directly in the browser, and interact with live endpoints (powered by FreeAPI).

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features
- **In-Browser Execution**: Uses native `Function()` evaluation for JS and Pyodide (WebAssembly) for Python.
- **Real HTTP Requests**: Test real endpoints with real methods (GET, POST, PUT, DELETE, PATCH).
- **Curriculum Driven**: Progress through 6 modules ranging from Public APIs to Authentication and Ecommerce.
- **Distraction-Free Zen Mode**: Lock into your coding session with a full-screen, immersive IDE experience.
- **Dynamic Hints & Formatter**: Built-in `js-beautify` code formatter and context-aware hints that analyze your code as you type.

## 🛠️ Tech Stack
- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Python Execution**: Pyodide
- **Code Formatter**: js-beautify

## 🚀 Getting Started

If you want to run this project locally, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/api-masterclass.git
   cd api-masterclass
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port provided by Vite).

## 🤝 Contributing

We love open-source and welcome contributions from the community! Whether you are fixing a bug, adding a new API endpoint to the curriculum, or improving the UI, your help is appreciated.

### 💡 Idea for Contribution: The "3-Strike" Progressive Hint System
Currently, the hint system gives simple nudges. However, since the Terminal already handles basic API errors (like missing headers), a great community contribution would be to build an advanced, AST-parsing progressive hint system! 

The idea is to provide exactly 3 escalating hints per endpoint:
- **Hint 1 (Theory):** A theoretical hint using proper coding terminology (e.g., "Implement a callback function" or "Parse the response data").
- **Hint 2 (Methods):** Directing the user to specific methods or keywords (e.g., use `.then()`, `.json()`, or `requests.get`).
- **Hint 3 (Snippet):** A very limited, targeted code snippet for the exact line they are stuck on (not the entire solution).
- *Users are strictly limited to 3 hint clicks per endpoint to prevent over-reliance.*

If this sounds like a fun challenge, feel free to fork the repo, build this feature, and submit a Pull Request!

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for full details on how to get started, our code of conduct, and the pull request process.

## 💡 Acknowledgements
- **Curriculum & Endpoints**: Powered by the amazing [FreeAPI](https://freeapi.app/) project.
- **Inspiration**: Inspired by "Chai aur Code" and the need for better interactive learning tools.

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
*Created by [AVI-GITHUB105](https://github.com/AVI-GITHUB105)*
