<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";

import {seasonDataStorage} from "@/stores/data.ts";
import {onBeforeMount} from "vue";
const seasonData = seasonDataStorage();

onBeforeMount(()=>{
  seasonData.refreshCurrentSeasonInfo()
})

</script>

<template>
  <Navbar/>
  <RouterView/>
</template>

<style scoped>


</style>
