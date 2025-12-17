<template>
     <div class="cursor-pointer text-center select-none text-primary font-extrabold text-3xl max-md:text-2xl"
          @click="() => router.push('/home')">{{ NAME }}</div>
</template>

<script setup lang="ts">
import router from "@/router";
const NAME = import.meta.env.VITE_NAME;
</script>

<style scoped></style>