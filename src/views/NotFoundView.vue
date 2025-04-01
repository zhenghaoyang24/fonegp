<script setup>
import { RouterLink } from 'vue-router'

const messages = [
  "Ops，看起来赛车出了些问题，我们要退赛了，请把赛车开回维修区。",
]
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>{{ messages[0]}}</p>
      <RouterLink to="/">返回维修区</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  color: var(--text-p);
  text-align: center;
  padding: 2rem;
  height: 50vh;
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
