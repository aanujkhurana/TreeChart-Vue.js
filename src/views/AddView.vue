<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.id" placeholder="ID" required />
    <input v-model="formData.parentId" placeholder="Parent ID (optional)" />
    <input v-model="formData.name" placeholder="Name" required />
    <button type="submit">Add Node</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";

const formData = reactive({
  id: "",
  parentId: "",
  name: "",
});

const handleSubmit = async () => {
  try {
    const payload = {
      id: formData.id,
      parentId: formData.parentId || null,
      name: formData.name,
    };
    await axios.post("http://localhost:3001/api/nodes", payload);
    alert("Node added successfully!");
  } catch (error) {
    console.error("Error adding node:", error);
  }
};
</script>
