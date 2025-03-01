<template>
  <section class="py-[60px] bg-black text-white">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6"
      >
        <h2
          class="text-xl sm:text-2xl font-semibold text-gray-400 mb-4 flex items-center"
        >
          <span class="border-t-4 border-red-500 mr-2">Discover </span>
          <span class="border-t-4 border-transparent">Movies</span>
        </h2>
        <div class="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            @click="$emit('sortBy', 'popularity.desc')"
            class="px-3 py-1 sm:px-4 sm:py-2 bg-[#FF0000] text-white rounded-full text-sm sm:text-base"
          >
            Popularity
          </button>
          <button
            @click="$emit('sortBy', 'primary_release_date.desc')"
            class="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded-full text-sm sm:text-base"
          >
            Release Date
          </button>
        </div>
      </div>
      <div
        class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ movies: Movie[] }>();
defineEmits(["sortBy"]);
</script>
