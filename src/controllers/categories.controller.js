import {
  deleteCategorieService,
  editCategorieService,
  getCategoriesService,
  postCategorieService,
  retrieveCatgorieService,
} from "../services/categories.services.js";

const postCategoriesController = async (req, res) => {
  const data = await postCategorieService(req.body);

  return res.status(201).json(data);
};

const getCategoriesController = async (req, res) => {
  const data = await getCategoriesService();

  return res.status(200).json(data);
};

const retrieveCategorieController = async (req, res) => {
  const data = await retrieveCatgorieService(req.params.id);

  return res.status(200).json(data);
};

const editCategorieController = async (req, res) => {
  const data = await editCategorieService(req.body, req.params.id);

  return res.status(200).json(data);
};

const deleteCategorieController = async (req, res) => {
  const data = await deleteCategorieService(req.params.id);

  return res.status(204).json(data);
};

export {
  getCategoriesController,
  postCategoriesController,
  retrieveCategorieController,
  editCategorieController,
  deleteCategorieController,
};
