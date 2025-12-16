<template>
  <Icon
    :icon="icon"
    :style="{
      color: color,
      fontSize: typeof size === 'number' ? size + 'px' : size,
    }"
  />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps<{
  icon: string;
  color?: string;
  size?: string | number;
}>();
</script>
