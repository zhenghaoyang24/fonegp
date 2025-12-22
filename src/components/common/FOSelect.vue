<template>
  <div class="custom-select" @blur="isOpen = false" tabindex="0">
    <!-- 显示当前选择 -->
    <div class="selected-display" :class="{ 'common-border':showBorder }" @click="toggleDropdown">
      <p v-if="showText">{{ selectedOption.label }}</p>
      <FOIcon :icon="icon" :size="size" color="var(--color-tp)" />
    </div>

    <!-- 自定义下拉选项 -->
    <div v-if="isOpen" class="dropdown-options">
      <div v-for="option in options" :key="option.value" class="option-item" @click="selectOption(option.value)" :class="{
        hover: hoverOption === option.value,
        selected: value === option.value
      }">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FOIcon from '@/components/common/FOIcon.vue'

interface Option {
  value: string | number,
  label: string | number,
}

interface Props {
  value: string | number,
  options: Option[],
  showText?: boolean,
  showIcon?: boolean,
  icon?: string,
  showBorder?: boolean,
  size?: number,
}

const props = withDefaults(defineProps<Props>(),{
  showText: true,
  showIcon: false,
  icon: 'mdi:chevron-down',
  showBorder: true,
  size: 16
}) 

const emit = defineEmits(['changeValue'])

const isOpen = ref(false)
const hoverOption = ref(null)

const selectedOption = computed(() => {
  const option = props.options.find((opt) => opt.value == props.value)
  return option || { value: '', label: '' }
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value: string | number) => {
  emit('changeValue', value)
  isOpen.value = false
}
</script>

<style scoped>
.custom-select {
  font-size: 14px;
  position: relative;
  font-family: Arial, sans-serif;
}

.selected-display {
  box-sizing: border-box;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.3s;
  width: fit-content;
  height: 30px;
  gap: 2px;
  >p{
    color: var(--text-p);
  }
}

.selected-display:hover {
  border-color: var(--brand-color);
}

.dropdown-options {
  font-size: 12px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border: 1px solid var(--border-color-inverted);
  border-radius: 4px;
  color: var(--text-s);
  background: var(--card-bg-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  width: fit-content;
  overflow-y: auto;
  overflow-x: hidden;
}

.option-item {
  text-align: center;
  padding: 6px 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-wrap: nowrap;
  border-bottom: 1px solid var(--border-color-inverted);
}

.option-item:last-child {
  border-bottom: none;
}

/* ✅ 这里是重点：设置 hover 背景颜色 */
.option-item:hover {
  background-color: var(--brand-color);
  /* 蓝色背景 */
  color: var(--text-p);
}

/* 如果想要浅色效果 */
/* .option-item:hover {
    background-color: #f0f7ff;  
    color: #409eff;             
  } */

/* 选中状态 */
.option-item.selected {
  color: var(--text-p);
  background-color: var(--brand-color);
  /* 蓝色背景 */
}

/* 选中状态的 hover */
.option-item.selected:hover {
  filter: brightness(110%);
}
</style>
