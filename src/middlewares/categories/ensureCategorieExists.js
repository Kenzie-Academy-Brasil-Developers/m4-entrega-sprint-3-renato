import { database } from "../../database/index.js";
import { Errors } from "../../errors.js";

const ensureCategorieExistsMiddleware = async (req, res, next) => {
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
