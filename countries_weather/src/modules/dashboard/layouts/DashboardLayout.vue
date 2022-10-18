<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="main-content">
    <NavBar />
    <div class="dashboard-content">
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="['CountryWeather']">
          <component :is="Component" :key="$route.fullPath"></component>
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>