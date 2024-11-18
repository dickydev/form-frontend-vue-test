<script setup lang="ts">
import { computed, watch } from "vue";
import FormStep from "./FormStep.vue";
import PreviewCard from "../components/card/Preview.vue";
import { useFormStore } from "../stores/formStore";
import type { Form } from "../types/form";

const formStore = useFormStore();

const props = defineProps<{
  stepForm: Form;
}>();

watch(
  () => props.stepForm,
  (newSteps) => {
    formStore.setStepForm(newSteps);
  },
  { immediate: true }
);

const currentStep = computed(() => formStore.currentStep);
const currentFormStep = computed(() => formStore.currentFormStep);
const stepForm = computed(() => formStore.stepForm);
const formData = computed(() => formStore.formData);
const showPreview = computed(() => formStore.showPreview);
const isPrevDisabled = computed(() => formStore.isPrevDisabled);
const isNextDisabled = computed(() => formStore.isNextDisabled);
const isSubmitDisabled = computed(() => formStore.isSubmitDisabled);

const handleValidation = (isValid: boolean) => {
  formStore.handleValidation(isValid);
};

const nextStep = () => {
  formStore.nextStep();
};

const prevStep = () => {
  formStore.prevStep();
};

const handleSubmit = () => {
  formStore.handleSubmit();
};

const handleClosePreview = () => {
  formStore.handleClosePreview();
};

const stepClass = (stepNumber: number) => {
  return stepNumber === currentStep.value
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-600";
};
</script>

<template>
  <div class="max-w-5xl px-8 py-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
    <div class="pb-5 text-center" v-if="!showPreview">
      <h1 class="text-3xl font-bold text-gray-800">Test Form</h1>

      <p class="mt-2 text-base font-medium text-gray-600">
        {{ currentFormStep.description }}
      </p>
    </div>

    <div
      v-if="!showPreview"
      class="flex items-center justify-center w-full font-medium"
    >
      <div
        v-for="(step, index) in stepForm"
        :key="step.step"
        class="flex items-center justify-center"
      >
        <div
          :class="[
            'flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 rounded-full sm:py-2',
            stepClass(step.step),
          ]"
        >
          <span
            class="size-[20px] flex items-center justify-center border-2 rounded-full"
            :class="stepClass(step.step)"
          >
            {{ step.step }}
          </span>
          <span>{{ step.title }}</span>
        </div>
        <div
          v-if="index < stepForm.length - 1"
          class="sm:flex w-[40px] bg-gray-200 h-0.5 dark:bg-gray-300 mx-0"
        />
      </div>
    </div>

    <div v-if="!showPreview" class="pb-4 mb-4 border-b-2">
      <p class="text-lg font-medium text-gray-600">Bagian {{ currentStep }}</p>
      <h1 class="mt-1 text-xl font-semibold text-gray-800">
        {{ currentFormStep.title }}
      </h1>
    </div>

    <form
      v-if="!showPreview"
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-y-5"
    >
      <FormStep
        :key="currentStep"
        :fields="currentFormStep.fields"
        :modelValue="formData.value"
        @update:modelValue="(newData: any) => (formData.value = newData)"
        @validation="handleValidation"
      />

      <div class="flex justify-end gap-4 mt-6">
        <button
          type="button"
          @click="prevStep"
          :disabled="isPrevDisabled"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          v-if="currentStep !== props.stepForm.length"
          type="button"
          @click="nextStep"
          :disabled="isNextDisabled"
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <button
          v-if="currentStep === props.stepForm.length"
          type="submit"
          :disabled="isSubmitDisabled"
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </form>

    <PreviewCard
      v-if="showPreview"
      :formData="formData"
      @close="handleClosePreview"
    />
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
