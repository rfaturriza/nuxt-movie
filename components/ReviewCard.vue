<template>
  <div class="p-4 rounded-xl order bg-[#F9F9F9] shadow-sm">
    <div class="flex space-x-4 justify-between">
      <div class="flex items-center space-x-2">
        <!-- Profile Image -->
        <img
          :src="profileImage"
          alt="Reviewer Image"
          class="w-10 h-10 rounded-full object-cover bg-gray-300"
        />

        <!-- Reviewer Name & Date -->
        <div class="ml-2">
          <div class="text-sm font-bold text-black">{{ reviewer }}</div>
          <div class="text-xs text-gray-500">{{ date }}</div>
        </div>
      </div>
      <!-- Rating Badge -->
      <div class="flex items-center">
        <div
          class="bg-[#C4C4C447] px-3 py-1 rounded-lg flex items-start space-x-1"
        >
          <Icon name="ic:star" size="16" class="text-yellow-400" />
          <span class="font-semibold text-black text-3xl">{{ rating }}</span>
        </div>
      </div>
    </div>

    <!-- Review Content -->
    <div class="flex-1">
      <!-- Review Text -->
      <p class="mt-2 text-sm text-gray-700 leading-relaxed italic">
        <span :class="`${showFullReview ? 'line-clamp-none' : 'line-clamp-6'}`">
          {{ reviewText }}
        </span>
        <span
          class="text-red-500 cursor-pointer underline italic"
          @click="toggleFullReview"
        >
          {{ showFullReview ? "show less" : "read the rest." }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reviewer: { type: String, required: true },
  date: { type: String, required: true },
  profileImage: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
});

const showFullReview = ref(false);

const toggleFullReview = () => {
  showFullReview.value = !showFullReview.value;
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
