<script setup lang="ts">
import FOIcon from "@/components/common/FOIcon.vue";
</script>

<template>
  <footer class="w-full">
    <div class="footer-site-info">
      Designed by
      <a href="https://github.com/zhenghaoyang24" target="_blank"
        >&nbsp;zhenghaoyang24</a
      >
    </div>
    <div class="footer-link">
      <a href="https://github.com/zhenghaoyang24/fonegp" target="_blank">
        <FOIcon icon="mdi:github" color="var(--text-p)" size="22" />
      </a>
      <a href="mailto:zhenghaoyang24@foxmail.com">
        <FOIcon icon="ic:baseline-email" color="var(--text-p)" size="22" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer-site-info {
  color: var(--text-p);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  > a {
    text-decoration: underline;
    color: var(--text-p);
  }
}
.footer-link {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  > a {
    color: var(--text-p);
    margin: 0 5px;
    font-size: 1.7em;
  }
}
</style>
