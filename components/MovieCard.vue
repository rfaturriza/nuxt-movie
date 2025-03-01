<template>
  <div class="relative w-[200px] flex-shrink-0 group cursor-pointer">
    <NuxtImg
      :src="`${baseImageUrl}${movie.poster_path}`"
      :alt="movie.title"
      class="w-full h-[300px] object-cover"
    />
    <!-- Hover overlay -->
    <div
      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100"
    >
      <div
        class="text-white text-xl font-bold mb-2 text-center flex items-center justify-center"
      >
        <Icon name="ic:round-star" size="26px" class="text-yellow-400" />
        {{ movie.vote_average.toFixed(1) }}
      </div>
      <div class="text-white mb-4 text-center">{{ movie.genre_ids }}</div>
      <NuxtLink
        :to="`/detail/${movie.id}`"
        class="bg-red-600 hover:bg-red-700 text-white px-8 py-1 rounded-full transition"
      >
        View
      </NuxtLink>
    </div>
    <!-- Regular rating badge -->
    <div
      class="absolute top-0 right-0 bg-black bg-opacity-75 text-white px-2 py-1 text-sm font-bold group-hover:opacity-0 transition-opacity"
    >
      {{ movie.vote_average }}
    </div>
    <div class="mt-2">
      <h3 class="text-base font-semibold">{{ movie.title }}</h3>
      <p class="text-sm text-gray-400">{{ movie.release_date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ movie: Movie }>();
const config = useRuntimeConfig();
const baseImageUrl = config.public.BASE_IMAGE_URL;
</script>
