<template>
  <div>
    <h2 class="title">Shows</h2>
    <ItemList
      :loading="shows.loading"
      :results="shows.filteredGenre"
      :selectedGenre="shows.selectedGenre"
      type="tv"
      @item-clicked="viewMoreInfo"
    />
    <ItemListMore
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
import  { useShowsStore, type ShowItem } from "../stores/shows";
import { useRouter } from "vue-router";

const shows = useShowsStore();
const { currentRoute } = useRouter();
const instance = getCurrentInstance();

const fetchShows = (action: string) =>
  currentRoute.value.meta.viewByCountry
    ? shows.fetchCountryShows(action)
    : shows.fetchShows(action);

onBeforeMount(() => {
  fetchShows("INIT");
});

const viewMoreInfo = (item: ShowItem) => {
  shows.getItem(item);
  if (instance) {
    instance.emit("open-modal");
  }
};

const loadMore = computed(() =>
  shows.totalPages === shows.page ? true : false
);
</script>

<style lang="scss" scoped></style>
