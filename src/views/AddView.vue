<template>
  <form @submit.prevent="handleSubmit" class="form-container" ref="formRef">
    <label>
      <span>ID:</span>
      <input v-model="formData.id" placeholder="Unique Node ID" required />
    </label>

    <label>
      <span>Name:</span>
      <input v-model="formData.name" placeholder="Node Name" required />
    </label>

    <label>
      <span>Title:</span>
      <input v-model="formData.title" placeholder="Job Title (optional)" />
    </label>

    <label>
      <span>Hobby:</span>
      <input v-model="formData.hobby" placeholder="e.g. Skydiving" />
    </label>

    <label>
      <span>Spirit Animal:</span>
      <select v-model="formData.spiritAnimal">
        <option value="">-- None --</option>
        <option>Otter</option>
        <option>Sloth</option>
        <option>Dragon</option>
        <option>Raven</option>
        <option>Octopus</option>
        <option>Fish</option>
        <option>whatever</option>
      </select>
    </label>

    <label>
      <span>Parent ID:</span>
      <select v-model="formData.parentId">
        <option value="">-- No Parent (Root) --</option>
        <option v-for="node in nodes" :key="node.id" :value="node.id">
          {{ node.name }} (ID: {{ node.id }})
        </option>
      </select>
    </label>

    <label>
      <span>Emojis:</span>
      <input v-model="formData.emojis" placeholder="Whatever" />
    </label>

    <div class="button-group">
      <button type="submit">➕ Add Node</button>
      <button type="button" class="secondary" @click="handleReset">🧹 Clear</button>
    </div>

    <!-- Toast message -->
    <transition name="fade">
      <div v-if="showToast" class="toast">🎉 Node added successfully!</div>
    </transition>
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
const showToast = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

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
      emojis: formData.emojis || "👎",
      createdAt: new Date().toISOString(),
    };

    await axios.post("http://localhost:3001/api/nodes", payload);

    showToast.value = true;
    setTimeout(() => (showToast.value = false), 2000);
    // Reset form
    Object.keys(formData).forEach((key) => (formData[key] = ""));
    formRef.value.reset();
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
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  background: #fdfdfd;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  font-family: system-ui, sans-serif;
  position: relative;
}

label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 500;
  color: #333;
}

label span {
  min-width: 120px;
  text-align: right;
}

input,
select {
  flex: 1;
  padding: 10px 14px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, transform 0.2s;
}

input:focus,
select:focus {
  border-color: #0077ff;
  box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  transform: scale(1.02);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

button {
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

button[type="submit"] {
  background-color: #0077ff;
  color: white;
}

button.secondary {
  background-color: #f0f0f0;
  color: #444;
}

button:hover {
  opacity: 0.9;
}

.toast {
  position: absolute;
  top: -50px;
  width: 90%;
  background-color: #2ecc71;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
