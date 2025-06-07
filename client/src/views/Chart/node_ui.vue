<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(defineProps<{ data: any }>(), {
  data: {},
});

// Generate a random image (not stored in the data object)
const seed = encodeURIComponent(props.data.id || props.data.name || "default");
const imageUrl = `https://picsum.photos/seed/${seed}/100/100`;
</script>

<template>
  <div class="card-ui" role="region" aria-label="Node Card">
    <div class="bg"></div>

    <!-- Header -->
    <div class="card-header">
      <img :src="imageUrl" alt="Random fun image" class="image" />
      <div class="card-title">
        <h1>{{ props.data.name || "Unnamed" }}</h1>
        <p>{{ props.data.title || "No title" }}</p>
      </div>
    </div>
    <!-- Details -->
    <div class="card-details">
      <p>Parent ID: {{ props.data.parentId || "None" }}</p>
      <p>Something: {{ props.data.hobby || "None" }}</p>
      <p>Spirit Animal: {{ props.data.spiritAnimal || "None" }}</p>
    </div>
    <!-- E -->
    <div class="emoji-row" v-if="props.data.emojis">
      {{ props.data.emojis }}
    </div>
  </div>
</template>

<style scoped>
.card-ui {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 22px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 24px;
  padding-left: 24px;
}
.card-details {
  display: flex;
  justify-content: space-between;
  align-items: right;
  flex-direction: column;
  gap: 4px;
  font-size: 18px;
  color: rgb(105, 105, 118);
  font-weight: bold;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 26px;
  z-index: 1;
}
.image {
  border-radius: 400px;
  border: 1px solid #bbc1cb;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.card-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: left;
  color: rgb(60, 60, 137);
}
.card-title p {
  margin: 0;
  color: #95a5bf;
  font-size: 16px;
  justify-content: left;
}
.emoji-row {
  z-index: 1;
  text-align: left;
  word-break: break-word;
  padding: 6px;
}
</style>
