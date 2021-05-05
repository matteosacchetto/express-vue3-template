<template>
  <div class="example flex flex-col items-center justify-center">
    <slot name="title">
      <h1 class="text-3xl font-bold pb-2">{{ msg }}</h1>
    </slot>
    <slot name="content">
      <p class="py-4 w-full md:w-1/2 lg:w-1/3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
        laudantium praesentium reiciendis labore illo porro aspernatur iure quos
        molestias perspiciatis ex reprehenderit in! Fugit nisi harum quod
        nostrum dolorem dolorum.
      </p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Example",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
