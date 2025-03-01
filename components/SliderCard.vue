<template>
  <div class="flex items-center py-[50px]">
    <NuxtImg
      :src="`${baseImageUrl}${movie.poster_path}`"
      :alt="movie.title"
      class="object-cover"
      height="360px"
      width="240px"
    />
    <div
      class="flex flex-col bg-black p-4 rounded h-[320px] w-[320px] overflow-clip"
    >
      <div class="flex items-center space-x-1">
        <Icon name="ic:round-star" size="16px" class="text-yellow-400" />
        <p class="text-white font-bold">{{ movie.vote_average }}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <h2 class="text-2xl text-white">{{ movie.title }}</h2>
        <p class="text-l text-gray-400">
          {{ movie.release_date }} •
          {{ res?.genres.find((g) => g.id === movie.genre_ids[0])?.name }}
        </p>
        <p class="text-sm text-white line-clamp-8">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  movie: Movie;
}>();

const config = useRuntimeConfig();
const baseImageUrl = config.public.BASE_IMAGE_URL;

const { data: res } = useGenres();
</script>
