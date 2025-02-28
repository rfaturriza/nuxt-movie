<template>
  <section class="relative">
    <div
      class="bg-cover bg-center w-full h-[500px] absolute top-0 left-0 z-[-2]"
      :style="{
        'background-image': `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${movie?.image})`,
        'background-size': 'cover',
        'background-position': 'center',
      }"
    />
    <div class="relative pt-[250px]">
      <div
        class="bg-white absolute top-[72%] bottom-0 left-0 right-0 z-[-1]"
      ></div>
      <div
        class="bg-[#00000080] absolute top-[60%] bottom-0 left-0 right-0 z-[-2]"
      ></div>
      <div class="flex justify-center">
        <MovieOverview
          :title="movie?.title"
          :releaseYear="movie?.year"
          :genres="movie?.genre.split(', ')"
          :rating="movie?.rating"
          :votes="3621"
          status="Released"
          language="English"
          :budget="200000000"
          production="DC Entertainment"
          :overview="movie?.description"
          :poster="movie?.image"
        />
      </div>
    </div>
    <!-- review section -->
    <div class="py-8 bg-white">
      <div class="container mx-auto mt-8">
        <div class="text-red-500 font-semibold uppercase mb-4">Reviews</div>
        <div class="overflow-x-auto pb-4">
          <div class="flex space-x-4">
            <ReviewCard
              v-for="review in reviews"
              :key="review.id"
              :reviewer="review.reviewer"
              :date="review.date"
              :profileImage="review.profileImage"
              :reviewText="review.reviewText"
              :rating="7.0"
              class="min-w-[580px]"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- recommendation section -->
    <div class="container mx-auto my-8">
      <div class="text-white font-semibold uppercase mb-4">Recommendation</div>
      <div class="flex justify-between items-center">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Movie {
  id: number;
  image: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  genre: string;
}
definePageMeta({
  layout: "detail",
});
const test: Movie = {
  id: 1,
  image:
    "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/90301/98769/the-creator-original-movie-poster-one-sheet-final-style-buy-now-at-starstills__81077.1697644483.jpg?c=2",
  title: "News of the World",
  genre: "Drama",
  rating: 7.2,
  year: 2021,
  description:
    "A Texan traveling across the wild West bringing the news of the world to local townspeople, agrees to help rescue a young girl who was kidnapped.",
};
const reviews = ref([
  {
    id: 1,
    reviewer: "Chris dos Santos",
    date: "December 18, 2020",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    reviewText:
      "It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore It isn't as easy as saying It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore It isn't as easy as saying It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore It isn't as easy as saying",
  },
]);
const movie = ref<Movie | null>(test);

const movies = ref<Movie[]>([
  {
    id: 1,
    genre: "Action, Adventure, Fantasy",
    image:
      "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/90301/98769/the-creator-original-movie-poster-one-sheet-final-style-buy-now-at-starstills__81077.1697644483.jpg?c=2",
    title: "Wonder Woman 1984",
    year: 2020,
    rating: 7.0,
    description:
      "A Texan traveling across the wild West bringing the news of the world to local townspeople, agrees to help rescue a young girl who was kidnapped.",
  },
]);

for (let i = 0; i < 4; i++) {
  movies.value.push({
    ...movies.value[0],
    id: i + 2,
    image: movies.value[0].image,
    rating: 6.0 + i / 10,
  });
}

for (let i = 0; i < 5; i++) {
  reviews.value.push({
    ...reviews.value[0],
    id: i + 3,
  });
}
</script>
