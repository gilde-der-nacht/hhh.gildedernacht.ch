import type { Restaurant } from "StateType";

const resourceUID = "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

type OlympEntry = {
  identification: string;
  public_body: string;
  private_body: string;
}

export const saveNewRestaurant = async (restaurant: { label: string, menu: string }) => {
  const id = crypto.randomUUID();
  const entry: OlympEntry = { identification: id, public_body: JSON.stringify({ restaurant, id }), private_body: "" };
  await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`, { method: "POST", mode: "cors", body: JSON.stringify(entry) });
}

export const loadServerData = async () => {
  const data = await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`);
  console.log(data);
}
