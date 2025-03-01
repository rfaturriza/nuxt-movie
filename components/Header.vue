<template>
  <header :class="headerClass">
    <div class="container mx-auto px-2 md:px-0">
      <div class="flex justify-between items-center h-16">
        <div class="flex">
          <NuxtLink to="/">
            <NuxtImg class="h-8 w-auto" src="/images/logo.svg" alt="logo website" />
          </NuxtLink>
        </div>

        <div class="hidden md:block flex-1 px-4">
          <SearchBar
            v-model="query"
            :fetchSuggestions="getSuggestions"
            @search="performSearch"
            @select="handleSelection"
          />
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex space-x-8">
            <div class="relative">
              <button
                @click="toggleCategoryDropdown"
                class="flex gap-3 focus:outline-none"
              >
                <Icon name="ic:round-grid-view" size="20px" />CATEGORIES
              </button>
              <div
                v-if="showCategoryDropdown"
                class="absolute z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-white/10 text-[#1E232B]"
              >
                <a
                  v-for="category in categories"
                  :key="category"
                  href="#"
                  class="block py-2 text-sm hover:bg-gray-300 uppercase font-semibold"
                >
                  {{ category }}
                </a>
              </div>
            </div>
            <a
              v-for="navLink in navLinks"
              :key="navLink.name"
              :href="navLink.url"
              class="text-gray-400 hover:text-gray-500 uppercase"
            >
              {{ navLink.name }}
            </a>
          </div>
        </div>
        <div class="md:hidden">
          <button
            type="button"
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <Icon name="ic:baseline-menu" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="mobileMenu" class="md:hidden" id="mobile-menu">
      <div class="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <button
          @click="toggleCategoryDropdown"
          class="flex items-center justify-between w-full font-medium rounded-md uppercase"
        >
          <span>Categories</span>
          <Icon name="ic:round-expand-more" class="h-5 w-5" />
        </button>
        <div
          v-if="showCategoryDropdown"
          class="mt-1 space-y-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            v-for="category in categories"
            :key="category"
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-200 rounded-md hover:text-gray-200 hover:bg-gray-100"
          >
            {{ category }}
          </a>
        </div>
        <a
          v-for="navLink in navLinks"
          :key="navLink.name"
          :href="navLink.url"
          class="text-white hover:text-gray-500 uppercase"
        >
          {{ navLink.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps({
  headerClass: { type: String, default: "bg-white/5" },
});
const showCategoryDropdown = ref(false);
const mobileMenu = ref(false);

const categories = [
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
];

const navLinks = [
  { name: "Movies", url: "#" },
  { name: "TV Shows", url: "#" },
  { name: "Login", url: "#" },
];
const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value;
};
const toggleCategoryDropdown = () => {
  showCategoryDropdown.value = !showCategoryDropdown.value;
};
const query = ref("");

const { data: suggestions, execute: fetchSuggestions } = useAuthApi<
  Pagination<Movie>
>("/search/movie", {
  params: {
    query,
    include_adult: true,
    page: 1,
  },
  immediate: false,
});

const getSuggestions = async (text: string) => {
  if (!text) return [];
  query.value = text;

  await fetchSuggestions();
  return suggestions.value?.results ?? [];
};

const performSearch = async (searchText: string) => {
  navigateTo(`/search?q=${searchText}`);
};

const handleSelection = (movie: Movie) => {
  navigateTo(`/detail/${movie.id}`);
};
</script>
