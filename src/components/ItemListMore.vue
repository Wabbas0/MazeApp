<template>
  <div>
    <div v-show="loadMore" class="more-container">
      <Vue3Lottie
        v-if="loading"
        :animationData="loadingtv"
        :height="150"
        :width="150"
      />
      <a href="#" @click.prevent="viewMoreData" v-else>
        <span>Load more results</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import loadingtv from "../assets/loadingtv.json";

export default {
  name: "ItemListMore",
  props: ["loading", "loadMore"],
  data() {
    return { loadingtv };
  },
  methods: {
    viewMoreData() {
      this.$emit("view-more");
    },
  },
};
</script>

<style lang="scss" scoped>
.more-container {
  text-align: center;
  margin-top: 2em;
  a {
    display: inline-block;
    padding: 10px 0;
    border: 1px solid $background-border;
    width: 10em;
    outline: 0;
    color: $color-menu;
    background-color: transparent;
    font-size: 0.8em;
    font-family: "Ubuntu Mono", monospace;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(243, 192, 0);
      color: $color-text-secondary;
    }
  }
}
</style>
