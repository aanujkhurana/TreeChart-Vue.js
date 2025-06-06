<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="container">
      <div class="branding">
        <img src="../assets/Vue_Logo_Black.png" alt="Vue Logo" />
        <h1>Treechart</h1>
      </div>
      <ul class="nav-routes">
        <li><RouterLink to="/">Playground</RouterLink></li>
        <li><RouterLink to="/add">Add Node</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Reset spacing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background-color: #f0f8ff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

nav.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1.2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

/* Branding */
.branding {
  display: flex;
  align-items: center;
  gap: 12px;
}

.branding img {
  height: 32px;
  width: auto;
}

.branding h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e1e1e;
}

/* Nav Links */
.nav-routes {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-routes a {
  font-weight: 500;
  text-decoration: none;
  color: #333;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-routes a:hover {
  background-color: #e0f0ff;
  color: #007acc;
}

/* Responsive: stack on smaller screens */
@media (max-width: 600px) {
  nav.container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .nav-routes {
    flex-direction: column;
    width: 100%;
  }

  .nav-routes a {
    width: 100%;
  }
}
</style>
