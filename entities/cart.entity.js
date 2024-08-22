import { Entity } from "electrodb"; //ORM
import { client } from "../util/dbconnection.js";

const Cart = new Entity(
  {
    model: {
      entity: "Cart",
      version: "2",
      service: "cartService",
    },
    attributes: {
      userId: {
        type: "string",
      },
      products: {
        type: "list",
        items: {
          type: "map",
          properties: {
            productId: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
            },
            type: {
              type: "string",
            },
            StockQuantity: {
              type: "number",
            },
            image: {
              type: "string",
            },
            quantity: {
              type: "number",
            },
          },
        },
      },
      totalPrice: {
        type: "number",
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["userId"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "cartTable" }
);

export { Cart };
