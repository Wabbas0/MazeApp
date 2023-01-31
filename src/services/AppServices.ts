import { API } from "@/services/api";
import type { LocationQueryValue } from "vue-router";

const country = "US";
export type Query = LocationQueryValue | Array<LocationQueryValue> | string;

export default {
  search(query: Query, page?: number) {
    const url = `search/shows?q=${query}&page=${page}`;
    return API.get(url);
  },
  getItemInfo(id: string, type: string) {
    const url = `${type}/${id}`;
    return API.get(url);
  },
  getCast(id: string) {
    const url = `shows/${id}/cast`;
    return API.get(url);
  },
  getShowsByCountry() {
    let current_date: Date | string = new Date();
    current_date = formatDate(current_date);
    const url = `schedule?country=${country}&date=${current_date}`;
    return API.get(url);
  },
  getShows(page: number) {
    const url = `shows?page=${page}`;
    return API.get(url);
  },
  getSeasons(id: string) {
    const url = `shows/${id}/seasons`;
    return API.get(url);
  },
  getEpisodes(id: string) {
    const url = `shows/${id}/episodes`;
    return API.get(url);
  },
};

function formatDate(date: Date) {
  // eslint-disable-next-line prefer-const
  let d: Date = new Date(date),
    month: string = "" + (d.getMonth() + 1),
    day = "" + d.getDate();

  const year: number = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
