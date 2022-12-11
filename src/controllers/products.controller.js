import {
  deleteProductService,
  editProductService,
  getAllProductsService,
  postProductService,
  retrieveProductService,
} from "../services/products.services.js";

const postProductController = async (req, res) => {
  const data = await postProductService(req.body);

  return res.status(200).json(data);
};

const getAllProductsController = async (req, res) => {
  const data = await getAllProductsService();

  return res.status(200).json(data);
};

const retrieveProductController = async (req, res) => {
  const data = await retrieveProductService(req.params.uuid);

  return res.status(200).json(data);
};

const editProductController = async (req, res) => {
  const data = await editProductService(req.body, req.params.uuid);

  return res.status(200).json(data);
};

const deleteProductController = async (req, res) => {
  const data = await deleteProductService(req.params.uuid);

  return res.status(200).json(data);
};

export {
  postProductController,
  getAllProductsController,
  retrieveProductController,
  deleteProductController,
  editProductController,
};
