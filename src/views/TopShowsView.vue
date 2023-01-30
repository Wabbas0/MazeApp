<template>
  <div>
    <h2 class="title">Top Shows</h2>
    <ItemList
      :results="getTopShows()"
      :selectedGenre="shows.selectedGenre"
      type="tv"
      @item-clicked="viewDetailInfo"
    />
    <ItemListMore
      :selectedGenre="shows.selectedGenre"
      :loading="shows.loading"
      :loadMore="loadMore"
      @view-more="shows.getShows('MORE')"
    />
  </div>
</template>

<script lang="ts">
import ItemList from "../components/ItemList.vue";
import ItemListMore from "../components/ItemListMore.vue";
import { useShowsStore } from "../stores/shows";

export default {
  name: "TopShowsView",
  components: {
    ItemList,
    ItemListMore,
  },
  setup() {
    const shows = useShowsStore();

    return { shows };
  },
  computed: {
    loadMore() {
      return this.shows.totalPages > this.shows.page ? true : false;
    },
  },
  created() {
    this.shows.fetchShows("INIT");
  },
  methods: {
    viewDetailInfo(item) {
      try {
        this.shows.getItem(item);
        this.$emit("open-modal");
      } catch (e) {
        console.log(e);
      }
    },

    getTopShows() {
      return this.shows.filteredGenre && this.shows.sortedShows;
    },
  },
};
</script>

<style lang="scss" scoped></style>
