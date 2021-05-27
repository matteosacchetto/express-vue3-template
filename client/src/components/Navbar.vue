<template>
  <div class="navbar flex items-center justify-center bg-green-500">
    <div
      class="
        container
        px-4
        sm:px-6
        flex
        items-center
        justify-center
        space-x-4
        py-3
      "
    >
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        active-class="text-white"
        >{{ link.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          to: "/",
          name: "Home",
        },
        {
          to: "/about",
          name: "About",
        },
      ],
    };
  },
};
</script>
