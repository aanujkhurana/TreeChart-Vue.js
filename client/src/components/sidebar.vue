<template>
  <div
    class="sidebar"
    :class="{ expanded: isExpanded }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <div class="button-container">
      <div
        v-for="(buttons, section) in groupedButtons"
        :key="section"
        class="sidebar-section"
      >
        <transition name="fade">
          <div class="section-title">
            {{ section }}
          </div>
        </transition>

        <div v-for="button in buttons" :key="button.id" class="sidebar-button-wrapper">
          <button
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

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

const groupedButtons = computed(() => {
  return sidebarButtons.reduce((acc, button) => {
    if (!acc[button.section]) acc[button.section] = [];
    acc[button.section].push(button);
    return acc;
  }, {} as Record<string, typeof sidebarButtons>);
});

// Sidebar buttons
const sidebarButtons = [
  {
    id: 1,
    label: "Fullscreen",
    icon: "fullscreen",
    clickHandler: () => toggleFullscreen(),
    section: "View",
  },
  {
    id: 2,
    label: "Fit",
    icon: "zoom_out_map",
    clickHandler: () => props.fitChart?.(),
    section: "View",
  },

  {
    id: 3,
    label: "Top",
    icon: "swap_horiz",
    clickHandler: () => props.directionTop?.(),
    section: "Direction",
  },
  {
    id: 4,
    label: "Bottom",
    icon: "swap_vert",
    clickHandler: () => props.directionBottom?.(),
    section: "Direction",
  },
  {
    id: 5,
    label: "Right",
    icon: "swap_vert",
    clickHandler: () => props.directionRight?.(),
    section: "Direction",
  },
  {
    id: 6,
    label: "Left",
    icon: "swap_horiz",
    clickHandler: () => props.directionLeft?.(),
    section: "Direction",
  },

  {
    id: 7,
    label: "Expand All",
    icon: "unfold_more",
    clickHandler: () => props.expandAllNodes?.(),
    section: "Actions",
  },
  {
    id: 8,
    label: "Collapse All",
    icon: "unfold_less",
    clickHandler: () => props.collapseAllNodes?.(),
    section: "Actions",
  },
  {
    id: 9,
    label: "Find Parent",
    icon: "search",
    clickHandler: () => props.findParent?.(),
    section: "Actions",
  },
  {
    id: 10,
    label: "Clear Marker",
    icon: "clear",
    clickHandler: () => props.clearMarker?.(),
    section: "Actions",
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
  border-radius: 18px;
  overflow: hidden;
  transition: width 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.sidebar.expanded {
  width: 150px;
}
.section-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 8px;
  font-weight: 600;
  color: #a6b0b0;
  text-transform: uppercase;
  margin-left: 2px;
  margin-bottom: 0.5rem;
}
.button-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  color: rgb(234, 248, 255);
  padding: 0.5rem;
  border-radius: 18px;
  transition: background 0.2s;
  cursor: pointer;
}

.sidebar-button:hover {
  color: rgb(207, 239, 255);
  background-color: rgba(177, 232, 255, 0.15);
}

.icon {
  font-family: "Material Icons";
  font-size: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button-label {
  margin-left: 1rem;
  font-size: 12px;
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
