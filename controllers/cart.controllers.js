import { Cart } from "../entities/cart.entity.js";
import { Crafts } from "../entities/crafts.entity.js";
import {
  getAllCraftsFromCart,
  addingCraftInCart,
  deleteCraftFromCart,
  getCraftByIdFromCart,
  updateCraftByIdInCart,
} from "../services/cart.service.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllCraftsFromCartCtr(request, response) {
  try {
    const cart = await getAllCraftsFromCart();

    if (cart.data) {
      response.send(cart.data);
    } else {
      response.status(404).send({ msg: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Failed to get Cart");
  }
}

export async function addingCraftsInCartCtr(request, response) {
  const data = request.body;
  console.log(data);
  if (
    !data.userId ||
    !data.crafts ||
    !data.crafts.length ||
    !data.crafts[0].craftId ||
    !data.crafts[0].qty ||
    !data.price
  ) {
    return response.status(400).send({ msg: "Missing required fields" });
  }
  const userId = data.userId;
  const totalPrice = data.crafts[0].qty * data.price;
  const addProduct = {
    userId,
    crafts: [
      {
        craftId: data.crafts[0].craftId,
        qty: data.crafts[0].qty,
      },
    ],
    totalPrice,
  };
  try {
    const newCart = await addingCraftInCart(addProduct);
    response.send(newCart.data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Failed to add the product in the cart");
  }
}
export async function deleteCraftFromCartCtr(request, response) {
  const userId = request.params.id;
  try {
    const result = await getCraftByIdFromCart(userId);
    if (result.data) {
      await deleteCraftFromCart(userId);
      response.send("product deleted successfully");
    } else {
      response.status(404).send("Product Not Found");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Failed to delete product");
  }
}
export async function getCraftByIdFromCartCtr(request, response) {
  const { id } = request.params;
  // console.log(id);
  let res;
  try {
    res = await getCraftByIdFromCart(id);
    if (res.data) {
      response.send(res.data);
    } else {
      response.status(404).send("Product Not Found");
    }
  } catch (error) {
    response.status(500).send("Failed to get Products");
  }
}
export async function updateCraftByIdInCartCtr(request, response) {
  // const { id } = request.params;
  const userId = request.params.id;
  const updateData = request.body;
  try {
    const existingData = await getCraftByIdFromCart(userId);
    if (existingData.data) {
      const result = await updateCraftByIdInCart(userId, updateData);
      response.send(result.data);
      console.log(userId, existingData.data);
    } else {
      response.status(404).send("Product Not Found");
    }
  } catch (error) {
    response.status(500).send("Failed to update the product");
  }
}

// export {
//   updateCraftByIdInCartCtr,
//   getCraftByIdFromCartCtr,
//   deleteCraftFromCartCtr,
//   addingCraftsInCartCtr,
//   getAllCraftsFromCartCtr,
// };
