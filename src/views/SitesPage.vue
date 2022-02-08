<template>
  <div class="full">
    <h1>Sites</h1>
    <div class="grid">
      <Card
        v-for="s in sites"
        :key="s.url"
        :header="s.title"
        :imageUrl="s.img"
        primaryOpt="Visit"
        @clickPrimary="go(s.url)"
        secondaryOpt="WP Admin"
        @clickSecondary="go(s.url + 'wp-admin')"
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
  margin: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: start;
}

@media only screen and (max-width: 1490px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media only screen and (max-width: 830px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (max-width: 675px) {
  .grid {
    grid-template-columns: 1fr;
  }
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
      sites: [],
      interval: {},
    };
  },
  methods: {
    go(url) {
      window.open(url);
    },
    async siteImage(url, index) {
      if (
        this.sites[index].img ==
          "conic-gradient(from 50deg at 47% 100%,var(--a-lighter) 0%,var(--a-light) 150%) !important" ||
        !this.sites[index].img
      ) {
        let res = await fetch(`/api/res.js?url=${url}`);
        let text = await res.text();
        this.sites[index].img = `url(${text})`;
      }
    },
  },
  async mounted() {
    let sites = await fetch("/sites.json");
    sites = await sites.json();
    this.sites = sites.array;
    console.log(sites);
    this.sites.forEach((site, i) => {
      if (!site.img) {
        this.sites[i].img =
          "conic-gradient(from 50deg at 47% 100%,var(--a-lighter) 0%,var(--a-light) 150%) !important";
      }
    });
    let i = 0;
    this.interval = setInterval(() => {
      let obj = this.sites[i];
      this.siteImage(obj.url, i);
      i++;
      if (i === this.sites.length) clearInterval(interval);
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

