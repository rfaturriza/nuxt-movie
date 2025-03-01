<template>
  <div class="bg-[#00000021] rounded-md w-full relative">
    <!-- icon prefix -->
    <div class="flex items-center px-3 py-1">
      <Icon name="ic:baseline-movie" class="h-8 w-8 text-[#FFFFFF2B]" />
      <form
        @submit.prevent="$emit('search', searchText)"
        class="flex flex-1 items-center"
      >
        <input
          type="text"
          class="w-full bg-transparent focus:outline-none px-2 py-1"
          placeholder="Find movie"
          v-model="searchText"
          @input="handleInput"
        />
        <!-- icon button suffix search -->
        <button type="submit">
          <Icon
            name="ic:baseline-search"
            class="h-5 w-5 text-white cursor-pointer"
          />
        </button>
      </form>
    </div>

    <!-- Suggestions dropdown -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute w-full bg-[#000000E5] rounded-md mt-1 max-h-60 overflow-y-auto z-10"
    >
      <div
        v-for="(movie, index) in suggestions"
        :key="index"
        class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
        @click="selectSuggestion(movie)"
      >
        <span v-html="highlightMatch(movie.title, searchText)"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
const suggestions = ref<Movie[]>([]);
const showSuggestions = ref(false);
let debounceTimeout: NodeJS.Timeout | undefined = undefined;

watch(
  () => props.modelValue,
  (newValue) => {
    searchText.value = newValue;
  }
);

watch(searchText, (newValue) => {
  emit("update:modelValue", newValue);
});

const highlightMatch = (text: string, search: string) => {
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

const selectSuggestion = (suggestion: Movie) => {
  console.log("suggestion:", suggestion);
  searchText.value = suggestion.title;
  showSuggestions.value = false;
  emit("select", suggestion);
};

// Hide suggestions when clicking outside
const clickOutside = (event: MouseEvent) => {
  if (!(event.target as Element).closest(".search-bar")) {
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
