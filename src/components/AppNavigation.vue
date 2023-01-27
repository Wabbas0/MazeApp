<template>
  <header>
    <Vue3Lottie :animationData="logo" :height="70" :width="70" />

    <div class="logo">
      <h1>AbnMaze</h1>
    </div>

    <div class="genre-container">
      <AppSearch />
      <select @change="genreSelected">
        <option :value="selectedGenre" selected>Select genre</option>
        <option value="all">All</option>
        <option v-for="(genre, index) in generes" :key="index" v-bind="$attrs">
          {{ genre }}
        </option>
      </select>
    </div>

    <nav class="navigation">
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.url">
            <br />
            <br />
            <span>{{ link.text }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import AppSearch from "./AppSearch.vue";
import { useShowsStore } from "../stores/shows";
import { generes } from "../utils/constants";
import logo from "../assets/lo.json";

export default {
  name: "AppNavigation",
  components: { AppSearch },
  setup() {
    const shows = useShowsStore();
    return { shows };
  },
  data() {
    return {
      logo,
      generes,
      links: [
        {
          url: "/tv-shows",
          text: "Country",
          icon: "tv",
        },
        {
          url: "/top-shows",
          text: "Top",
        },
        {
          url: "/shows",
          text: "Shows",
        },
      ],
    };
  },
  methods: {
    genreSelected(e) {
      this.shows.changeGenre(e.currentTarget.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
header {
  display: flex;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
}
li {
  height: 75px;
  width: 50px;
  list-style: none;
  display: inline-block;
  box-sizing: border-box;
  &:last-child {
    flex-grow: 1;
  }
  &:nth-last-child(2) {
    flex-grow: 0.5;
  }
}
a {
  display: block;
  height: 100%;
  text-align: center;
  color: $color-text-primary;
  text-decoration: none;
  &:hover {
    color: $color-text-secondary;
  }
  &.router-link-active {
    background: $background-active;
    background: radial-gradient(
      circle,
      $background-active-gradient1,
      $background-active-gradient2
    );
    color: $color-text-secondary;
  }
}
span {
  display: none;
}
.navigation {
  margin: 0 auto;
  max-width: 1000px;
}
.icon {
  margin-top: 15px;
}
.genre-container {
  display: flex;
  align-items: center;
  height: 60px;
  margin: auto;
  flex-grow: 1;
  max-width: 600px;
}

.logo {
  height: 100%;
  display: flex;
  align-items: center;
}
select {
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 2px 10px;
  width: 150px;
  font-size: 1em;
  outline: 0;
  opacity: 0.5;
  color: #fff;
  background-color: $background-input;
  margin-left: 2px;
}

select:focus {
  border-color: rgb(243, 192, 0);
}

@include sm {
  li {
    width: 85px;
  }
  span {
    display: inline;
    padding: 0 10px;
  }
  .icon {
    margin-top: 3px;
  }
  select {
    padding: 8px 8px;
    font-size: 1em;
  }
}
</style>
