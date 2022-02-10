<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  methods: {
    setTheme(theme) {
      console.log("setting theme to", theme);
      if (theme == "dark") {
        window.localStorage.setItem("theme", "dark");
        document.getElementsByTagName("html")[0].classList.remove("light");
        document.getElementsByTagName("html")[0].classList.add("dark");
      } else {
        window.localStorage.setItem("theme", "light");
        document.getElementsByTagName("html")[0].classList.remove("dark");
        document.getElementsByTagName("html")[0].classList.add("light");
      }
    },
  },
  beforeMount() {
    if (
      matchMedia("prefers-color-scheme: dark") &&
      localStorage.getItem("theme") != "light"
    ) {
      this.setTheme("dark");
    } else {
      this.setTheme("light");
    }
    if (window.localStorage.getItem("username")) {
      fetch(
        `/api/authcheck?username=${window.localStorage.getItem(
          "username"
        )}&token=${window.localStorage.getItem("token")}`
      ).then((res) => {
        if (!res.ok) {
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("token");
          window.location.reload();
        }
      });
    }
  },
};
</script>

<template>
  <div class="parent">
    <NavBar />
    <div class="view">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" @switchTheme="setTheme($event)" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Work Sans", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg-1);
  height: 100vh;
  width: 100%;
  color: var(--txt-1);
  overflow: hidden;
}

.parent {
  display: grid;
  grid-template-columns: 6rem auto;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0.5%);
}

@media only screen and (max-width: 675px) {
  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(0.8%);
  }
}

.view {
  overflow-y: auto;
  overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--txt-2);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media only screen and (max-width: 675px) {
  .parent {
    grid-template-columns: auto;
    grid-template-rows: auto 4.5rem;
  }
  .view {
    grid-row: 1 / 2;
  }
}
</style>
