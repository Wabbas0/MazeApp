<template>
  <div class="search-wrapper">
    <button>
      <font-awesome-icon
        icon="search"
        transform="shrink-6"
        size="2x"
        class="icon-search"
      />
    </button>
    <input
      type="text"
      maxlength="50"
      v-model="query"
      @keypress.enter="search"
      @blur="resetSearch"
      placeholder="Search series and movies..."
    />
  </div>
</template>

<script lang="ts">
import { useShowsStore } from "../stores/shows";

export default {
  name: "AppSearch",
  data() {
    return {
      query: "",
      lastQuery: "",
    };
  },
  setup() {
    const shows = useShowsStore();

    return { shows };
  },
  methods: {
    search() {
      if (this.query.length >= 2 && this.query != this.lastQuery) {
        this.lastQuery = this.query;
        this.$router.push("/search?q=" + this.query);
        this.resetSearch();
      }
    },
    resetSearch() {
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  align-items: center;
  height: 70px;
  flex-grow: 1;
}
input {
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 2px 10px;
  width: calc(100%);
  font-size: 1.1em;
  outline: 0;
  color: rgb(243, 192, 0);
  background-color: $background-input;
}

input::placeholder {
  font-size: 1rem;
  opacity: 0.5;
  color: #fff;
}

input:focus {
  color: rgb(243, 192, 0);
  border-color: rgb(243, 192, 0);
}

button {
  padding: 0 10px 0 20px;
  border: 0;
  outline: 0;
  background-color: transparent;
  .icon-search {
    color: $color-primary;
  }
}
@include sm {
  input {
    padding: 5px 10px;
    font-size: 1.3em;
  }
}
</style>
