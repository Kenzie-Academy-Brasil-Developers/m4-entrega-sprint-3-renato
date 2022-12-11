import { database } from "../../database/index.js";
import { Errors } from "../../errors.js";

const ensureProductExistsMiddleware = async (req, res, next) => {
  const searchProduct = await database.query(
    `SELECT * FROM products WHERE id::text  = $1`,
    [req.params.uuid]
  );
  if (searchProduct.rowCount === 0) {
    throw new Errors("product not found", 404);
  }

  return next();
};

export { ensureProductExistsMiddleware };
