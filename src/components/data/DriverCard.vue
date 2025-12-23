<template>
  <div
    class="bg-bgcard rounded-md border-line border p-6 box-border flex flex-col gap-2 max-md:p-2 max-md:gap-1"
  >
    <div :style="grident" class="flex gap-1 justify-between">
        <div></div>
        <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const gridentStartColor = "var(--color-primary)";
const grident = computed(() => {
  return `background-image: linear-gradient(90deg,${gridentStartColor} ,var(--color-pdark))`;
});

</script>
