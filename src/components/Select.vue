<template>
    <div class="custom-select">
      <!-- 显示当前选择 -->
      <div class="selected-display" @click="toggleDropdown">
        {{ selectedLabel }}
        <span class="arrow">▼</span>
      </div>
      
      <!-- 自定义下拉选项 -->
      <div v-if="isOpen" class="dropdown-options">
        <div 
          v-for="option in options" 
          :key="option.value"
          class="option-item"
          @mouseenter="hoverOption = option.value"
          @mouseleave="hoverOption = null"
          @click="selectOption(option)"
          :class="{
            'hover': hoverOption === option.value,
            'selected': modelValue === option.value
          }"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    modelValue: [String, Number],
    options: {
      type: Array,
      default: () => []
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const isOpen = ref(false)
  const hoverOption = ref(null)
  
  const selectedLabel = computed(() => {
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option?.label || '请选择'
  })
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const selectOption = (option) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 200px;
    font-family: Arial, sans-serif;
  }
  
  .selected-display {
    padding: 10px 15px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color 0.3s;
  }
  
  .selected-display:hover {
    border-color: #409eff;
  }
  
  .arrow {
    color: #c0c4cc;
    transition: transform 0.3s;
  }
  
  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .option-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .option-item:last-child {
    border-bottom: none;
  }
  
  /* ✅ 这里是重点：设置 hover 背景颜色 */
  .option-item:hover {
    background-color: #409eff;  /* 蓝色背景 */
    color: white;               /* 白色文字 */
  }
  
  /* 如果想要浅色效果 */
  /* .option-item:hover {
    background-color: #f0f7ff;  
    color: #409eff;             
  } */
  
  /* 选中状态 */
  .option-item.selected {
    background-color: #ecf5ff;
    color: #409eff;
    font-weight: bold;
  }
  
  /* 选中状态的 hover */
  .option-item.selected:hover {
    background-color: #337ecc;  /* 更深的蓝色 */
    color: white;
  }
  </style>