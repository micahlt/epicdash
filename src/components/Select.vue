<template>
  <div :class="{ 'select-parent': true, open: isOpen }" v-click-outside="close">
    <a href="#" @click.prevent="open" class="select"
      >{{ titleN }}
      <span class="material-icons-outlined"> arrow_drop_down </span>
    </a>
    <transition name="sel">
      <div class="options" v-if="isOpen">
        <a
          href="#"
          @click.prevent="select(i)"
          class="item"
          v-for="(item, i) in [{ title: title }, ...options]"
          :key="i"
          >{{ item.title }}</a
        >
      </div>
    </transition>
  </div>
</template>
  
<style scoped>
.select-parent {
  position: relative;
  width: max-content;
  transform: translateY(2px);
  z-index: 1;
}
a.select {
  background: var(--a-light);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--a-darker);
  box-shadow: var(--shadow-1);
}

a.select:hover {
  box-shadow: var(--shadow-2);
}

a .material-icons-outlined {
  transform: translateY(0.35rem);
}

.select-parent.open a .material-icons-outlined {
  transform: translateY(0.35rem) rotate(180deg);
}

.options {
  background: var(--bg-2);
  position: absolute;
  top: 3rem;
  min-width: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  clip-path: circle(75%);
  box-shadow: var(--shadow-2);
  max-height: 50vh;
  overflow-y: auto;
  z-index: 1;
}

.options > a {
  color: var(--txt-1);
  text-decoration: none;
  padding: 1rem;
  border-bottom: 1px solid var(--outline);
  min-width: max-content;
}

.options > a:hover {
  background: var(--a-light);
  color: var(--bg-1);
}

.options > a:first-of-type {
  background: var(--bg-1);
}

.options a:last-of-type {
  border-bottom: none;
}

.options::-webkit-scrollbar-thumb {
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
.sel-enter-active,
.sel-leave-active {
  transition: all 0.2s;
}

.sel-enter-from,
.sel-leave-to {
  clip-path: circle(0% at 0% 0%);
}

.select {
  color: var(--a-darker);
  background: var(--a-light);
  background-position: center;
  transition: background 0.65s, box-shadow 0.2s;
}

.select:hover {
  background: var(--a-lighter)
    radial-gradient(circle, transparent 1%, var(--a-lighter) 1%) center/15000%;
}
.select:active {
  background-color: var(--a-light);
  background-size: 100%;
  transition: background 0s;
}
</style>

<script>
import vClickOutside from "click-outside-vue3";
export default {
  name: "Select",
  emits: ["change"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    title: {
      type: String,
      default: "Select",
    },
    options: {
      type: Array,
    },
  },
  data() {
    return {
      isOpen: false,
      titleN: "Select",
    };
  },
  methods: {
    open() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    close() {
      this.isOpen = false;
    },
    select(e) {
      console.log(e);
      this.isOpen = false;
      if (e != 0) {
        this.titleN = this.options[e - 1].title;
        this.$emit("change", this.options[e - 1]);
      } else {
        this.titleN = this.title;
        this.$emit("change", {
          title: "",
        });
      }
    },
  },
  mounted() {
    this.titleN = this.title;
  },
};
</script>

