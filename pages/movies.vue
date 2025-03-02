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
          <FilterSideBar
            :sortBy="sortBy"
            :genres="genres"
            @sort-change="sortBy = $event"
            @genres-change="genres = $event"
          />
        </div>
        <div
          class="col-span-1 lg:col-span-3 flex flex-col items-center space-y-8"
        >
          <div class="col-span-4 flex justify-center">
            <div
              class="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              <template
                v-for="paginationItem in pagination"
                :key="paginationItem.page"
              >
                <MovieCard
                  v-for="movie in paginationItem.results"
                  :key="movie.id"
                  :movie="movie"
                />
              </template>
            </div>
          </div>

          <button
            v-if="
              movies &&
              movies.page &&
              movies.total_pages &&
              movies.page < movies.total_pages
            "
            class="px-4 sm:px-4 sm:py-2 bg-[#FF0000] text-white rounded-full text-sm sm:text-base"
            @click="handleLoadMore"
          >
            {{ status === "pending" ? "Loading..." : "Load More" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page as string) || 1);
const sortBy = ref((route.query.sort_by as string) || "popularity.desc");
const genres = ref<string[]>(
  route.query.genres ? (route.query.genres as string).split("|") : []
);

onMounted(() => {
  if (!route.query.genres) {
    genres.value = [];
  } else {
    genres.value = (route.query.genres as string).split("|");
  }
  if (!route.query.sort_by) {
    router.replace({
      query: {
        ...route.query,
        sort_by: sortBy.value,
      },
    });
  } else {
    sortBy.value = route.query.sort_by as string;
  }
  if (!route.query.page) {
    router.replace({
      query: {
        ...route.query,
        page: currentPage.value,
      },
    });
  } else {
    currentPage.value = parseInt(route.query.page as string);
  }
  execute();
});

const discoverParams = computed(() => ({
  include_adult: true,
  include_video: true,
  language: "en-US",
  page: currentPage.value,
  sort_by: sortBy.value,
  with_genres: genres.value.length ? genres.value.join("|") : undefined,
}));

const pagination = ref<Pagination<Movie>[]>([]);
const {
  data: movies,
  status,
  execute,
} = useAuthApi<Pagination<Movie>>("/discover/movie", {
  params: discoverParams,
  immediate: false,
});

watch(movies, (newValue) => {
  if (newValue) {
    pagination.value = [...pagination.value, newValue];
  }
});

// Update URL when filters change
watch(
  [sortBy, genres, currentPage],
  ([newSort, newGenres, newPage]) => {
    // For sort and genres changes, reset pagination
    if (
      newSort !== route.query.sort_by ||
      newGenres.join("|") !== (route.query.genres || "")
    ) {
      pagination.value = [];
      currentPage.value = 1;

      // Update URL with new params
      router.replace({
        query: {
          ...route.query,
          page: 1,
          sort_by: newSort,
          genres: newGenres.length ? newGenres.join("|") : undefined,
        },
      });
    } else if (newPage !== parseInt((route.query.page as string) || "1")) {
      // Just update page param for load more
      router.replace({
        query: {
          ...route.query,
          page: newPage,
        },
      });
    }
  },
  { deep: true }
);

const handleLoadMore = () => {
  if (status.value === "pending") return;
  currentPage.value++;
};
</script>
