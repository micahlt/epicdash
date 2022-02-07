<template>
  <div class="full">
    <h1>Home</h1>
    <Card
      header="Card Test"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu venenatis lorem. Donec id dignissim risus. Sed iaculis blandit tellus quis vulputate. Maecenas tristique lacus."
      primaryOpt="Do this"
      secondaryOpt="Do that"
      imageUrl="https://images.unsplash.com/photo-1638913660695-b490171d17c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
      @clickPrimary="log('click 1')"
      @clickSecondary="log('click 2')"
    />
  </div>
</template>
  
<style scoped>
h1 {
  margin-bottom: 1rem;
}
.full {
  padding: 2rem;
}
</style>
<script>
import Card from "../components/Card.vue";
export default {
  name: "HomePage",
  components: {
    Card,
  },
  methods: {
    log(t) {
      console.log(t);
    },
  },
};
</script>

