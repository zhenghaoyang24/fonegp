<script setup>
import router from '@/router';
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="flex items-center justify-center bg-bg text-tp text-center h-[80dvh]">
    <div class="max-w-5xl">
      <h1 class=" text-7xl mb-1 text-primary leading-none">404</h1>
      <p class=" mb-4 text-ts">{{ $t("message.notFound") }}</p>
      <span class="text-primary bg-bg decoration-[none] rounded-sm hover:bg-primary hover:text-tp px-4 py-2 cursor-pointer duration-200"
        @click="() => router.go(-1)">{{ $t("button.return") }}</span>
    </div>
  </div>
</template>
