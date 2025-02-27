<template>
  <div class="bg-[#00000021] rounded-md w-full relative">
    <!-- icon prefix -->
    <div class="flex items-center px-3 py-1">
      <Icon name="ic:baseline-movie" class="h-8 w-8 text-[#FFFFFF2B]" />
      <input
        type="text"
        class="w-full bg-transparent focus:outline-none px-2 py-1"
        placeholder="Find movie"
        v-model="searchText"
        @input="handleInput"
      />
      <!-- icon button suffix search -->
      <Icon
        name="ic:baseline-search"
        class="h-5 w-5 text-white cursor-pointer"
        @click="$emit('search', searchText)"
      />
    </div>

    <!-- Suggestions dropdown -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute w-full bg-[#000000E5] rounded-md mt-1 max-h-60 overflow-y-auto z-10"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        <span
          v-if="suggestion.title"
          v-html="highlightMatch(suggestion.title, searchText)"
        ></span>
        <span v-else v-html="highlightMatch(suggestion, searchText)"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  fetchSuggestions: {
    type: Function,
    default: null,
  },
  debounceTime: {
    type: Number,
    default: 300,
  },
});

const emit = defineEmits(["update:modelValue", "search", "select"]);

const searchText = ref(props.modelValue);
const suggestions = ref([]);
const showSuggestions = ref(false);
let debounceTimeout = null;

watch(
  () => props.modelValue,
  (newValue) => {
    searchText.value = newValue;
  }
);

watch(searchText, (newValue) => {
  emit("update:modelValue", newValue);
});

const highlightMatch = (text, search) => {
  if (!search) {
    return text;
  }

  const regex = new RegExp(search, "gi");
  return text.replace(
    regex,
    (match) => `<span class="font-bold">${match}</span>`
  );
};

const handleInput = () => {
  showSuggestions.value = true;

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(async () => {
    if (props.fetchSuggestions && searchText.value) {
      try {
        const result = await props.fetchSuggestions(searchText.value);
        suggestions.value = result;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      suggestions.value = [];
    }
  }, props.debounceTime);
};

const selectSuggestion = (suggestion) => {
  searchText.value = suggestion.title || suggestion;
  showSuggestions.value = false;
  emit("select", suggestion);
};

// Hide suggestions when clicking outside
const clickOutside = (event) => {
  if (!event.target.closest(".search-bar")) {
    showSuggestions.value = false;
  }
};

// Lifecycle hooks for click outside
onMounted(() => {
  document.addEventListener("click", clickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside);
});
</script>
