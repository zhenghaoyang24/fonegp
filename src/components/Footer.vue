<script setup lang="ts">
import {Icon} from '@iconify/vue'
</script>

<template>
<footer class="footer">
  <div class="footer-site-info">
    Designed by <a href="https://github.com/zhenghaoyang24" target="_blank">&nbsp;zhenghaoyang24</a>
  </div>
  <div class="footer-link">
    <a href="https://github.com/zhenghaoyang24/fonelify"> <Icon icon="mdi:github" /> </a>
    <a href="mailto:zhenghaoyang24@foxmail.com"> <Icon icon="ic:baseline-email" /> </a>
  </div>
</footer>
</template>

<style scoped>
.footer{
  margin-top: 100px;
  border-top: 1px solid var(--card-border-color);
  width: 100%;
}
.footer-site-info{
  color: var(--text-p);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  >a{
    text-decoration: underline;
    color: var(--text-p);
  }
}
.footer-link{
  margin: 20px auto;
  display: flex;
  justify-content: center;
  >a{
    color: var(--text-p);
    margin: 0 5px;
    font-size: 1.7em;
  }
}
</style>
