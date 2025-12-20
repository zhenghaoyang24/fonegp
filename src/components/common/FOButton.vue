<template>
    <button>
        <FOIcon icon="{{ icon }}" />
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import type { Icon } from '@iconify/vue/dist/iconify.js';
import type FOIconVue from './FOIcon.vue';

const props = defineProps<{
    text: string;
    icon: string;
}>()
</script>

<style scoped>
button {
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    padding: 0 10px;
    height: 34px;
    color: var(--color-ts);
    background-color: #111111;
    border: 1px solid var(--color-line);
    border-radius: 17px;
    &:hover {
        color: var(--color-tp);
    }

}
</style>