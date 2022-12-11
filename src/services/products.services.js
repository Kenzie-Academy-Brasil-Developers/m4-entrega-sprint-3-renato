import { database } from "../database/index.js";
import { Errors } from "../errors.js";

const postProductService = async (payload) => {
  const searchProduct = await database.query(
    `
    SELECT * FROM products WHERE name = $1
  `,
    [payload.name]
  );

  if (searchProduct.rowCount > 0) {
    throw new Errors("product already exists", 409);
  }

  const queryResponse = await database
    .query(
      `
        INSERT INTO products (name,price,category_id)
                    VALUES($1, $2, $3)
                    RETURNING *;`,
      [payload.name, payload.price, payload.category_id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

const getAllProductsService = async () => {
  const queryResponse = await database
    .query(
      `
      SELECT * FROM products;
  `
    )
    .then((res) => res.rows);

  return queryResponse;
};

const retrieveProductService = async (id) => {
  const queryResponse = await database
    .query(
      `
        SELECT * FROM products WHERE id::text = $1
  `,
      [id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

const editProductService = async (payload, id) => {
  let query = "UPDATE products SET ";
  const objKeys = Object.keys(payload);
  console.log(objKeys);
  const objValues = Object.values(payload);

  objKeys.forEach((key, index) => {
    console.log(index);
    query += `${key} = \$${(index += 1)}, `;
  });

  query = query.slice(0, -2);

  query += ` WHERE id::text = \$${(objKeys.length += 1)} RETURNING *;`;

  const queryResponse = await database.query(query, [...objValues, id]);

  return queryResponse.rows[0];
};

const deleteProductService = async (id) => {
  const queryResponse = await database
    .query(
      `
      DELETE FROM 
        products 
      WHERE 
        id::text = $1 
      RETURNING *;
  `,
      [id]
    )
    .then((res) => res.rows);

  return queryResponse;
};

export {
  postProductService,
  getAllProductsService,
  retrieveProductService,
  deleteProductService,
  editProductService,
};
