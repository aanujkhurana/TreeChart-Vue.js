<template>
  <div
    class="sidebar"
    :class="{ expanded: isExpanded }"
    @mouseenter="expandSidebar"
    @mouseleave="collapseSidebar"
  >
    <div class="title">{{ isExpanded ? 'ToolBOX' : 'Tools' }}</div>

    <div class="button-container">
      <button
        v-for="button in sidebarButtons"
        :key="button.id"
        class="sidebar-button"
        @click="button.clickHandler(nodeID)"
      >
        <component :is="getIconComponent(button.label)" class="icon" />
        <transition name="fade">
          <span v-if="isExpanded" class="button-label">{{ button.label }}</span>
        </transition>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'

import fullscreenIcon from '@/components/Icons/FloatingSidebar/fullscreenIcon.vue'
import fitIcon from '@/components/Icons/FloatingSidebar/fitIcon.vue'
import fitHorizontalIcon from '@/components/Icons/FloatingSidebar/fitHorizontalIcon.vue'
import expandIcon from '@/components/Icons/FloatingSidebar/expandIcon.vue'
import collapseIcon from '@/components/Icons/FloatingSidebar/collapseIcon.vue'
import findRootIcon from '@/components/Icons/FloatingSidebar/findRootIcon.vue'
import clearMarkIcon from '@/components/Icons/FloatingSidebar/clearMarkIcon.vue'

// Dummy nodeID, replace with actual logic later
const nodeID = 'YourNodeID'

const isExpanded = ref(false)
const isFullscreen = ref(false)

const expandSidebar = () => (isExpanded.value = true)
const collapseSidebar = () => (isExpanded.value = false)

const props = defineProps<{
  fitChart: () => void
  compactChart: () => void
  expandAllNodes: () => void
  collapseAllNodes: () => void
  findRoot: (id: string) => void
  clearMark: () => void
}>()


const toggleFullscreen = () => {
  const el = document.querySelector('.chart-container')
  if (!el) return

  if (!isFullscreen.value) {
    el.requestFullscreen?.()
    el.webkitRequestFullscreen?.()
    el.mozRequestFullScreen?.()
    el.msRequestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
  isFullscreen.value = !isFullscreen.value
}

// Sidebar buttons
const sidebarButtons = [
  { id: 1, label: 'Fullscreen', clickHandler: toggleFullscreen },
  { id: 2, label: 'Fit', clickHandler: props.fitChart },
  { id: 3, label: 'Fit-Horizontal', clickHandler: props.compactChart },
  { id: 4, label: 'Expand All', clickHandler: props.expandAllNodes },
  { id: 5, label: 'Collapse All', clickHandler: props.collapseAllNodes },
  { id: 6, label: 'Find Root', clickHandler: () => props.findRoot(nodeID) },
  { id: 7, label: 'Clear Mark', clickHandler: props.clearMark }
]

// Map label to icon component
const iconMap = {
  'Fullscreen': fullscreenIcon,
  'Fit': fitIcon,
  'Fit-Horizontal': fitHorizontalIcon,
  'Expand All': expandIcon,
  'Collapse All': collapseIcon,
  'Find Root': findRootIcon,
  'Clear Mark': clearMarkIcon
}

const getIconComponent = label => iconMap[label]
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
  width: 24px;
  height: 24px;
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
