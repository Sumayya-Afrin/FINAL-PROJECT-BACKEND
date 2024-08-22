import { getAllOrder, createOrders } from "../services/orders.service.js";
import { getUserIdById } from "../services/cart.service.js";
import { v4 as uuidv4 } from "uuid";
import { deleteFromCartById } from "../services/cart.service.js";
import { usernameToken } from "../services/users.service.js";

async function getAllOrderCtrl(request, response) {
  const token = request.headers["x-auth-token"];
  const userfromtoken = await usernameToken(token);
  try {
    response.send((await getAllOrder(userfromtoken.data.username)).data);
  } catch (error) {
    response.status(404).send({ msg: "Products not found" });
  }
}

async function AddToOrderCtrl(request, response) {
  const token = request.headers["x-auth-token"];
  const userfromtoken = await usernameToken(token);

  try {
    // Fetch cart data by UserId
    const cartData = await getUserIdById(userfromtoken.data.username);
    console.log("Cart Data:", cartData);

    if (!cartData.data || cartData.data.products.length === 0) {
      return response.status(404).send({ msg: "Cart is empty or not found" });
    }

    const Orders = {
      ...cartData.data,
      orderId: uuidv4(),
      orderDate: new Date().toString(),
      status: "pending",
    };
    console.log(Orders);
    // Create the order
    await createOrders(Orders);

    await deleteFromCartById(userfromtoken.data.username);

    response.status(201).send({ msg: "Order Placed Successfully", Orders });
  } catch (error) {
    console.error("Order Placement Failed:", error);
    response.status(500).send("Failed to place order");
  }
}

export { getAllOrderCtrl, AddToOrderCtrl };
