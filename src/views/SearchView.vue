<template>
  <div>
    <div class="message">
      <!-- <div v-if="showResults && totalResults > 0">
        Results found for
        <span class="query">{{ query }}</span>
        : {{ totalResults }}
      </div>
      <div v-else><p>There are no matches for you search.</p></div> -->
    </div>

    <ItemList
      :results="shows.filteredGenre"
      :selectedGenre="shows.selectedGenre"
      type="multi"
      @item-clicked="viewDetailInfo"
    />
    <ItemListMore
      :loading="shows.loading"
      :loadMore="loadMore"
      @view-more="shows.searchShows('MORE', query)"
    />
  </div>
</template>

<script lang="ts">
import ItemList from "../components/ItemList.vue";
import ItemListMore from "../components/ItemListMore.vue";
import { useShowsStore } from "../stores/shows";

export default {
  name: "SearchView",
  components: {
    ItemList,
    ItemListMore,
  },
  setup() {
    const shows = useShowsStore();

    return { shows };
  },
  data() {
    return {
      query: this.$route.query.q,
    };
  },
  computed: {
    loadMore() {
      return this.shows.totalPages === this.shows.page ? true : false;
    },
  },
  created() {
    this.shows.searchShows("INIT", this.query);
  },
  methods: {
    // computeLoadMore(total) {
    //   this.totalPages = Math.round(total / 250);
    // },

    viewDetailInfo(item: any) {
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

<style lang="scss" scoped>
.query {
  color: $color-primary;
  font-weight: bold;
  font-style: italic;
  text-transform: lowercase;
}
</style>
