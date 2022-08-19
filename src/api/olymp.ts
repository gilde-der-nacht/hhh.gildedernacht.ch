import { Refetcher } from "@api/api";
import {
  EntryPost,
  OlympResponse,
  OrderPost,
  RawServerData,
  RestaurantPost,
} from "@api/ApiTypes";
import { safeParse } from "@api/parsing";

const RESOURCE_UID =
  "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

const ENDPOINT = `https://api.gildedernacht.ch/resources/${RESOURCE_UID}/entries`;

export const HHH_VERSION = 4;

type OlympPayload = RestaurantPost | OrderPost | EntryPost;

type OlympPostPayload = {
  identification: string;
  publicBody: string;
  privateBody: string;
};

const POST =
  (refetcher: Refetcher) =>
  async (payload: OlympPayload): Promise<Response> => {
    const body: OlympPostPayload = {
      identification: payload.id,
      publicBody: JSON.stringify({ ...payload, version: HHH_VERSION }),
      privateBody: JSON.stringify({}),
    };

    const response = await fetch(ENDPOINT, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      refetcher();
      return response;
    }
    throw new Error(response.statusText);
  };

const filterNewest = (data: OlympResponse[]): OlympResponse[] => {
  const map: { [_: string]: OlympResponse } = {};
  data.forEach((d) => {
    map[d.id] = d;
  });
  return Object.values(map);
};

const GET = async (): Promise<OlympResponse[]> => {
  const response = await fetch(ENDPOINT, { method: "GET", mode: "cors" });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: RawServerData[] = await response.json();
  const parsed = data
    .map(safeParse)
    .filter((d): d is OlympResponse => d !== null);
  return filterNewest(parsed);
};

export default { POST, GET };
