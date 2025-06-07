<template>
  <div
    class="sidebar"
    :class="{ expanded: isExpanded }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <div class="title">Tools</div>

    <div class="button-container">
      <button
        v-for="button in sidebarButtons"
        :key="button.id"
        class="sidebar-button"
        @click="button.clickHandler"
        :title="button.label"
      >
        <span class="material-icons icon">{{ button.icon }}</span>
        <transition name="fade">
          <span v-if="isExpanded" class="button-label">{{ button.label }}</span>
        </transition>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false);
const isFullscreen = ref(false);

const expandSidebar = () => (isExpanded.value = true);
const collapseSidebar = () => (isExpanded.value = false);

const props = defineProps<{
  fitChart: () => void;
  compactChart: () => void;
  expandAllNodes: () => void;
  collapseAllNodes: () => void;
  directionBottom?: () => void;
  directionTop?: () => void;
  directionLeft?: () => void;
  directionRight?: () => void;
  findParent?: () => void;
  clearMarker?: () => void;
  clickedNodeID?: string;
}>();

const toggleFullscreen = () => {
  const el = document.querySelector(".chart-container");
  if (!el) return;

  if (!isFullscreen.value) {
    el.requestFullscreen?.();
    el.webkitRequestFullscreen?.();
    el.mozRequestFullScreen?.();
    el.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
  isFullscreen.value = !isFullscreen.value;
};

// Sidebar buttons
const sidebarButtons = [
  {
    id: 1,
    label: "Fullscreen",
    icon: "fullscreen",
    clickHandler: () => toggleFullscreen(),
  },
  { id: 2, label: "Fit", icon: "zoom_out_map", clickHandler: () => props.fitChart?.() },
  {
    id: 3,
    label: "Top",
    icon: "swap_horiz",
    clickHandler: () => props.directionTop?.(),
  },
  {
    id: 4,
    label: "Bottom",
    icon: "swap_vert",
    clickHandler: () => props.directionBottom?.(),
  },
  {
    id: 5,
    label: "Right",
    icon: "swap_vert",
    clickHandler: () => props.directionRight?.(),
  },
  {
    id: 6,
    label: "Left",
    icon: "swap_horiz",
    clickHandler: () => props.directionLeft?.(),
  },
  {
    id: 7,
    label: "Expand All",
    icon: "unfold_more",
    clickHandler: () => props.expandAllNodes?.(),
  },
  {
    id: 8,
    label: "Collapse All",
    icon: "unfold_less",
    clickHandler: () => props.collapseAllNodes?.(),
  },
  {
    id: 9,
    label: "Find Parent",
    icon: "search",
    clickHandler: () => props.findParent?.(),
  },
  {
    id: 10,
    label: "Clear Marker",
    icon: "clear",
    clickHandler: () => props.clearMarker?.(),
  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 4rem;
  background-color: #000;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: width 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.sidebar.expanded {
  width: 200px;
}

.title {
  color: #fff;
  font-weight: 600;
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.icon {
  font-family: "Material Icons";
  font-size: 24px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button-label {
  margin-left: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Optional: Fade transition for labels */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
