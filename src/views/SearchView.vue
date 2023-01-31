<template>
  <div>
    <div class="message">
      <!-- <div v-if="!showResults && totalResults.length == 0">
        <p>There are no matches for you search.</p>
      </div> -->
      -->
    </div>

    <ItemList
      :results="shows.filteredGenre"
      :selectedGenre="shows.selectedGenre"
      type="multi"
      @item-clicked="viewMoreInfo"
    />
    <ItemListMore
      :loading="shows.loading"
      :loadMore="loadMore"
      @view-more="shows.searchShows('MORE', query)"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, getCurrentInstance, ref } from "vue";
import ItemList from "../components/ItemList.vue";
import ItemListMore from "../components/ItemListMore.vue";
import { useShowsStore, type ShowItem } from "../stores/shows";
import { useRoute } from "vue-router";

const shows = useShowsStore();
const instance = getCurrentInstance();
const query = ref(useRoute().query.q);

onBeforeMount(() => {
  shows.searchShows("INIT", query.value);
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

<style lang="scss" scoped>
.query {
  color: $color-primary;
  font-weight: bold;
  font-style: italic;
  text-transform: lowercase;
}
</style>
