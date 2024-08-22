import { Entity } from "electrodb";
import { client } from "../util/dbconnection.js";

const Cart = new Entity(
  {
    model: {
      entity: "CartTable",
      version: "1",
      service: "CartsService",
    },
    attributes: {
      userId: {
        type: "string",
      },
      crafts: {
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
