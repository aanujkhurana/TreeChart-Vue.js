## 🔗 Hosted on Render

**Backend**: [tree-chart-backend.onrender.com](https://tree-chart-backend.onrender.com)  
_(Render takes ~50 seconds to cold start)_

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
    .data(<Data>) // json data or csv file
    .render();
```