<template>
  <Slider :movies="movies" />
  <Discover />
</template>

<script setup>
const movies = [
  {
    poster:
      "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/90301/98769/the-creator-original-movie-poster-one-sheet-final-style-buy-now-at-starstills__81077.1697644483.jpg?c=2",
    title: "News of the World",
    genre: "Drama",
    rating: 7.2,
    year: "2021",
    genre: "Drama",
    description:
      "A Texan traveling across the wild West bringing the news of the world to local townspeople, agrees to help rescue a young girl who was kidnapped.",
  },
];

for (let i = 0; i < 5; i++) {
  movies.push({
    poster: movies[0].poster,
    title: `Movie ${i + 2}`,
    genre: "Action",
    rating: 6.0 + i / 10,
    year: "2021",
    genre: "Action",
    description: `Description for Movie ${i + 2}`,
  });
}
</script>
