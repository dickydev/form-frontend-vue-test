<script setup lang="ts">
import { toRefs, ref, watch } from "vue";
import { type Field } from "../types/form";

const props = defineProps<{
  fields: Field[];
  modelValue: Record<string, any>;
}>();

const emit = defineEmits(["update:modelValue", "validation"]);

const { fields, modelValue } = toRefs(props);
const formData = ref({ ...modelValue.value });

watch(
  formData,
  (newValue) => {
    emit("update:modelValue", newValue);
    emit("validation", validateFields());
  },
  { deep: true }
);

const validateFields = () => {
  return fields.value.every((field) => {
    if (field.required && !formData.value[field.label]) {
      return false;
    }
    return true;
  });
};
</script>

<template>
  <div class="w-full p-6 bg-white rounded-lg shadow-lg">
    <div v-for="field in fields" :key="field.label" class="mb-5">
      <label class="block mb-2 text-sm font-semibold text-gray-700">
        {{ field.label }}
      </label>
      <div v-if="field.type === 'textfield'">
        <input
          type="text"
          :placeholder="field.placeholder"
          v-model="formData[field.label]"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
        />
      </div>
      <div v-if="field.type === 'radio'" class="flex flex-wrap gap-3">
        <div
          v-for="option in field.options"
          :key="typeof option === 'object' ? option.value : option"
          class="flex items-center gap-2"
        >
          <input
            type="radio"
            :value="typeof option === 'object' ? option.value : option"
            v-model="formData[field.label]"
            class="w-4 h-4 border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <label class="text-sm text-gray-600">{{
            typeof option === "object" ? option.value : option
          }}</label>
        </div>
      </div>

      <div v-if="field.type === 'textarea'">
        <textarea
          :placeholder="field.placeholder"
          v-model="formData[field.label]"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
        ></textarea>
      </div>

      <div v-if="field.type === 'autocomplete'">
        <input
          type="text"
          list="autocompleteOptions"
          :placeholder="field.placeholder"
          v-model="formData[field.label]"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
        />
        <datalist id="autocompleteOptions">
          <option
            v-for="option in field.options"
            :key="typeof option === 'object' ? option.value : option"
          >
            {{ option }}
          </option>
        </datalist>
      </div>
    </div>
  </div>
</template>
