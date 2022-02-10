<template>
  <div class="full">
    <h1>
      Sites
      <div v-if="loggedIn" class="sync-notifier">
        <p>refreshing thumbnails</p>
        <span class="material-icons-outlined">sync</span>
      </div>
    </h1>
    <div class="chips" v-if="loggedIn">
      <Chip
        :icon="selected == 'll' ? 'check_circle' : 'circle'"
        text="Loyalty Lane"
        :selected="selected == 'll'"
        @click="select('ll')"
      />
      <Chip
        :icon="selected == 'nf' ? 'check_circle' : 'circle'"
        text="Non-Food Sites"
        :selected="selected == 'nf'"
        @click="select('nf')"
      />
    </div>
    <div class="card-grid">
      <Card
        v-for="s in sites.filter((el) => el.labels.includes(selected))"
        :key="s.url"
        :header="s.title"
        :description="s.url"
        :imageUrl="s.img"
        primaryOpt="Visit"
        @clickPrimary="go(s.url)"
        secondaryOpt="WP Admin"
        @clickSecondary="go(s.url + 'wp-admin')"
      />
    </div>
    <div class="unauth-parent" v-if="!loggedIn">
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
.full {
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

.chips :deep(.chip) {
  margin-right: 0.3rem;
}

:deep(.card) {
  margin: 1rem 1rem 1rem 0;
}

.sync-notifier {
  float: right;
  margin-right: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
}

.sync-notifier span {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

.sync-notifier p {
  font-size: 0.8rem;
  margin-right: 0.8rem;
  font-weight: normal;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
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
      sites: [],
      interval: 0,
      selected: "all",
    };
  },
  methods: {
    select(opt) {
      if (this.selected != opt) {
        this.selected = opt;
      } else {
        this.selected = "all";
      }
    },
    go(url) {
      window.open(url);
    },
    async siteImage(url, index, offset) {
      if (!offset) {
        offset = 0;
      }
      if (
        this.sites[index].img ==
          "conic-gradient(from 50deg at 47% 100%,var(--a-lighter) 0%,var(--a-light) 150%) !important" ||
        !this.sites[index].img
      ) {
        let res = await fetch(`https://epicdash.vercel.app/api/res?url=${url}`);
        if (res.ok) {
          let text = await res.text();
          this.sites[index].img = `url(${text})`;
        } else {
          setTimeout(() => {
            this.siteImage(url, index, offset + 2000);
          }, offset);
        }
      }
    },
  },
  async mounted() {
    if (this.loggedIn) {
      let sites = await fetch(
        `/api/sites?username=${window.localStorage.getItem(
          "username"
        )}&token=${encodeURIComponent(window.localStorage.getItem("token"))}`
      );
      sites = await sites.json();
      this.sites = sites.all;
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
        if (i === this.sites.length) clearInterval(this.interval);
      }, 10);
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    loggedIn() {
      if (
        window.localStorage.getItem("username") &&
        window.localStorage.getItem("token")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

