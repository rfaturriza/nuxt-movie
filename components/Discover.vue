<template>
  <section class="py-8 bg-black text-white">
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
            class="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-full text-sm sm:text-base"
          >
            Popularity
          </button>
          <button
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
import MovieCard from "@/components/MovieCard.vue";
import { ref } from "vue";

interface Movie {
  id: number;
  image: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
}

const movies = ref<Movie[]>([
  {
    id: 1,
    genre: "Action, Adventure, Fantasy",
    image:
      "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/90301/98769/the-creator-original-movie-poster-one-sheet-final-style-buy-now-at-starstills__81077.1697644483.jpg?c=2",
    title: "Wonder Woman 1984",
    year: 2020,
    rating: 7.0,
  },
]);

for (let i = 0; i < 9; i++) {
  movies.value.push({
    id: i + 2,
    genre: "Action",
    image: movies.value[0].image,
    title: `Movie ${i + 2}`,
    year: 2021,
    rating: 6.0 + i / 10,
  });
}
</script>
