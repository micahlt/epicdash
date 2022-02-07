<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="parent">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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
</style>
