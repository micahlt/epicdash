<template>
  <div class="full">
    <h1>404 - Not Found</h1>
    <p>
      We couldn't find this page.<br />
      <Button text="Go home" mode="router" to="/" type="outline" />
    </p>
  </div>
</template>
  
<style scoped>
h1 {
  margin-bottom: 1rem;
}
.full {
  padding: 2rem;
}

:deep(a) {
  margin-top: 0.5rem;
}
</style>
<script>
import Button from "../components/Button.vue";
export default {
  name: "NotFoundPage",
  components: {
    Button,
  },
  methods: {
    log(t) {
      console.log(t);
    },
  },
};
</script>

