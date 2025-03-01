<template>
  <section class="relative">
    <div
      class="bg-cover bg-center w-full h-[500px] absolute top-0 left-0 z-[-2]"
      :style="{
        'background-image': `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${baseImageUrl}${movie?.backdrop_path})`,
        'background-size': 'cover',
        'background-position': 'center',
      }"
    />
    <div class="relative pt-[250px]">
      <div
        class="bg-white absolute top-[72%] bottom-0 left-0 right-0 z-[-1]"
      ></div>
      <div
        class="bg-[#00000080] absolute top-[58%] bottom-0 left-0 right-0 z-[-2]"
      ></div>
      <div class="flex justify-center">
        <MovieOverview v-if="movie" :detailMovie="movie" />
      </div>
    </div>
    <!-- review section -->
    <div class="py-8 bg-white">
      <div class="container mx-auto mt-8">
        <div class="text-red-500 font-semibold uppercase mb-4">Reviews</div>
        <div class="overflow-x-auto pb-4">
          <div class="flex space-x-4">
            <ReviewCard
              v-for="review in reviews?.results"
              :key="review.id"
              :reviewer="review.author"
              :date="review.created_at"
              :profileImage="`${baseImageUrl}${review.author_details.avatar_path}`"
              :reviewText="review.content"
              :rating="review.author_details.rating"
              class="min-w-[580px]"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- recommendation section -->
    <div class="container mx-auto my-8">
      <div class="text-white font-semibold uppercase mb-4">Recommendation</div>
      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <MovieCard
            v-for="movie in recommendationMovies?.results"
            :key="movie.id"
            :movie="movie"
            class="min-w-[200px]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "detail",
});
const config = useRuntimeConfig();
const baseImageUrl = config.public.BASE_IMAGE_URL;
const { id } = useRoute().params;

const { data: movie } = useAuthApi<DetailMovie>(`/movie/${id}`, {
  query: {
    language: "en-US",
  },
});

const { data: reviews } = useAuthApi<Pagination<ReviewMovie>>(
  `/movie/${id}/reviews`,
  {
    query: {
      language: "en-US",
      page: 1,
    },
  }
);

const { data: recommendationMovies } = useAuthApi<Pagination<Movie>>(
  `/movie/${id}/recommendations`,
  {
    query: {
      language: "en-US",
      page: 1,
    },
  }
);
</script>
