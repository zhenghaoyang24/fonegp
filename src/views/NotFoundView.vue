<script setup>
import { RouterLink } from 'vue-router'

const messages = [
  "Oops! 你进站太早了",
  "这圈跑丢了...",
  "Check Engine! 页面异常",
  "需要虚拟安全车带路吗？"
]
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>{{ messages[Math.floor(Math.random() * messages.length)] }}</p>
      <RouterLink to="/">返回发车格</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  color: var(--text-p);
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 600px;
}

h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: var(--brand-color);
  line-height: 1;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-s);
}

a {
  color: var(--brand-color);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: all var(--pitstop-animation);
}

a:hover {
  background-color: var(--brand-color);
  color: var(--text-inverted);
  transform: translateY(-2px);
}
</style>
