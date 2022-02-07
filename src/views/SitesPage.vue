<template>
  <div class="full">
    <h1>Sites</h1>
    <div class="grid">
      <Card v-for="s in sites" :key="s.url" />
    </div>
  </div>
</template>
  
<style scoped>
.full {
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

.grid {
  grid-template-columns: repeat(1fr, 4);
}
</style>
<script>
import Card from "../components/Card.vue";
export default {
  name: "SitesPage",
  components: {
    Card,
  },
  data() {
    return {
      sites: [
        {
          url: "https://www.adrienssupermarket.com/",
        },
      ],
    };
  },
  computed: {
    siteImage(url) {
      return null;
    },
  },
};
</script>

