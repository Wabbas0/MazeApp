<template>
  <div>
    <h2 class="title">
      <!-- <font-awesome-icon icon="tv" transform="shrink-3" size="1x" />&nbsp; -->
      {{ viewTitle }}
    </h2>
    <ItemList
      :loading="loading"
      :results="shows.filteredGenre"
      :selectedGenre="shows.selectedGenre"
      type="tv"
      @item-clicked="viewDetailInfo"
      @totalResults="computeLoadMore"
    />
    <ItemListMore
      :loading="loading"
      :loadMore="loadMore"
      @view-more="fetchData('MORE')"
    />
  </div>
</template>

<script lang="ts">
import ItemList from "../components/ItemList.vue";
import ItemListMore from "../components/ItemListMore.vue";
import AppServices from "../services/AppServices";
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
  data() {
    return {
      page: 1,
      loading: false,
      error: "",
      results: [],
      totalPages: 1,
    };
  },
  computed: {
    loadMore() {
      return this.totalPages === this.page ? true : false;
    },
    showMessage() {
      return this.searching || this.error != "" ? true : false;
    },
    viewTitle() {
      return "Shows";
    },
  },
  created() {
    this.shows.getShows("INIT");
  },
  methods: {
    async fetchData(action) {
      if (action == "INIT") {
        this.page = 1;
      } else {
        this.page++;
        this.loading = true;
      }
      try {
        let response = null;
        if (true) {
          response = await AppServices.getTvShowsOnAir();
        } else {
          response = await AppServices.getShows(this.page);
        }
        this.results = this.results.concat(response.data);
      } catch (e) {
        if (action == "MORE") this.page--;
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    computeLoadMore(total) {
      this.totalPages = Math.round(total / 250);
    },
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
