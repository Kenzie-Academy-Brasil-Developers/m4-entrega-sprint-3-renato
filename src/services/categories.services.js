import { database } from "../database/index.js";
import { Errors } from "../errors.js";

const postCategorieService = async (payload) => {
  const searchCategorie = await database.query(
    `
      SELECT * FROM categories WHERE name = $1  
  `,
    [payload.name]
  );

  if (searchCategorie.rowCount > 0) {
    throw new Errors("categorie already exists", 409);
  }

  const queryResponse = await database
    .query(
      `INSERT INTO categories(name)
           VALUES($1)
           RETURNING *;
        `,
      [payload.name]
    )
    .then((res) => res.rows);

  return queryResponse;
};

const getCategoriesService = async () => {
  const queryResponse = await database
    .query("SELECT * FROM categories ;")

    .then((res) => res.rows);

  return queryResponse;
};

const retrieveCatgorieService = async (id) => {
  const queryResponse = await database
    .query(
      `
      SELECT * FROM categories WHERE id = $1;
  `,
      [id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

const editCategorieService = async (payload, id) => {
  const queryResponse = await database
    .query(
      `
          UPDATE 
            categories 
          SET 
            name = $1 
          WHERE 
            id = $2 
          RETURNING *;
      `,
      [payload.name, id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

const deleteCategorieService = async (id) => {
  const queryResponse = await database
    .query(
      `
    DELETE FROM 
      categories
    WHERE
      id = $1
    RETURNING *;
  `,
      [id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

export {
  getCategoriesService,
  postCategorieService,
  retrieveCatgorieService,
  editCategorieService,
  deleteCategorieService,
};
