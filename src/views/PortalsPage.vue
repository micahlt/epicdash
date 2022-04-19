<template>
  <div class="full">
    <h1>Portals</h1>
    <div class="card-grid">
      <Card
        v-for="p in portals"
        :key="p.url"
        :header="p.title"
        imageUrl="conic-gradient(from 50deg at 47% 100%, var(--a-lighter) 0%, var(--a-lighter) 35%, var(--a-light) 100%) !important"
        primaryOpt="Visit"
        :description="p.url"
        @clickPrimary="go(p.url)"
      />
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

:deep(.card) {
  margin: 1rem 1rem 1rem 0;
}
</style>
<script>
import Card from "../components/Card.vue";
import Chip from "../components/Chip.vue";
export default {
  name: "SitesPage",
  components: {
    Card,
    Chip,
  },
  data() {
    return {
      portals: [],
      selected: "",
    };
  },
  methods: {
    go(url) {
      window.open(url);
    },
  },
  async mounted() {
    let portals = await fetch("/portals.json");
    portals = await portals.json();
    this.portals = portals.all;
  },
};
</script>

