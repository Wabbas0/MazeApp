<template>
  <li class="card">
    <div>
      <a href="#" @click.prevent="viewDetail">
        <figure>
          <img :src="urlImg" />
          <span class="card-title">{{ title }}</span>
        </figure>
      </a>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ItemCard",
  props: {
    item: Object,
    type: String,
  },
  computed: {
    urlImg() {
      if (this.item && this.item.show) {
        return this.item.show && this.item.show.image != null
          ? this.item.show.image.medium || this.item.show.image.original
          : import("../assets/images/poster-not-available.png");
      }
      return this.item && this.item.image != null
        ? this.item.image.medium || this.item.image.original
        : import("../assets/images/poster-not-available.png");
    },
    title() {
      return this.item && this.item.show
        ? this.item.show.name
        : this.item?.name;
    },
  },
  methods: {
    viewDetail() {
      this.$emit("item-clicked", this.item);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
figure {
  margin: 0 0 10px;
  padding: 0;
  position: relative;
  overflow-y: hidden;
}
img {
  width: 100%;
  height: auto;
  box-shadow: 0px 1px 5px 0px $poster-shadow;
  box-sizing: border-box;
  border-radius: 3px;
}
span {
  position: absolute;
  left: 0;
  bottom: -100px;
  transition: bottom 0.5s ease 0s; /* only transition top property */
  width: calc(100% - 40px);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  color: $color-text-primary;
  font-size: 0.9em;
  &.icon-container {
    float: left;
    margin-right: 5px;
    padding-bottom: 5px;
  }
}
i {
  display: inline-block;
  padding-top: 4px;
}
a {
  color: #333;
  text-decoration: none;
  &:hover {
    img {
      box-shadow: 0px 1px 5px 0px $poster-shadow-active;
    }

    span {
      bottom: 0px;
    }

    span.card-title {
      color: $color-text-secondary;
      background-color: $background-active-gradient1;
    }
  }
}
.card {
  list-style: none;
  margin-bottom: 10px;
  padding: 0;
  width: 50%;
  div {
    padding: 10px 20px;
  }
}
.icon {
  display: inline;
  color: #fff;
}
@include sm {
  .card {
    width: 33%;
  }
}
@include md {
  .card {
    width: 25%;
  }
}
@include lg {
  .card {
    width: 20%;
  }
}
</style>
