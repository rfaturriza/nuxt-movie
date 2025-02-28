<template>
  <div class="container text-white flex space-x-6 w-full">
    <!-- Movie Poster -->
    <img :src="poster" :alt="title" class="w-[220px] h-auto shadow-lg" />

    <!-- Movie Details -->
    <div class="flex-1">
      <!-- Year -->
      <div class="text-white">{{ releaseYear }}</div>

      <!-- Title -->
      <h2 class="text-2xl font-bold">{{ title }}</h2>

      <!-- Genres -->
      <p class="text-gray-400 text-sm">{{ genres.join(", ") }}</p>

      <!-- Movie Stats -->
      <div class="flex flex-wrap gap-x-8 mt-4 text-sm p-4">
        <!-- Rating Section -->
        <div class="flex items-center space-x-4 border-r pr-4 border-gray-600">
          <Icon name="ic:star" size="32px" class="text-yellow-400" />
          <span class="text-3xl font-semibold">{{ rating.toFixed(1) }}</span>
          <div class="flex flex-col">
            <span class="text-gray-400">USER SCORE</span>
            <span class="font-bold">{{ votes }} VOTES</span>
          </div>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">STATUS</span><br />
          <span class="font-bold">{{ status }}</span>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">LANGUAGE</span><br />
          <span class="font-bold">{{ language }}</span>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">BUDGET</span><br />
          <span class="font-bold">${{ budget.toLocaleString() }}</span>
        </div>
        <div>
          <span class="text-gray-400">PRODUCTION</span><br />
          <span class="font-bold">{{ production }}</span>
        </div>
      </div>

      <!-- Overview -->
      <div class="mt-10 mb-2 text-red-500 font-semibold uppercase">
        Overview
      </div>
      <p class="text-black text-sm max-w-lg">
        {{ overview }}
      </p>
    </div>
  </div>
</template>

<script setup>
// Props for dynamic data
defineProps({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genres: { type: Array, required: true },
  rating: { type: Number, required: true },
  votes: { type: Number, required: true },
  status: { type: String, required: true },
  language: { type: String, required: true },
  budget: { type: Number, required: true },
  production: { type: String, required: true },
  poster: { type: String, required: true },
  overview: { type: String, required: true },
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
