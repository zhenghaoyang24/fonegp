<template>
  <div class="w-fit flex flex-col items-center">
    <p class="text-4xl font-bold text-primary">{{ animatedValue.toFixed(0) }}</p>
    <p class="text-sm text-tm">{{ data.label }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface Option {
  label: string;
  value: number;
}

interface Props {
  data?: Option;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    label: "Label",
    value: 0,
  }),
});

// 单个动画值（不是数组）
const animatedValue = ref(0);

// 启动单个值的动画
const startAnimation = () => {
  const target = props.data.value;
  const start = animatedValue.value;

  // 如果已经是目标值，不重复动画
  if (start === target) return;

  const duration = (0.8 + Math.random() * 0.7) * 1000; // 800~1500ms
  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Ease-out quadratic
    const easeOutQuad = 1 - Math.pow(1 - t, 2);

    animatedValue.value = start + (target - start) * easeOutQuad;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      animatedValue.value = target; // 精确保底
    }
  };

  requestAnimationFrame(animate);
};

// 在组件挂载后启动动画
onMounted(() => {
  startAnimation();
});

// 可选：当 props.data.value 变化时重新触发动画
watch(
  () => props.data.value,
  () => {
    startAnimation();
  }
);
</script>
