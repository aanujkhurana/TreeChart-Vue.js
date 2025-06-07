[![Vue Version](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Vite Version](https://img.shields.io/badge/Vite-4.x-yellow.svg)](https://vitejs.dev)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![D3 Version](https://img.shields.io/badge/D3-7.x-orange.svg)](https://d3js.org/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/anujkhurana/treechart-playground/pulls)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ee1abb85-9b39-42a4-8c7a-63ccbb89c77c/deploy-status)](https://app.netlify.com/projects/treechartplayground/deploys)

# TreeChart Playground
A highly customized version of the d3-org-chart. It provides a flexible and visually appealing way to display hierarchical data in a tree-chart format.

TreeChart Playground is a visual, Org Chart built with **Vue 3**, **D3**, and **Express.js**. Users can view, explore, and dynamically add new nodes to the chart with data persisted on a backend server.

## 🔗 Live Demo

**Frontend**: [treechartplayground.netlify.app](https://treechartplayground.netlify.app)

**Backend**: [tree-chart-backend.onrender.com](https://tree-chart-backend.onrender.com)  
_(Render takes ~50 seconds to cold start)_

---

## 🛠 Tech Stack

### Frontend
- [Vue 3 + `<script setup>`](https://vuejs.org/)
- [D3.js](https://d3js.org/) (customized for organizational layout)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/) (deployment)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Render](https://render.com/) (cloud hosting)

---

## 📦 Project Structure

```bash
treechart-playground/
├── client/                 # Vue 3 frontend
│   ├── components/
│   ├── Chart/              # D3 logic, render, UI components
│   ├── App.vue
│   └── main.ts
├── service/                # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.js
│   └── db/                 # Local JSON-based storage
├── .env
├── ecosystem.config.js     # PM2 configuration
├── README.md
└── package.json
````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/treechart-playground.git
cd treechart-playground
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../service
npm install
```

### 4. Start the Development Servers

#### Backend

```bash
cd service
npm run dev
```

#### Frontend

```bash
cd ../client
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173)


## 🌐 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/api/nodes` | Fetch all nodes |
| POST   | `/api/nodes` | Add a new node  |

All data is saved in a flat JSON format under the `db/` directory.


## ⚙️ Environment Variables

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=https://tree-chart-backend.onrender.com
```

## 🔒 CORS Setup (Backend)

Express server uses [CORS middleware](https://www.npmjs.com/package/cors) to allow requests from:

```js
origin: ["http://localhost:5173", "https://treechartplayground.netlify.app"]
```

---

## 🧪 Future Improvements

* ✅ Editable nodes and inline updates
* 🛠 Drag & drop node rearrangement
* 🔍 Advanced search/filtering
* 🧱 Modular component system
* 🧾 Undo/redo history support

## How to Contribute

Contributions are welcome! If you have ideas for improvements or bug fixes, feel free to open an issue or submit a pull request.

## 📄 License

MIT License. Use freely for learning or commercial purposes.