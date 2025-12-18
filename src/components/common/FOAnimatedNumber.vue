<template>
    <div class="grid w-ull" :class="`grid-cols-${props.data.length}`">
        <div v-for="(item, index) in props.data" :key="index" class="flex flex-col items-center">
            <span class="text-4xl font-bold text-primary">{{ Math.floor(animatedValues[index]) }}</span>
            <span class="text-sm text-tm">{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { type Option } from "@/type/common";

interface Props {
    data?: Option[];
}

onMounted(() => {
    console.log("props", props.data);
});

const props = withDefaults(defineProps<Props>(), {
    data: () => [
        { label: "Views", value: 150 },
        { label: "Likes", value: 234 },
        { label: "Comments", value: 55 },
    ],
});

// 每个项的当前动画值
const animatedValues = ref<number[]>([]);

// 初始化所有值为 0
const initAnimatedValues = () => {
    animatedValues.value = props.data.map(() => 0);
};

// 为每个数字启动独立动画
const startAnimations = () => {
    props.data.forEach((item, i) => {
        const target = item.value;
        const start = animatedValues.value[i] ?? 0;
        const duration = (0.8 + Math.random() * (1.5 - 0.8)) * 1000; // 单位：毫秒
        const startTime = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTime;
            let t = Math.min(elapsed / duration, 1);

            // Ease-out quadratic: 开始快，逐渐变慢
            const easeOutQuad = 1 - Math.pow(1 - t, 2);

            animatedValues.value[i] = start + (target - start) * easeOutQuad;

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                animatedValues.value[i] = target; // 确保精确
            }
        };

        requestAnimationFrame(animate);
    });
};

// 初始化并启动动画
onMounted(() => {
    initAnimatedValues();
    startAnimations();
});

// 如果 data 变化（如重新加载），重置并重新动画
watch(
    () => props.data,
    () => {
        initAnimatedValues();
        startAnimations();
    },
    { deep: true }
);
</script>
