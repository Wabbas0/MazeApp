import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ItemCard from "../ItemCard.vue";

describe("it renders tvshow item as expected", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemCard, {
      props: {
        item: {
          name: "test",
          show: {
            name: "Breaking Bad",
            image: {
              medium:
                "https://static.tvmaze.com/uploads/images/medium_portrait/358/895085.jpg",
            },
          },
        },
        type: "tv",
      },
    });
    expect(wrapper.text()).toContain("Breaking Bad");
  });
});
