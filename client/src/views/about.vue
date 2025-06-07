<template>
  <div class="main-about">
    <div class="content">
      <h1>About This Project</h1>
      <p>
        This is an interactive, customizable <strong>Organizational Chart</strong> built
        using
        <a href="https://d3js.org" target="_blank" rel="noopener noreferrer">D3.js</a> and
        <a
          href="https://github.com/bumbeishvili/org-chart"
          target="_blank"
          rel="noopener noreferrer"
          >d3-org-chart</a
        >. It lets users explore hierarchical data with powerful visual tools like
        fullscreen, zoom, and root focus.
      </p>

      <h2>Technologies Used</h2>
      <ul>
        <li>
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a>
          + Composition API
        </li>
        <li>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            >TypeScript</a
          >
        </li>
        <li>
          <a href="https://d3js.org" target="_blank" rel="noopener noreferrer">D3.js</a>
        </li>
        <li>
          <a
            href="https://github.com/bumbeishvili/org-chart"
            target="_blank"
            rel="noopener noreferrer"
            >d3-org-chart</a
          >
        </li>
      </ul>
      <h2>
        <a
          href="https://github.com/aanujkhurana/TreeChart-Vue.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code</a
        >
      </h2>
    </div>
  </div>
</template>

<style scoped>
.main-about {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: auto;
}

.content {
  max-width: 800px;
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #1a1a1a;
  margin-bottom: 1rem;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
</style>
