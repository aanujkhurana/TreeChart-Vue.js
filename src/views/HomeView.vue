<script setup>
import { ref } from "vue";

import CreateItem from '../components/CreateItem.vue';

const itemList = ref([]);

const itemCreate = (item) => {
  itemList.value.push({
    id: 2001,
    item,
    isCompleted: null,
    isEditing: null
  });
};
</script>


<template>
  <main>
    <h1>Create Item</h1>
    <CreateItem @create-item="itemCreate"/>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
}
</style>