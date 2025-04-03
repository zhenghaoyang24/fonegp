<script setup lang="ts">
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import {onBeforeMount, onMounted, ref} from "vue";
const seasonData = seasonDataStorage();
const {currentRacesScheduleDate} = storeToRefs(seasonData)
const props = defineProps({
  theRound: {
    type: Number,
    required: true
  },
  circuitId:{
    type: String,
    required: true
  }

})

onBeforeMount(()=>{

})

</script>

<template>

</template>

<style scoped>

</style>
