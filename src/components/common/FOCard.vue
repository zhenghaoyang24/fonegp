<template>
    <div class="bg-bgcard rounded-md border-line border p-6 box-border flex flex-col gap-2 max-md:p-2 max-md:gap-1">
        <div class="flex justify-between items-center border-b border-line pb-2 max-md:pb-1">
            <slot name="title">
                <h4 class="font-bold text-lg">{{ title }}</h4>
                <FOIcon :icon="icon" color="var(--color-primary)" size="26" />
            </slot>
        </div>
        <div>
            <slot name="content"> Card Content </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import FOIcon from "./FOIcon.vue";

interface Props {
    title?: string;
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: "Card Title",
    icon: "solar:card-broken",
});
</script>

<style scoped></style>
