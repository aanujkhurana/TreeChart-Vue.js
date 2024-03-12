
[![NPM Version](https://img.shields.io/npm/v/d3-org-chart.svg)](https://npmjs.org/package/d3-org-chart)
[![Vue Version](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-4.x-blue.svg)](https://www.typescriptlang.org/)
[![D3 Version](https://img.shields.io/badge/d3-6.x-orange.svg)](https://d3js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.2.19-blueviolet.svg)](https://tailwindcss.com/)

# Highly Customizable Vue and Typescript Tree-chart

This repository contains a highly customized version of the d3-org-chart integrated with Vue and Typescript. It provides a flexible and visually appealing way to display hierarchical data in a tree-chart format.

## Features

- **Customization**: The chart offers extensive customization options, allowing users to tailor the appearance and behavior according to their specific requirements.
- **Vue Integration**: Seamlessly integrates with Vue.js, making it easy to incorporate into Vue projects and leverage the power of reactive components.
- **Typescript Support**: Built with Typescript, ensuring type safety and enhanced development experience for Typescript users.
- **D3.js**: Utilizes the D3.js library for efficient manipulation of documents based on data.

## Original d3-based Organization Chart

For additional functionality and use cases, you can explore the original repository by Bumbeishvili: [D3-Org-Chart](https://github.com/bumbeishvili/org-chart)

```bash
npm i d3-org-chart
```

```javascript
import { OrgChart } from 'd3-org-chart';

new OrgChart()
    .container(<DomElementOrCssSelector>)
    .data(<Data>) // Example: https://github.com/bumbeishvili/sample-data/blob/main/data-oracle.csv
    .render();
```

## Recommended IDE Setup

For an optimal development experience, we recommend using the following setup:

- **VSCode**: A lightweight and powerful code editor.
- **Volar**: An extension for Vue.js development (disable Vetur).
- **TypeScript Vue Plugin (Volar)**: Enhances TypeScript support in VSCode.

## Project Setup

Get started with the project by following these steps:

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Compile and Minify for Production

```bash
npm run build
```

## Screenshots

Here's a glimpse of what the tree-chart looks like:

<div align="left">
    <img src="/screenshots/img1.png" width="650px" alt="Screenshot"/>
</div>

## How to Contribute

Contributions are welcome! If you have ideas for improvements or bug fixes, feel free to open an issue or submit a pull request. Please make sure to follow the project's guidelines when contributing.

## License

This project is licensed under the [MIT License](LICENSE).
