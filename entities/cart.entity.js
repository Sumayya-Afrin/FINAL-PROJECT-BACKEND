import { Entity } from "electrodb"; //ORM
import { client } from "../util/dbconnection.js";

const cart = new Entity(
  {
    model: {
      entity: "cart",
      version: "1",
      service: "craftService",
    },
    attributes: {
      userId: {
        type: "string",
      },
      price: {
        type: "number",
      },
      crafts: {
        type: "list",
        items: {
          type: "map",
          properties: {
            craftId: {
              type: "string",
            },
            qty: {
              type: "number",
            },
          },
        },
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
  { client, table: "cart" }
);

export { cart };
