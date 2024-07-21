<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="flex justify-center items-center lg:justify-start lg:items-start">
      <img alt="Chat logo" class="w-1/6 lg:w-5/6" src="@/assets/chat.png" />
    </div>
    <div>
      <h1
        class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center lg:text-left"
      >
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
          >Chat Room</span
        >
        Application.
      </h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
