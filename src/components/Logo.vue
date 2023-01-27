<template>
  <Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
</template>

<script lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

export default {
  name: "Logo",
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    };
  },
};
</script>
