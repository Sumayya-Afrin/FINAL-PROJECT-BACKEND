import { cart } from "../entities/cart.entity.js";
async function getAllCraftsFromCart() {
  return await cart.scan.go();
}

async function addingCraftInCart(addProduct) {
  return await cart.create(addProduct).go();
}

async function deleteCraftFromCart(userId) {
  await cart.delete({ userId }).go();
}

async function getCraftByIdFromCart(userId) {
  return await cart.get({ userId }).go();
}
async function updateCraftByIdInCart(userId, updateData) {
  return await cart
    .put({
      userId,
      ...updateData,
    })
    .go();
}

export {
  getAllCraftsFromCart,
  addingCraftInCart,
  deleteCraftFromCart,
  getCraftByIdFromCart,
  updateCraftByIdInCart,
};
