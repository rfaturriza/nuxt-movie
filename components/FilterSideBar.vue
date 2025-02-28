<template>
  <!-- <div class="p-4 rounded-lg w-64 text-white" style="background: linear-gradient(180deg, #0E1723 0%, #1E232A00 100%);"> -->
  <div
    class="p-4 rounded-lg w-64 text-white bg-gradient-to-b from-[#0E1723] to-[#1E232A00]"
  >
    <!-- Sorting Dropdown -->
    <label class="text-sm font-semibold">Sort Result By</label>
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
      <label class="text-sm font-semibold">Genres</label>
      <div class="mt-2 space-y-2">
        <div
          v-for="(genre, index) in genres"
          :key="index"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="genre"
            v-model="selectedGenres"
            class="form-checkbox h-4 w-4 text-red-500 bg-gray-800 border-gray-700 rounded focus:ring-0"
          />
          <span class="ml-2 text-sm">{{ genre }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sorting options
const sortOptions = ref([
  { label: "Popularity", value: "popularity" },
  { label: "Release Date", value: "release_date" },
  { label: "Rating", value: "rating" },
]);

// Selected sorting option
const selectedSort = ref("popularity");

// Genre list
const genres = ref([
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
]);

// Selected genres
const selectedGenres = ref(["Action"]); // Default checked "Action"
</script>
