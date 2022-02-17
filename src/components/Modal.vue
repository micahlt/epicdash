<template>
  <div>
    <div class="modal-parent">
      <div class="modal">
        <Card
          :header="$modal.title"
          :description="$modal.description"
          :primaryOpt="$modal.options.primary"
          @clickPrimary="dismiss(1)"
          :secondaryOpt="$modal.options.secondary"
          @clickSecondary="dismiss(2)"
        />
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.modal-parent {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: grid;
  align-items: center;
  text-align: center;
}

.modal {
  margin: auto;
}
</style>

<script>
import Card from "./Card.vue";
export default {
  name: "Modal",
  emits: ["click"],
  components: {
    Card,
  },
  methods: {
    dismiss(n) {
      this.$modal.response = n;
      setTimeout(() => {
        this.$modal.open = false;
      }, 500);
    },
  },
};
</script>

