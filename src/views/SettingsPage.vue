<template>
  <div class="full">
    <h1>Settings</h1>
    <div class="option">
      <Switch @change="changeTheme($event)" :initial="currentTheme" />
      <p>Dark theme</p>
    </div>
    <div class="option">
      <Switch @change="cacheAssets($event)" :initial="assetsCached" />
      <p>Disable asset caching</p>
    </div>
    <div class="option">
      <Button text="Log In" @click="logIn" />
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

.option {
  display: grid;
  grid-template-columns: 4rem auto;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
<script>
import Switch from "../components/Switch.vue";
import Button from "../components/Button.vue";
export default {
  name: "SettingsPage",
  components: {
    Switch,
    Button,
  },
  methods: {
    changeTheme(e) {
      if (!localStorage.getItem("theme")) {
        console.log("previously unset theme");
        if (matchMedia("prefers-color-scheme: dark")) {
          this.$emit("switchTheme", "light");
        } else {
          this.$emit("switchTheme", "dark");
        }
      } else {
        if (localStorage.getItem("theme") == "dark") {
          this.$emit("switchTheme", "light");
        } else {
          this.$emit("switchTheme", "dark");
        }
      }
    },
    cacheAssets(e) {
      if (!localStorage.getItem("disable-caching")) {
        localStorage.setItem("disable-caching", "true");
      } else {
        if (localStorage.getItem("disable-caching") == "true") {
          localStorage.setItem("disable-caching", "false");
        } else {
          localStorage.setItem("disable-caching", "true");
        }
      }
    },
    logIn() {
      let pwd = prompt("Enter your password:");
      fetch(`/api/login?password=${pwd}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          window.localStorage.setItem("authToken", data.token);
          window.location.reload();
        });
    },
  },
  computed: {
    currentTheme() {
      if (window.localStorage.getItem("theme") == "dark") {
        return true;
      } else {
        return false;
      }
    },
    assetsCached() {
      if (window.localStorage.getItem("disable-caching") == "true") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

