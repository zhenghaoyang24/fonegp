<template>
  <div class="sliding-tab-container">
    <!-- 左侧说明区域 -->
    <div class="left-section">

    </div>
    <!-- 右侧滑动区域 -->
    <div class="right-section" ref="scrollContainer">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const numbers = Array.from({ length: 7 }, (_, i) => i + 1) // [1,2,3,4,5,6,7]
const currentNumber = ref(1)
const scrollContainer = ref<HTMLElement | null>(null)

// 文字滑动效果
const textStyle = computed(() => ({
  transform: `translateY(${(currentNumber.value - 1) * 30}px)`,
  transition: 'transform 0.3s ease-in-out'
}))

// 处理数字选择
const handleSelect = (num: number) => {
  currentNumber.value = num
  scrollToNumber(num)
}

// 滚动到选中的数字
const scrollToNumber = (num: number) => {
  if (!scrollContainer.value) return

  const container = scrollContainer.value
  const itemWidth = 80 // 每个数字项的宽度
  const scrollPosition = (num - 1) * itemWidth - container.offsetWidth / 2 + itemWidth / 2

  container.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  })
}

// 初始化滚动监听
onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

// 处理滚动事件
const handleScroll = () => {
  if (!scrollContainer.value) return

  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  const itemWidth = 80
  const newIndex = Math.round(scrollLeft / itemWidth) + 1

}
</script>

<style>

</style>
