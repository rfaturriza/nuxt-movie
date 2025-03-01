<template>
  <div class="container text-white flex space-x-6 w-full">
    <!-- Movie Poster -->
    <NuxtImg
      :src="`${baseImageUrl}${detailMovie.poster_path}`"
      :alt="detailMovie.title"
      class="w-[220px] h-auto shadow-lg"
    />

    <!-- Movie Details -->
    <div class="flex-1">
      <!-- Year -->
      <div class="text-white">{{ detailMovie.release_date }}</div>

      <!-- Title -->
      <h2 class="text-2xl font-bold">{{ detailMovie.title }}</h2>

      <!-- Genres -->
      <p class="text-gray-400 text-sm">
        {{ detailMovie.genres.map((genre) => genre.name).join(", ") }}
      </p>

      <!-- Movie Stats -->
      <div class="flex flex-wrap gap-x-8 mt-4 text-sm p-4">
        <!-- Rating Section -->
        <div class="flex items-center space-x-4 border-r pr-4 border-gray-600">
          <Icon name="ic:star" size="32px" class="text-yellow-400" />
          <span class="text-3xl font-semibold">{{
            detailMovie?.vote_average.toFixed(1)
          }}</span>
          <div class="flex flex-col">
            <span class="text-gray-400">USER SCORE</span>
            <span class="font-bold">{{ detailMovie.vote_count }} VOTES</span>
          </div>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">STATUS</span><br />
          <span class="font-bold">{{ detailMovie.status }}</span>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">LANGUAGE</span><br />
          <span class="font-bold uppercase">{{
            detailMovie.original_language
          }}</span>
        </div>
        <div class="border-r pr-4 border-gray-600">
          <span class="text-gray-400">BUDGET</span><br />
          <span class="font-bold"
            >${{ detailMovie.budget.toLocaleString() }}</span
          >
        </div>
        <div>
          <span class="text-gray-400">PRODUCTION</span><br />
          <span class="font-bold">{{
            detailMovie.production_companies
              .slice(0, 2)
              .map((company) => company.name)
              .join(", ")
          }}</span>
        </div>
      </div>

      <!-- Overview -->
      <div class="mt-10 mb-2 text-red-500 font-semibold uppercase">
        Overview
      </div>
      <p class="text-black text-sm max-w-lg line-clamp-6">
        {{ detailMovie.overview }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  detailMovie: DetailMovie;
}>();
const config = useRuntimeConfig();
const baseImageUrl = config.public.BASE_IMAGE_URL;
</script>
