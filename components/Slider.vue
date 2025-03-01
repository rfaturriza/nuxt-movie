<template>
  <div class="flex flex-col items-center">
    <!-- Slider Wrapper -->
    <div class="relative w-full overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }"
      >
        <SliderCard
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
          :class="getSlideClass(index)"
          class="w-1/3 flex-shrink-0"
        />
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="flex my-4 space-x-4 justify-center">
      <button
        v-for="(_, index) in movies"
        :key="index"
        @click="goToSlide(index)"
        :class="{
          'bg-[#E74C3C] w-10': currentIndex === index,
          'bg-gray-400 w-2': currentIndex !== index,
        }"
        class="h-2 rounded-full transition-all duration-300 ease-in-out hover:bg-red-300"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ movies: Movie[] }>();

const currentIndex = ref(0);

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.movies.length;
};

// Auto-slide every 3 seconds
onMounted(() => {
  setInterval(nextSlide, 3000);
});

// Determine slide classes
const getSlideClass = (index: number) => {
  if (index === currentIndex.value + 1) {
    return "active-slide";
  } else if (index < currentIndex.value) {
    return "left-slide";
  } else {
    return "right-slide";
  }
};
</script>

<style scoped>
/* Active slide centered */
.active-slide {
  transform: scale(1);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Left & Right slides */
.left-slide,
.right-slide {
  transform: scale(0.9);
  opacity: 0.4;
  transition: transform 0.5s ease, opacity 0.5s ease;
}
</style>
