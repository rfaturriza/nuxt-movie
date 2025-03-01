<template>
  <Slider :movies="trendingMovies?.results ?? []" />

  <Discover
    v-if="discoverMoviesStatus === 'success' && discoverMovies"
    :movies="discoverMovies.results"
    @sortBy="sortBy = $event"
  />
</template>

<script setup lang="ts">
const sortBy = ref("popularity.desc");
const discoverParams = computed(() => ({
  include_adult: true,
  include_video: true,
  language: "en-US",
  page: 1,
  sort_by: sortBy.value,
}));
const { data: discoverMovies, status: discoverMoviesStatus } = useAuthApi<
  Pagination<Movie>
>("/discover/movie", {
  params: discoverParams,
});
const { data: trendingMovies, status: trendingMoviesStatus } =  useAuthApi<
  Pagination<Movie>
>("/trending/movie/week?language=en-US");
</script>
