<template>
  <div class="flex items-center py-[50px]">
    <img
      :src="poster"
      :alt="title"
      class="object-cover"
      height="360px"
      width="240px"
    />
    <div
      class="flex flex-col bg-black p-4 rounded h-[320px] w-[320px] overflow-clip"
    >
      <div class="flex items-center space-x-1">
        <Icon name="ic:round-star" size="16px" class="text-yellow-400" />
        <p class="text-white font-bold">{{ rating }}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <h2 class="text-2xl text-white">{{ title }}</h2>
        <p class="text-l text-gray-400">{{ year }} • {{ genre }}</p>
        <p class="text-sm text-white">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
