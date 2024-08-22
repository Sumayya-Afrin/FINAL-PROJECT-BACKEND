import { Cart } from "../entities/cart.entity.js";

async function getAllCartItem() {
  return (await Cart.scan.go()).data;
}

async function createCartProduct(addCraft) {
  await Cart.put(addCraft).go();
}

async function getUserIdById(Id) {
  return await Cart.get({ userId: Id }).go();
}

async function deleteFromCartById(id) {
  await Cart.delete({ userId: id }).go();
}

export { getAllCartItem, createCartProduct, getUserIdById, deleteFromCartById };
