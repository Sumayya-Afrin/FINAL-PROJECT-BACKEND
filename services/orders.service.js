import { Order } from "../entities/order.entity.js";

async function getAllOrder(username) {
  return (
    await Order.scan.where(({ userId }, { eq }) => eq(userId, username))
  ).go();
}
async function createOrders(Orders) {
  await Order.create(Orders).go();
}

export { getAllOrder, createOrders };
