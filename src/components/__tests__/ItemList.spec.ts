import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ItemList from "../ItemList.vue";

describe("it renders tvshow item as expected", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemList, {
      props: {
        results: [
          {
            id: 288,
            url: "https://www.tvmaze.com/shows/288/american-idol",
            name: "American Idol",
            type: "Reality",
            language: "English",
            genres: ["Music"],
            status: "Running",
            runtime: 120,
            averageRuntime: 118,
            premiered: "2002-06-11",
            ended: null,
            officialSite: "http://www.americanidol.com",
            schedule: { time: "20:00", days: ["Monday", "Sunday"] },
            rating: { average: 5.2 },
            weight: 97,
            network: {
              id: 3,
              name: "ABC",
              country: {
                name: "United States",
                code: "US",
                timezone: "America/New_York",
              },
              officialSite: "https://abc.com/",
            },
            webChannel: null,
            dvdCountry: null,
            externals: { tvrage: 2601, thetvdb: 70814, imdb: "tt0319931" },
            image: {
              medium:
                "https://static.tvmaze.com/uploads/images/medium_portrait/402/1006337.jpg",
              original:
                "https://static.tvmaze.com/uploads/images/original_untouched/402/1006337.jpg",
            },
            summary:
              "<p><b>American Idol </b>is an American singing competition show, where contestants perform in front of a panel of star judges, representing the music industry. The winner is determined by viewers' vote.</p>",
            updated: 1672177962,
            _links: {
              self: { href: "https://api.tvmaze.com/shows/288" },
              previousepisode: {
                href: "https://api.tvmaze.com/episodes/2319192",
              },
              nextepisode: { href: "https://api.tvmaze.com/episodes/2456431" },
            },
          },
          {
            id: 289,
            url: "https://www.tvmaze.com/shows/289/americas-got-talent",
            name: "America's Got Talent",
            type: "Variety",
            language: "English",
            genres: ["Music"],
            status: "Running",
            runtime: 120,
            averageRuntime: 113,
            premiered: "2006-06-21",
            ended: null,
            officialSite: "http://www.nbc.com/americas-got-talent",
            schedule: { time: "20:00", days: ["Tuesday", "Wednesday"] },
            rating: { average: 5.9 },
            weight: 97,
            network: {
              id: 1,
              name: "NBC",
              country: {
                name: "United States",
                code: "US",
                timezone: "America/New_York",
              },
              officialSite: "https://www.nbc.com/",
            },
            webChannel: null,
            dvdCountry: null,
            externals: { tvrage: 10408, thetvdb: 79490, imdb: "tt0759364" },
            image: {
              medium:
                "https://static.tvmaze.com/uploads/images/medium_portrait/408/1021782.jpg",
              original:
                "https://static.tvmaze.com/uploads/images/original_untouched/408/1021782.jpg",
            },
            summary:
              "<p>With the talent search open to acts of all ages, <b>America's Got Talent</b> has brought the variety format back to the forefront of American culture by showcasing performers from across the country. The series is a true celebration of the American spirit, featuring a colorful array of singers, dancers, comedians, contortionists, impressionists, jugglers, magicians, ventriloquists and hopeful stars, all vying for their chance to win America's hearts and the $1 million prize.</p>",
            updated: 1666445845,
            _links: {
              self: { href: "https://api.tvmaze.com/shows/289" },
              previousepisode: {
                href: "https://api.tvmaze.com/episodes/2382128",
              },
            },
          },
          {
            id: 361,
            url: "https://www.tvmaze.com/shows/361/saturday-night-live",
            name: "Saturday Night Live",
            type: "Variety",
            language: "English",
            genres: ["Comedy", "Music"],
            status: "Running",
            runtime: 90,
            averageRuntime: 90,
            premiered: "1975-10-11",
            ended: null,
            officialSite: "http://www.nbc.com/saturday-night-live",
            schedule: { time: "23:30", days: ["Saturday"] },
            rating: { average: 5.9 },
            weight: 99,
            network: {
              id: 1,
              name: "NBC",
              country: {
                name: "United States",
                code: "US",
                timezone: "America/New_York",
              },
              officialSite: "https://www.nbc.com/",
            },
            webChannel: null,
            dvdCountry: null,
            externals: { tvrage: 5098, thetvdb: 76177, imdb: "tt0072562" },
            image: {
              medium:
                "https://static.tvmaze.com/uploads/images/medium_portrait/430/1076736.jpg",
              original:
                "https://static.tvmaze.com/uploads/images/original_untouched/430/1076736.jpg",
            },
            summary:
              '<p><b>Saturday Night Live</b> is an Emmy Award-winning late-night comedy showcase.</p><p>Since its inception in 1975, "SNL" has launched the careers of many of the brightest comedy performers of their generation. As The New York Times noted on the occasion of the show\'s Emmy-winning 25th Anniversary special in 1999, "in defiance of both time and show business convention, \'SNL\' is still the most pervasive influence on the art of comedy in contemporary culture." At the close of the century, "Saturday Night Live" placed seventh on Entertainment Weekly\'s list of the Top 100 Entertainers of the past fifty years.</p>',
            updated: 1674838595,
            _links: {
              self: { href: "https://api.tvmaze.com/shows/361" },
              previousepisode: {
                href: "https://api.tvmaze.com/episodes/2443364",
              },
              nextepisode: { href: "https://api.tvmaze.com/episodes/2463394" },
            },
          },
        ],
        selectedGenre: "Music",
        type: "tv",
      },
    });

    expect(wrapper.text()).toContain("American Idol");
    expect(wrapper.text()).toContain("America's Got Talent");
    expect(wrapper.text()).toContain("Saturday Night Live");
  });
});
