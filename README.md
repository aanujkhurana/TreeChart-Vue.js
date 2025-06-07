# TreeChart Playground

A visual, interactive Org Chart builder built with **Vue 3**, **D3**, and **Express.js**. Users can view, explore, and dynamically add new nodes to the chart with data persisted on a backend server.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ee1abb85-9b39-42a4-8c7a-63ccbb89c77c/deploy-status)](https://app.netlify.com/projects/treechartplayground/deploys)

---

## 🔗 Live Demo

**Frontend**: [treechartplayground.netlify.app](https://treechartplayground.netlify.app)  
**Backend**: [tree-chart-backend.onrender.com](https://tree-chart-backend.onrender.com)  
_(Render takes ~50 seconds to cold start)_

---

## 🧩 Features

✅ Dynamic Org Chart powered by D3  
✅ Smooth zoom/pan and scale transitions  
✅ Add new nodes via a modern Vue form  
✅ Backend API with persistent JSON storage  
✅ Responsive design with collapsible sidebar  
✅ Node content rendered as custom Vue components  
✅ Accessible UI with keyboard and ARIA support  
✅ Cold-start friendly loading screen

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

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../service
npm install
```

---

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

---

## 🌐 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/api/nodes` | Fetch all nodes |
| POST   | `/api/nodes` | Add a new node  |

All data is saved in a flat JSON format under the `db/` directory.

---

## ⚙️ Environment Variables

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=https://tree-chart-backend.onrender.com
```

---

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

---

## 📸 Screenshots

<details>
  <summary>📈 Org Chart View</summary>
  <img src="screenshots/chart-view.png" alt="Org Chart View" width="800"/>
</details>

<details>
  <summary>📝 Add Node Form</summary>
  <img src="screenshots/add-node-form.png" alt="Add Node Form" width="800"/>
</details>

---

## 💡 Inspiration

This project was inspired by the need for a customizable, modern org chart system that supports dynamic editing and is powered by full-stack JavaScript.

---

## 👨‍💻 Author

**Anuj Khurana** – [@anujkhurana](https://github.com/anujkhurana)
If you like this project, ⭐️ the repo and share it with your network!

---

## 📄 License

MIT License. Use freely for learning or commercial purposes.

```

---