import { Entity } from "electrodb"; //ORM
import { client } from "../util/dbconnection.js";
const Crafts = new Entity(
  {
    model: {
      entity: "Crafts",
      version: "1",
      service: "CraftsService",
    },
    attributes: {
      craftId: {
        type: "string",
        required: true,
      },
      title: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
      category: {
        type: "string",
        required: true,
      },
      price: {
        type: "number",
        required: true,
      },
      imageUrl: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["craftId"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
    // add your DocumentClient and TableName as a second parameter
  },
  { client, table: "Crafts" }
);

export { Crafts };
