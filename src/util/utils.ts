import type { Order, Restaurant } from "StateType";

export const getRestaurant = (id: string, restaurants: Restaurant[]): Restaurant => {
  const found = restaurants.filter(r => r.id === id);
  if (found.length === 0) {
    throw new Error("Restaurant with id " + id + " not found.");
  }
  return found[0];
}

export const getActiveOrder = (id: string, orders: Order[]): Order | null => {
  const found = orders.filter(o => o.id === id);
  if (found.length === 0) {
    return null;
  }
  return found[0];
}
