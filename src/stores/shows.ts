import AppServices from "../services/appServices";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    /** @type {string} */
    baseUrl: "",
    /** @type {object} */
    itemInfo: {},
    /** @type {string} */
    selectedGenre: "",
    /** @type {[object]} */
    results: [],
    /** @type {boolean} */
    loading: false,
    /** @type {number} */
    page: 1,
    /** @type {number} */
    totalPages: 1,
    /** @type {null | object} */
    error: null,
  }),
  getters: {
    getSelectedGenre: (state) => {
      return state.selectedGenre;
    },
    sortedShows: (state) => {
      const results = state.results.filter(function (item) {
        return item.rating.average !== null && item.rating.average !== "null";
      });

      return results.sort(function (a, b) {
        if (a.rating.average !== null) {
          if (a.rating.average < b.rating.average) {
            return 1;
          }
          if (a.rating.average > b.rating.average) {
            return -1;
          }
        }
      });
    },
    filteredGenre: (state) => {
      let results = state.results;

      if (
        state.selectedGenre != "" &&
        state.selectedGenre != null &&
        state.selectedGenre != "all"
      ) {
        if (state.results) {
          results = state.results.filter((item) => {
            return item && item.show
              ? item.show.genres.includes(state.selectedGenre)
              : item.genres.includes(state.selectedGenre);
          });
        }
      }

      return results;
    },

    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
  },
  actions: {
    async getShows(action: string) {
      const router = useRouter();
      if (action == "INIT") {
        this.results = [];
        this.page = 1;
        this.loading = true;
      } else {
        this.page++;
        this.loading = true;
      }
      try {
        if (router.currentRoute.value.meta.viewByCountry) {
          const response = await AppServices.getShowsByCountry();
          this.results =
            action == "INIT"
              ? response.data
              : this.results.concat(response.data);
          this.setTotalPages(Math.round(this.results.length / 250));
        } else {
          const response = await AppServices.getShows(this.page);
          this.results =
            action == "INIT"
              ? response.data
              : this.results.concat(response.data);
          this.setTotalPages(Math.round(this.results.length / 250));
        }
      } catch (e: any) {
        if (action == "MORE") this.page--;
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    async searchShows(action: string, query: string) {
      if (action == "INIT") {
        this.page = 1;
        this.loading = true;
        this.results = [];
      } else {
        this.page++;
        this.loading = true;
      }
      try {
        const response = await AppServices.search(query, this.page);
        this.results = response.data;
        this.setTotalPages(Math.round(this.results.length / 250));
      } catch (e: any) {
        if (action == "MORE") this.page--;
        this.error = e;
      } finally {
        this.loading = false;
        this.loading = false;
      }
    },
    // any amount of arguments, return a promise or not
    getInitialData: async function () {
      // move this to store??
      await AppServices.getTvShowsOnAir();
    },
    getItem: async function (item) {
      this.RESET_ITEM();
      const itemId = item && item.show ? item.show.id : item.id;
      const [responseCast, responseSeasons, responseEpisodes] =
        await Promise.all([
          AppServices.getCast(itemId),
          AppServices.getSeasons(itemId),
          AppServices.getEpisodes(itemId),
        ]);

      this.LOAD_ITEM({
        info: item,
        cast: responseCast.data,
        seasons: responseSeasons.data.length,
        episodes: responseEpisodes.data.length,
      });
    },

    LOAD_CONF(baseUrl: string) {
      this.baseUrl = baseUrl;
    },
    RESET_ITEM() {
      this.itemInfo = {};
    },
    LOAD_ITEM({ info, cast, seasons, episodes }) {
      const itemInfo = info;
      let castDetails = "";
      cast.forEach((element) => {
        if (castDetails !== "") {
          castDetails = castDetails + ", " + element.person.name;
        } else {
          castDetails = element.person.name;
        }
      });
      itemInfo.cast = castDetails;
      itemInfo.seasons = seasons;
      itemInfo.episodes = episodes;
      this.itemInfo = itemInfo;
    },
    changeGenre(value: string) {
      this.selectedGenre = value;
    },
    setTotalPages(total: number) {
      this.totalPages = total;
    },
  },
});
