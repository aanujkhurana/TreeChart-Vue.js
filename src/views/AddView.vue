<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <label>
      ID:
      <input v-model="formData.id" placeholder="Unique Node ID" required />
    </label>

    <label>
      Name:
      <input v-model="formData.name" placeholder="Node Name" required />
    </label>

    <label>
      Title:
      <input v-model="formData.title" placeholder="Job Title (optional)" />
    </label>

    <label>
      Hobby:
      <input v-model="formData.hobby" placeholder="e.g. Skydiving" />
    </label>

    <label>
      Spirit Animal:
      <select v-model="formData.spiritAnimal">
        <option value="">-- None --</option>
        <option>Otter</option>
        <option>Sloth</option>
        <option>Dragon</option>
        <option>Raven</option>
        <option>Octopus</option>
      </select>
    </label>

    <label>
      Parent ID (optional):
      <select v-model="formData.parentId">
        <option value="">-- No Parent (Root) --</option>
        <option v-for="node in nodes" :key="node.id" :value="node.id">
          {{ node.name }} (ID: {{ node.id }})
        </option>
      </select>
    </label>

    <button type="submit">Add Node</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const formData = reactive({
  id: "",
  parentId: "",
  name: "",
  title: "",
  hobby: "",
  spiritAnimal: "",
  emojis: "",
});

const nodes = ref<{ id: string; name: string }[]>([]);

const fetchNodes = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/nodes");
    nodes.value = res.data;
  } catch (error) {
    console.error("Error fetching nodes:", error);
  }
};

const handleSubmit = async () => {
  try {
    const payload = {
      id: formData.id,
      parentId: formData.parentId || null,
      name: formData.name,
      title: formData.title || undefined,
      hobby: formData.hobby || undefined,
      spiritAnimal: formData.spiritAnimal || undefined,
    };

    await axios.post("http://localhost:3001/api/nodes", payload);
    alert("Node added successfully!");

    // Reset form
    Object.keys(formData).forEach((key) => (formData[key] = ""));
    fetchNodes();
  } catch (error) {
    console.error("Error adding node:", error);
  }
};

onMounted(fetchNodes);
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
}
input,
select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
