<template>
    <div class="flex flex-col gap-1 overflow-hidden">
        <div v-if="showValue" class="w-full flex justify-between text-xs text-ts">
            <span>{{ title }}</span>
            <span>{{ value }}%</span>
        </div>
        <progress class="w-full" max="100" :value="value"> {{ value }}% </progress>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';


interface Props {
    showValue?: boolean,
    value: number,
    title?: string
}
const props = withDefaults(defineProps<Props>(), {
    showValue: true,
    title: 'Progress',
})

onMounted(() => {
    console.log(props.value)
})
</script>

<style scoped>
/* 重置默认样式 */
progress {
    appearance: none;
    height: 6px;
    /* 高度 */
    border: none;
    border-radius: 3px;
    /* 圆角 */
    background-color: var(--color-primary);
    /* 轨道背景 */
    overflow: hidden;
    /* 确保圆角裁剪 */
}

/* WebKit / Blink (Chrome, Edge, Safari) */
progress::-webkit-progress-bar {
    background-color: var(--color-tm);
    /* 轨道 */
    border-radius: 3px;
}

progress::-webkit-progress-value {
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); /* 动画效果 */
    background-color: #ff2800;
    /* 进度条颜色（你的 F1 主色） */
    border-radius: 3px;
}

/* Firefox */
progress::-moz-progress-bar {
    background-color: #ff2800;
    /* 进度条 */
    border-radius: 3px;
}

/* 可选：禁用动画过渡（如果你用 JS 动态更新 value） */
progress {
    transition: all 0.3s ease;
}
</style>