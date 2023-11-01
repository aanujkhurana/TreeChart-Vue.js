<template>
  <div
    class="fixed top-1/2 transform -translate-y-1/2 w-16 bg-black transition-width duration-300 ease-in-out rounded-6"
    :class="{ 'expanded': isExpanded }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <div>
      <span class="text-white justify-center font-bold flex m-2">{{ isExpanded ? 'ToolBOX' : 'Tools' }}</span>
    </div>
    <div class="flex flex-col gap-1.5 p-2.5">
      <button
        v-for="(button) in sidebarButtons"
        :key="button.id"
        class="flex items-center p-2 m-1 h-10 bg-transparent border-none hover:bg-white/30"
        @click="button.clickHandler(nodeID)"
      >
        <fullscreenIcon v-if="button.label === 'Fullscreen'" />
        <fitIcon v-if="button.label === 'Fit'" />
        <fitHorizontalIcon v-if="button.label === 'Fit-Horizontal'" />
        <expandIcon v-if="button.label === 'Expand All'" />
        <collapseIcon v-if="button.label === 'Collapse All'" />
        <findRootIcon v-if="button.label === 'Find Root'" />
        <clearMarkIcon v-if="button.label === 'Clear Mark'" />
        <span v-if="isExpanded" class="text-white font-bold m-4">{{ button.label }}</span>
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
.floating-sidebar.expanded {
  width: 200px; /* Adjust the expanded width */
}
</style>
