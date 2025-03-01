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
                v-for="movie in movies?.results"
                :key="movie.id"
                :movie="movie"
              />
            </div>
          </div>

          <button
            class="px-4 sm:px-4 sm:py-2 bg-[#FF0000] text-white rounded-full text-sm sm:text-base"
            @click="handleLoadMore"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const route = useRoute();

const params = computed(() => {
  return {
    query: route.params.q,
    include_adult: true,
    language: "en-US",
    page: currentPage.value,
  };
});

const { data: movies, status } = useAuthApi<Pagination<Movie>>(
  `/search/movie`,
  {
    params,
  }
);

const handleLoadMore = () => {
  if (status.value === "pending") return;
  currentPage.value++;
};
</script>
