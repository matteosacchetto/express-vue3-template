<template>
  <div class="about text-center">
    <Example msg="This is an about page" />
  </div>
</template>

<script>
import Example from "@/components/Example.vue";

export default {
  name: "About",
  components: {
    Example,
  },
};
</script>
