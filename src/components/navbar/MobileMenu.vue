<template>
  <Teleport to="body">
    <div class="flex flex-col absolute top-0 left-0 right-0 bottom-0 bg-bg z-99999">
      <div class="flex w-full justify-between p-3 border-b border-line">
        <FOLogo />
        <FOIcon
          icon="tdesign:close"
          :size="26"
          color="var(--color-tp)"
          @click="handleClose"
          class="cursor-pointer"
        />
      </div>
      <div class="flex justify-center pt-10">
        <div class="flex flex-col [&>a]:text-tm gap-2 text-2xl">
          <RouterLink v-for="link in navbarLink" :to="link.path" @click="handleClose">{{
            $t(`navigation.${link.title}`)
          }}</RouterLink>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import FOIcon from "../common/FOIcon.vue";
import FOLogo from "../common/FOLogo.vue";
import { navbarLink } from "@/router";
const emits = defineEmits(["close"]);

function handleClose() {
  emits("close");
}
</script>

<style scoped></style>
