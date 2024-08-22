import { Entity } from "electrodb";
import { client } from "../util/dbconnection.js";

const Order = new Entity(
  {
    model: {
      entity: "Order",
      version: "1",
      service: "OrdersService",
    },
    attributes: {
      orderId: {
        type: "string",
        required: true,
      },
      userId: {
        type: "string",
        required: true,
      },
      products: {
        type: "list",
        items: {
          type: "map",
          properties: {
            craftId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
            },
            category: {
              type: "string",
            },
            StockQuantity: {
              type: "number",
            },
            imageUrl: {
              type: "string",
            },
            quantity: {
              type: "number",
              required: true,
            },
          },
        },
        required: true,
      },
      totalPrice: {
        type: "number",
        required: true,
      },
      orderDate: {
        type: "string",
        required: true,
      },
      status: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["orderId"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "ordersTable" }
);

export { Order };
