<script setup lang="ts">

</script>

<template>

</template>

<style scoped>
.schedule-race-table {
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
}

.race-item-title {
  z-index: 999;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: var(--bg-color);
  > span {
    display: flex;
    justify-content: center;
  }
}
.race-item-body{
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.race-item-content {

  padding: 0 5px;
}
</style>
