import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Footer from "../AppFooter.vue";

describe("it render the application footer", () => {
  it("renders properly", () => {
    const wrapper = mount(Footer, {
      props: { msg: "Copyright 2020 ABN amro" },
    });
    expect(wrapper.text()).toContain("Check for API documentation");
    expect(wrapper.text()).toContain("TVmaze.com");
  });
});
