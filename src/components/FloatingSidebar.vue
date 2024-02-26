<template>
<div class="sidebar" :class="{ 'expanded': isExpanded }" @mouseenter="expandSidebar" @mouseleave="collapseSidebar">
  <div>
    <span class="title">{{ isExpanded ? 'ToolBOX' : 'Tools' }}</span>
  </div>
  <div class="button-container">
    <button v-for="(button) in sidebarButtons" :key="button.id" class="sidebar-button" @click="button.clickHandler(nodeID)">
      <fullscreenIcon v-if="button.label === 'Fullscreen'" />
      <fitIcon v-if="button.label === 'Fit'" />
      <fitHorizontalIcon v-if="button.label === 'Fit-Horizontal'" />
      <expandIcon v-if="button.label === 'Expand All'" />
      <collapseIcon v-if="button.label === 'Collapse All'" />
      <findRootIcon v-if="button.label === 'Find Root'" />
      <clearMarkIcon v-if="button.label === 'Clear Mark'" />
      <span v-if="isExpanded" class="button-label">{{ button.label }}</span>
    </button>
  </div>
</div>

</template>

<script>
import { ref } from 'vue';

import fullscreenIcon from '@/components/Icons/FloatingSidebar/fullscreenIcon.vue';
import fitIcon from '@/components/Icons/FloatingSidebar/fitIcon.vue';
import fitHorizontalIcon from '@/components/Icons/FloatingSidebar/fitHorizontalIcon.vue';
import expandIcon from '@/components/Icons/FloatingSidebar/expandIcon.vue';
import collapseIcon from '@/components/Icons/FloatingSidebar/collapseIcon.vue';
import findRootIcon from '@/components/Icons/FloatingSidebar/findRootIcon.vue';
import clearMarkIcon from '@/components/Icons/FloatingSidebar/clearMarkIcon.vue';

const nodeID = 'YourNodeID'; // Replace with the actual value

const fitChart = () => {
  // Implement your fitChart logic here
};
const compactChart = () => {
  // Implement your compactChart logic here
};
const expandAllNodes = () => {
  // Implement your expandAllNodes logic here
};
const collapseAllNodes = () => {
  // Implement your collapseAllNodes logic here
};
const findRoot = (nodeID) => {
  // Implement your findRoot logic here
};
const clearMark = () => {
  // Implement your clearMark logic here
};

const isExpanded = ref(false);
const isFullscreen = ref(false);

const expandSidebar = () => {
  isExpanded.value = true;
};

const collapseSidebar = () => {
  isExpanded.value = false;
};

const toggleFullscreen = () => {
  const chartContainer = document.querySelector('.chart-container');
  if (chartContainer) {
    if (!isFullscreen.value) {
      if (chartContainer.requestFullscreen) {
        chartContainer.requestFullscreen();
      } else if (chartContainer.mozRequestFullScreen) {
        chartContainer.mozRequestFullScreen();
      } else if (chartContainer.webkitRequestFullscreen) {
        chartContainer.webkitRequestFullscreen();
      } else if (chartContainer.msRequestFullscreen) {
        chartContainer.msRequestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    isFullscreen.value = !isFullscreen.value;
  }
};

const sidebarButtons = [
  { id: 1, label: 'Fullscreen', clickHandler: toggleFullscreen },
  { id: 2, label: 'Fit', clickHandler: fitChart },
  { id: 7, label: 'Fit-Horizontal', clickHandler: compactChart },
  { id: 5, label: 'Expand All', clickHandler: expandAllNodes },
  { id: 6, label: 'Collapse All', clickHandler: collapseAllNodes },
  { id: 8, label: 'Find Root', clickHandler: () => findRoot(nodeID) },
  { id: 9, label: 'Clear Mark', clickHandler: clearMark }
];

export default {
  data() {
    return {
      nodeID,
      fitChart,
      compactChart,
      expandAllNodes,
      collapseAllNodes,
      findRoot,
      clearMark,
      isExpanded,
      isFullscreen,
      sidebarButtons,
    };
  },
};
</script>

<style scoped>
.sidebar.expanded {
  width: 200px; /* Adjust the expanded width */
}

.sidebar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem;
  background-color: #000;
  border-radius: 1.5rem;
}

.expanded {
  width: 200px; /* Adjust the expanded width */
}

.title {
  color: #fff;
  font-weight: bold;
  justify-content: center;
  display: flex;
  margin: 0.5rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.625rem; /* Equivalent to p-2.5 */
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem; /* Equivalent to p-2 */
  margin: 0.25rem; /* Equivalent to m-1 */
  background-color: transparent;
  border: none;
}

.sidebar-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.button-label {
  color: #fff;
  font-weight: bold;
  margin: 0.5rem;
}
</style>
