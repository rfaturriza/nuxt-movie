<template>
  <div class="text-white relative">
    <div class="absolute inset-0 bg-[#1E232B] z-[-999]"></div>

    <Header
      :header-class="
        isAtTop ? 'bg-transparent fixed top-0 w-full z-50' : 'bg-white/5'
      "
    />

    <slot />
    <Footer />
  </div>
</template>

<script setup>
const isAtTop = ref(true);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isAtTop.value = window.scrollY < 100;
  });
});
</script>
