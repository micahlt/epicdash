<template>
  <div class="card">
    <div
      class="image"
      v-if="imageUrl != 'none'"
      :style="{ 'background-image': `url(${imageUrl})` }"
    ></div>
    <div class="content">
      <h2>{{ header }}</h2>
      <p>{{ description }}</p>
      <div class="buttons">
        <a href="#" @click="$emit('clickPrimary')">{{ primaryOpt }}</a>
        <a href="#" @click="$emit('clickSecondary')">{{ secondaryOpt }}</a>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.card {
  background: var(--bg-2);
  padding: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: box-shadow 0.2s;
  max-width: 25rem;
}

.card:hover {
  box-shadow: var(--shadow-2);
}

.image {
  width: calc(100% + 2em);
  height: 10rem;
  margin: -1rem;
  background-size: cover;
  border-radius: 0.75rem;
}

.content {
  padding-top: 2rem;
}

p {
  font-size: 0.8rem;
  color: var(--txt-2);
}

.buttons {
  padding-top: 1.2rem;
  display: grid;
  grid-template-columns: auto auto;
  width: max-content;
}

a {
  display: block;
  text-decoration: none;
  width: max-content;
  padding: 0.625rem 1.4rem;
  border-radius: 1.625rem;
  color: var(--a-light);
}

a:first-of-type {
  color: var(--a-darker);
  background: var(--a-light);
}

a:first-of-type {
  background-position: center;
  transition: background 0.65s;
}

a:first-of-type:hover {
  background: var(--a-lighter)
    radial-gradient(circle, transparent 1%, var(--a-lighter) 1%) center/15000%;
}
a:first-of-type:active {
  background-color: var(--a-light);
  background-size: 100%;
  transition: background 0s;
}
</style>

<script>
export default {
  name: "Card",
  emits: ["clickPrimary", "clickSecondary"],
  props: {
    header: String,
    description: String,
    primaryOpt: String,
    secondaryOpt: String,
    imageUrl: {
      type: String,
      default: "none",
    },
  },
};
</script>

