<template>
  <div class="text-white relative">
    <div class="absolute inset-0 bg-[#1E232B] z-[-999]"></div>

    <Header
      :class="[
        'fixed top-0 w-full z-50 transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isAtTop ? 'bg-transparent' : 'bg-white/5 backdrop-blur-sm',
      ]"
    />

    <slot />
    <Footer />
  </div>
</template>

<script setup>
const isAtTop = ref(true);
const lastScrollY = ref(0);
const isVisible = ref(true);

onMounted(() => {
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Check if at the top
    isAtTop.value = currentScrollY < 100;

    // Show header when scrolling up, hide when scrolling down
    if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
      isVisible.value = false; // Scrolling down
    } else {
      isVisible.value = true; // Scrolling up or at the top
    }

    lastScrollY.value = currentScrollY;
  });
});
</script>
