import type { Order } from "@/types/orders";

const ORDERS_KEY = "shopsphere-orders";

export function saveOrder(order: Order) {
  const existingOrders: Order[] = JSON.parse(
    localStorage.getItem(ORDERS_KEY) || "[]"
  );
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existingOrders]));
}
export function getOrder(orderId: string): Order | undefined {
  const orders: Order[] = JSON.parse(
    localStorage.getItem(ORDERS_KEY) || "[]"
  );
  return orders.find((order) => order.id === orderId);
}