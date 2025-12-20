<template>
    <div class="collapse-container">
      <div class="collapse-header" @click="toggleCollapse">
        <slot name="header">
          <div class="default-header">
            <span>{{ title }}</span>
            <span class="collapse-icon" :class="{ 'expanded': isExpanded }">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </slot>
      </div>
      
      <div 
        class="collapse-content-wrapper"
        :style="contentWrapperStyle"
      >
        <div 
          ref="contentRef"
          class="collapse-content"
        >
          <slot>
            <!-- 默认内容插槽 -->
            <div class="default-content">
              <p>Collapse content</p>
              <p>This is the default content. You can replace it by providing your own content.</p>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue'
  
  // 定义组件Props
  interface Props {
    // 标题文本（如果使用默认header）
    title?: string
    // 是否默认展开
    expanded?: boolean
    // 动画持续时间（毫秒）
    duration?: number
    // 是否开启手风琴模式（当有多个折叠框时，同时只能展开一个）
    accordion?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    title: 'Collapse header content',
    expanded: false,
    duration: 300,
    accordion: false
  })
  
  // 定义组件事件
  const emit = defineEmits<{
    (e: 'update:expanded', value: boolean): void
    (e: 'change', value: boolean): void
  }>()
  
  // 响应式数据
  const isExpanded = ref(props.expanded)
  const contentRef = ref<HTMLDivElement | null>(null)
  const contentHeight = ref(0)
  
  // 计算内容区域包裹器的样式
  const contentWrapperStyle = computed(() => {
    if (isExpanded.value) {
      return {
        height: `${contentHeight.value}px`,
        transition: `height ${props.duration}ms ease-in-out`
      }
    } else {
      return {
        height: '0px',
        transition: `height ${props.duration}ms ease-in-out`
      }
    }
  })
  
  // 展开/收起切换
  const toggleCollapse = async () => {
    // 如果是手风琴模式，需要父组件通过事件处理
    if (props.accordion) {
      emit('change', !isExpanded.value)
    }
    
    // 切换展开状态
    isExpanded.value = !isExpanded.value
    
    // 更新内容高度
    if (isExpanded.value && contentRef.value) {
      await nextTick()
      contentHeight.value = contentRef.value.scrollHeight
    }
    
    // 发射事件
    emit('update:expanded', isExpanded.value)
    emit('change', isExpanded.value)
  }
  
  // 从外部控制展开/收起的方法
  const expand = () => {
    if (!isExpanded.value) {
      toggleCollapse()
    }
  }
  
  const collapse = () => {
    if (isExpanded.value) {
      toggleCollapse()
    }
  }
  
  // 暴露方法给父组件
  defineExpose({
    expand,
    collapse,
    toggleCollapse
  })
  
  // 监听expanded prop的变化
  watch(() => props.expanded, (newVal) => {
    isExpanded.value = newVal
    if (newVal && contentRef.value) {
      nextTick(() => {
        contentHeight.value = contentRef.value!.scrollHeight
      })
    }
  })
  
  // 组件挂载时初始化高度
  onMounted(() => {
    if (contentRef.value && isExpanded.value) {
      contentHeight.value = contentRef.value.scrollHeight
    }
  })
  
  // 监听窗口大小变化，重新计算内容高度
  const handleResize = () => {
    if (contentRef.value && isExpanded.value) {
      contentHeight.value = contentRef.value.scrollHeight
    }
  }
  
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  </script>
  
  <style scoped>
  .collapse-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
  }
  
  .collapse-container:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  .collapse-header {
    padding: 16px 20px;
    background-color: #f8f9fa;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #333;
    transition: background-color 0.2s ease;
    user-select: none;
  }
  
  .collapse-header:hover {
    background-color: #f1f3f5;
  }
  
  .default-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .collapse-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform v-bind('`${props.duration}ms`') ease-in-out;
  }
  
  .collapse-icon.expanded {
    transform: rotate(180deg);
  }
  
  .collapse-content-wrapper {
    overflow: hidden;
    height: 0;
  }
  
  .collapse-content {
    padding: 20px;
    color: #555;
    line-height: 1.6;
    background-color: #fff;
  }
  
  .default-content {
    color: #666;
    line-height: 1.5;
  }
  
  .default-content p {
    margin: 8px 0;
  }
  
  .default-content p:first-child {
    font-weight: 500;
    color: #333;
  }
  </style>