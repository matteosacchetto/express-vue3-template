<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar />
    <div
      class="
        container
        mx-auto
        px-4
        sm:px-6
        flex flex-1
        items-center
        justify-center
      "
    >
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>
