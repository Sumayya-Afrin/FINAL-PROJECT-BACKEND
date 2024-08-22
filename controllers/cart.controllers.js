import { Cart } from "../entities/cart.entity.js";
import { Crafts } from "../entities/crafts.entity.js";
import {
  getAllCartItem,
  createCartProduct,
  getUserIdById,
  deleteFromCartById,
} from "../services/cart.service.js";
import { v4 as uuidv4 } from "uuid";

async function getAllCartItemCtrl(request, response) {
  try {
    response.send(await getAllCartItem());
  } catch (error) {
    response.send("Crafts not found ");
  }
}

async function AddToCartCtrl(request, response) {
  const products = request.body;
  const token = request.headers["x-auth-token"];
  const userfromtoken = await usernameToken(token);

  let realProductsInDB = [];

  for (const data of products) {
    const id = data.productId;
    const existingData = await getProductById(id);
    console.log(existingData);
    if (existingData.data.productId) {
      realProductsInDB.push({ ...data, ...existingData.data });
    }
  }

  const totalPrice = calculateTotalPriceQty(realProductsInDB);
  const addCraft = {
    products: realProductsInDB,
    totalPrice: totalPrice,
    userId: userfromtoken.data.username,
  };

  console.log(addCraft);
  await createCartProduct(addCraft);

  response.status(201).send(addCraft);
}

async function tocheckuserid(request, response) {
  const { userId } = request.params;
  console.log(userId);
  const existingUser = await getCartByUserId(userId);
  response.send(existingUser);
}
async function deleteFromCartByIdCtrl(request, response) {
  const token = request.headers["x-auth-token"];
  const userfromtoken = await usernameToken(token);
  try {
    const res = await getCartByUserId(userfromtoken.data.username);
    if (res.data) {
      await deleteFromCartById(userfromtoken.data.username);
      response.send({ msg: "deleted successfully", data: res.data });
    } else {
      response.status(404).send({ msg: "craft not found" });
    }
  } catch (error) {
    response.status(500).send("deleted failed");
  }
}
export {
  getAllCartItemCtrl,
  AddToCartCtrl,
  deleteFromCartByIdCtrl,
  tocheckuserid,
};

function calculateTotalPriceQty(products) {
  let totalPrice = 0;

  for (const product of products) {
    totalPrice += product.price * product.quantity;
  }

  return totalPrice;
}
