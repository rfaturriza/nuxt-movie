<template>
  <div
    class="p-4 rounded-lg w-64 text-white bg-gradient-to-b from-[#0E1723] to-[#1E232A00]"
  >
    <!-- Sorting Dropdown -->
    <label class="text-sm font-semibold">Sort Result By</label>
    <div class="my-[18px] border-b-[1px] border-[#FFFFFF12]"></div>
    <select
      v-model="selectedSort"
      class="w-full mt-1 p-2 bg-gray-800 rounded-lg focus:outline-none"
    >
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Genres Checkbox List -->
    <div class="mt-4">
      <div class="my-[18px] border-b-[1px] border-[#FFFFFF12]"></div>
      <label class="text-sm font-semibold">Genres</label>
      <div class="my-[18px] border-b-[1px] border-[#FFFFFF12]"></div>
      <div class="mt-2 space-y-2">
        <div
          v-for="(genre, index) in genres"
          :key="index"
          class="flex items-center"
        >
          <div class="flex items-center justify-between w-full space-y-2">
            <label
              :for="`genre-checkbox-${index}`"
              class="text-sm cursor-pointer"
              >{{ genre.label }}</label
            >
            <input
              :id="`genre-checkbox-${index}`"
              type="checkbox"
              :value="genre.value"
              v-model="selectedGenres"
              class="form-checkbox h-4 w-4 text-red-500 bg-[#FFFFFF33] border-gray-700 rounded focus:ring-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sortBy: { type: String, required: true },
  genres: { type: Array as PropType<string[]>, required: true },
});
const emit = defineEmits(["sortChange", "genresChange"]);

const sortOptions = ref([
  { label: "Popularity", value: "popularity.desc" },
  { label: "Release Date", value: "primary_release_date.desc" },
  { label: "Rating", value: "vote_average.desc" },
]);

const selectedSort = ref(sortOptions.value[0].value); // Default selected "Popularity"
// Selected genres
const selectedGenres = ref<number[]>([]);

onMounted(() => {
  selectedGenres.value = props.genres.map((genre) => parseInt(genre));
  selectedSort.value = props.sortBy;
});

// Genres list with IDs based on TMDB
const genres = ref([
  { label: "Action", value: 28 },
  { label: "Adventure", value: 12 },
  { label: "Animation", value: 16 },
  { label: "Comedy", value: 35 },
  { label: "Crime", value: 80 },
  { label: "Documentary", value: 99 },
  { label: "Drama", value: 18 },
  { label: "Family", value: 10751 },
  { label: "Fantasy", value: 14 },
  { label: "History", value: 36 },
  { label: "Horror", value: 27 },
]);

// Watch for changes in sorting and emit events
watch(selectedSort, (newValue) => {
  emit("sortChange", newValue);
});

// Watch for changes in genre selection and emit events
watch(
  selectedGenres,
  (newValue) => {
    emit("genresChange", newValue);
  },
  { deep: true }
);
</script>
