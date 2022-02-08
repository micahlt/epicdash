<template>
  <label class="container">
    <input
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
      :checked="initial"
    />
    <div class="switch"></div>
  </label>
</template>
  
<style scoped>
.container {
  display: block;
}
.container input {
  display: none;
}

.switch {
  display: block;
  width: 3.4rem;
  height: 1.6rem;
  border-radius: 1.6rem;
  background: var(--bg-2);
  cursor: pointer;
  position: relative;
  transition: all 0.1s;
}

.switch:after {
  content: "";
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  background: var(--a-light);
  position: absolute;
  top: 0.21rem;
  left: 0.21rem;
  transition: left 0.1s;
}

.container input:checked ~ .switch:after {
  left: 2rem;
}

.container input:checked ~ .switch {
  background: var(--a-dark);
}
</style>

<script>
export default {
  name: "Switch",
  emits: ["change"],
  props: {
    initial: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

