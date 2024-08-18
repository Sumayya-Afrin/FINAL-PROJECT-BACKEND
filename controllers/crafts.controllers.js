import { Crafts } from "../entities/crafts.entity.js";

import { v4 as uuidv4 } from "uuid";
import {
  editCraftsById,
  createcraft,
  deleteCraftById,
  getCraftsById,
  getCrafts,
} from "../services/crafts.service.js";
async function editCraftsByIdCtr(request, response) {
  const { id } = request.params;
  const UpdatedData = request.body;
  const ExistingData = await Crafts.get({ craftId: id }).go();
  if (ExistingData.data) {
    await editCraftsById(ExistingData, UpdatedData);
    response.send({
      msg: "Craft edited successfully",
      data: UpdatedData,
    });
  } else {
    response.status(404).send({ msg: "Craft not found" });
  }
}

async function createCraftByIdCtr(request, response) {
  const data = request.body;
  data.craftId = uuidv4();
  const addcraft = await createcraft(data);

  response.send(addcraft.data);
}

async function deleteCraftByIdCtr(request, response) {
  const { id } = request.params;
  const craft_to_delete = await Crafts.get({ craftId: id }).go();

  if (craft_to_delete.data) {
    await deleteCraftById(id);
    response.send({
      msg: "Craft deleted successfully",
      data: craft_to_delete.data,
    });
  } else {
    response.status(404).send({ msg: "Craft not found" });
  }
}

async function getCraftsByIdCtr(request, response) {
  const { id } = request.params;
  const result = await getCraftsById(id);
  result
    ? response.send(result.data)
    : response.status(404).send({ msg: "Craft not found" });
}

async function getCraftsCtr(request, response) {
  const allcrafts = await getCrafts();
  response.send(allcrafts.data);
}

export {
  editCraftsByIdCtr,
  createCraftByIdCtr,
  deleteCraftByIdCtr,
  getCraftsByIdCtr,
  getCraftsCtr,
};
