<template>
  <div class="full">
    <h1>Home</h1>
    <div class="card-grid">
      <Card
        header="Welcome to Epic Dash"
        description="Epic Dashboard is the one-stop shop for all the info regarding our digital marketing solutions."
        primaryOpt="Sites"
        secondaryOpt="Portals"
        imageUrl="url('/dash-image.jpg')"
        @clickPrimary="$router.push('/sites')"
        @clickSecondary="$router.push('/portals')"
      />
      <Card
        header="You're a guest"
        description="Please sign in to access sensitive information or perform administrator actions like creating sites."
        primaryOpt="Log In"
        imageUrl="url('/keys-image.png')"
        @clickPrimary="$router.push('/settings')"
      />
    </div>
  </div>
</template>
  
<style scoped>
h1 {
  margin-bottom: 1rem;
}
.full {
  padding: 2rem;
}

:deep(.card) {
  margin-right: 1rem;
  margin-bottom: 1rem;
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

