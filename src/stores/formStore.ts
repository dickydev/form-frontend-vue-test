import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Form } from "../types/form.ts";

export const useFormStore = defineStore("form", () => {
  const currentStep = ref(1);
  const formData = ref<Record<string, any>>({});
  const showPreview = ref(false);
  const isCurrentStepValid = ref(false);

  const stepForm = ref<Form>([]);

  const currentFormStep = computed(() => stepForm.value[currentStep.value - 1]);
  const isPrevDisabled = computed(() => currentStep.value === 1);
  const isNextDisabled = computed(() => !isCurrentStepValid.value);
  const isSubmitDisabled = computed(() => !isCurrentStepValid.value);

  const handleValidation = (isValid: boolean) => {
    isCurrentStepValid.value = isValid;
  };

  const nextStep = () => {
    if (!isNextDisabled.value && currentStep.value < stepForm.value.length) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (!isPrevDisabled.value) {
      currentStep.value--;
    }
  };

  const handleSubmit = () => {
    if (!isSubmitDisabled.value) {
      console.log("Form Data:", formData.value);
      showPreview.value = true;
    }
  };

  const handleClosePreview = () => {
    showPreview.value = false;
    formData.value = {};
    currentStep.value = 1;
  };

  const setStepForm = (steps: Form) => {
    stepForm.value = steps;
  };

  return {
    currentStep,
    formData,
    showPreview,
    isCurrentStepValid,
    stepForm,
    currentFormStep,
    isPrevDisabled,
    isNextDisabled,
    isSubmitDisabled,
    handleValidation,
    nextStep,
    prevStep,
    handleSubmit,
    handleClosePreview,
    setStepForm,
  };
});
