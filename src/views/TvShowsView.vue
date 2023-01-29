<template>
  <div>
    <h2 class="title">
      {{ viewTitle }}
    </h2>
    <ItemList
      :loading="shows.loading"
      :results="shows.filteredGenre"
      :selectedGenre="shows.selectedGenre"
      type="tv"
      @item-clicked="viewDetailInfo"
    />
    <ItemListMore
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
  name: "TvShowsView",
  setup() {
    const shows = useShowsStore();

    return { shows };
  },
  components: {
    ItemList,
    ItemListMore,
  },
  computed: {
    loadMore() {
      return this.shows.totalPages === this.shows.page ? true : false;
    },
    viewTitle() {
      return "Shows";
    },
  },
  created() {
    this.shows.getShows("INIT");
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
  },
};
</script>

<style lang="scss" scoped></style>
