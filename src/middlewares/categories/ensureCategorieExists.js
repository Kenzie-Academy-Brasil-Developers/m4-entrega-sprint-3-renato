import { database } from "../../database/index.js";
import { Errors } from "../../errors.js";

const ensureCategorieExistsMiddleware = async (req, res, next) => {
  if (isNaN(req.params.id)) {
    throw new Errors("id must be numbers!", 404);
  }

  const searchCategorie = await database.query(
    `
          SELECT * FROM categories WHERE id = $1  
      `,
    [req.params.id]
  );

  if (searchCategorie.rowCount === 0) {
    throw new Errors("categorie not found", 404);
  }

  return next();
};

export { ensureCategorieExistsMiddleware };
