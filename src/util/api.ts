const resourceUID = "ed28796bac34122c0d508c578915f9fc1ce53ef46789cdcf41a3dc8da76730f3";

type OlympEntry = {
  identification: string;
  publicBody: string;
  privateBody: string;
}

export const saveNewRestaurant = async (restaurant: { label: string, menu: string, active: boolean, }) => {
  const id = crypto.randomUUID();
  const entry: OlympEntry = { identification: id, publicBody: JSON.stringify({ restaurant, id }), privateBody: JSON.stringify({}) };
  const response = await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`, { method: "POST", mode: "cors", body: JSON.stringify(entry) });
  console.log(await response);

}

export const loadServerData = async () => {
  const data = await fetch(`https://api.gildedernacht.ch/resources/${resourceUID}/entries`);
  console.log(await data.json());
}
