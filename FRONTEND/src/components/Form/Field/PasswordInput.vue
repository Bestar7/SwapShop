<template>
  <div>
    <div class="relative w-full">
      <input :type="isVisible ? 'text':'password'" v-model="password" required v-on:keyup="checkValidity" :autocomplete="isRegister ? 'new-password':'current-password'" class="focusable rounded-md border-gray-300 sm:text-sm w-full" />
      <div class="absolute flex inset-y-0 right-0 items-center px-2">
        <button v-on:click="switchVisibility" type="button" class="focusable clickableMain rounded px-2 py-1">
          {{ isVisible ? $t('utils.hide'):$t('utils.show') }}
        </button>
      </div>
    </div>
    <div v-if="isRegister" class="h-2 border border-grey-300 rounded bg-white">
      <div
        :style="{ width: `${width}%` }"
        :class="color"
        class="h-full rounded"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { setCustomValidity } from '~/utils/form';
import zxcvbn from 'zxcvbn';

interface Props {
  isRegister: boolean;
}
const props = defineProps<Props>();
const password = defineModel<string | undefined>({ required: true });

const isVisible: Ref<boolean> = ref(false);
const switchVisibility = () => {isVisible.value = !isVisible.value}

const checkValidity = (e: Event) => {
  const event = e as Event & {currentTarget:HTMLInputElement}
  if (score.value<3)
    setCustomValidity(event, "Password too weak");
  else
    setCustomValidity(event, "");
}

const maxScore = 4;
const score = computed(() =>{
  if (props.isRegister)
    return Math.min( zxcvbn(password.value ?? "").score, maxScore );
  return maxScore;
});
const width = computed(() => ((score.value+1) / (maxScore+1)) * 100);
const color = computed(() => securityLevel[score.value].color);

const securityLevel = [
  {
    text: "Very Weak",
    color: "bg-red-600",
  },
  {
    text: "Weak",
    color: "bg-red-300",
  },
  {
    text: "Medium",
    color: "bg-orange-300",
  },
  {
    text: "Strong",
    color: "bg-green-300",
  },
  {
    text: "Very strong",
    color: "bg-green-400",
  },
];

</script>