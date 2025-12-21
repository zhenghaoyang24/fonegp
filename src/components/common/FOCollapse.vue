<template>
  <div class="border border-line rounded-lg overflow-hidden">
    <!-- Head 插槽 -->
    <div 
      class="px-4 py-3 bg-bgcard cursor-pointer flex justify-between items-center border-b border-line text-tm select-none overflow-hidden"
      @click="toggle"
    >
      <slot name="head">
        <span class="text-tp font-medium">Collapse Header</span>
      </slot>
      <span 
        class="transition-transform duration-300"
        :class="{ 'rotate-90': isOpen }"
      >
        ▼
      </span>
    </div>

    <!-- Content 插槽 -->
    <div 
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :class="isOpen ? 'max-h-125' : 'max-h-0'"
    >
      <div class="px-4 py-3 bg-bgcard">
        <slot name="content">
          <p class="text-tp">Collapse Content</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ 
  open?: boolean
}>()

const isOpen = ref(props.open ?? false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>