<template>
  <div v-if="formData" class="bg-white p-4 rounded shadow-md">
    <h2 class="text-lg font-semibold mb-4">Form Submission Preview</h2>
    <div v-for="(value, key) in formData.value" :key="key" class="mb-2">
      <strong class="block">{{ key }}:</strong>
      <p>{{ value }}</p>
    </div>
    <button
      @click="onClose"
      class="bg-red-500 text-white px-4 py-2 rounded mt-4"
    >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  formData: Record<string, any> | null;
}>();

const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close");
};
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
