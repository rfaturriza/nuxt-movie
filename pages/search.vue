<template>
  <section class="py-[20px] md:py-[60px] bg-black text-white">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between my-[20px]"
      >
        <h2
          class="text-xl md:text-4xl font-semibold text-[#E5E5E5] mb-4 flex items-center"
        >
          <span class="border-t-4 border-red-500 mr-2">Movies </span>
        </h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-4">
        <div class="col-span-1">
          <FilterSideBar />
        </div>
        <div class="col-span-1 lg:col-span-3 flex flex-col items-center">
          <div class="col-span-4 flex justify-center">
            <div
              class="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
              />
            </div>
          </div>

          <button
            class="px-4 sm:px-4 sm:py-2 bg-[#FF0000] text-white rounded-full text-sm sm:text-base"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
