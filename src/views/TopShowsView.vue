<template>
  <div>
    <h2 class="title">Top Shows</h2>
    <ItemList
      :results="getTopShows()"
      :selectedGenre="shows.selectedGenre"
      type="tv"
      @item-clicked="viewMoreInfo"
    />
    <ItemListMore
      :selectedGenre="shows.selectedGenre"
      :loading="shows.loading"
      :loadMore="loadMore"
      @view-more="fetchShows('MORE')"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, getCurrentInstance } from "vue";
import ItemList from "../components/ItemList.vue";
import ItemListMore from "../components/ItemListMore.vue";
import { useShowsStore, type ShowItem } from "../stores/shows";

const shows = useShowsStore();
const instance = getCurrentInstance();

const fetchShows = (action: string) => shows.fetchShows(action);

onBeforeMount(() => {
  fetchShows("INIT");
});

const viewMoreInfo = (item: ShowItem) => {
  shows.getItem(item);
  if (instance) {
    instance.emit("open-modal");
  }
};

const getTopShows = () => {
  return shows.filteredGenre && shows.sortedShows;
};

const loadMore = computed(() =>
  shows.totalPages === shows.page ? true : false
);
</script>

<style lang="scss" scoped></style>
