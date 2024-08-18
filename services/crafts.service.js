import { Crafts } from "../entities/crafts.entity.js";

async function editCraftsById(ExistingData, UpdatedData) {
  return await Crafts.put({ ...ExistingData.data, ...UpdatedData }).go();
}

async function createcraft(data) {
  return await Crafts.create(data).go();
}

async function deleteCraftById(id) {
  await Crafts.delete({ craftId: id }).go();
}

async function getCraftsById(id) {
  return await Crafts.get({ craftsId: id }).go();
}

async function getCrafts() {
  return await Crafts.scan.go();
}
export {
  editCraftsById,
  createcraft,
  deleteCraftById,
  getCraftsById,
  getCrafts,
};
