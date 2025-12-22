<template>
    <button>
        <FOIcon v-if="icon" icon="{{ icon }}" />
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import FOIcon from './FOIcon.vue';

const props = defineProps<{
    text: string;
    icon?: string;
}>()
</script>

<style scoped>
button {
    display: flex;
    align-items: center;
    transition: all 0.1s ease-in-out;
    text-align: center;
    cursor: pointer;
    padding: 0 6px;
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