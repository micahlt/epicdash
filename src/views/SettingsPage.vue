<template>
  <div class="full">
    <h1>Settings</h1>
    <div class="option">
      <Switch @change="changeTheme($event)" :initial="defaultSwitch" />
      <p>Dark theme</p>
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
}
</style>
<script>
import Switch from "../components/Switch.vue";
export default {
  name: "SettingsPage",
  components: {
    Switch,
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
  },
  computed: {
    defaultSwitch() {
      if (window.localStorage.getItem("theme") == "dark") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

