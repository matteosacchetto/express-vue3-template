<template>
  <div class="home text-center">
    <Example>
      <template v-slot:title>
        <h1 class="text-3xl font-bold pb-2">
          Welcome to<br />
          <span class="text-green-500">Express + Vue3</span>
        </h1>
      </template>
    </Example>
  </div>
</template>

<script>
// @ is an alias to /src
import Example from "@/components/Example.vue";

export default {
  name: "Home",
  components: {
    Example,
  },
};
</script>

<style scoped></style>
