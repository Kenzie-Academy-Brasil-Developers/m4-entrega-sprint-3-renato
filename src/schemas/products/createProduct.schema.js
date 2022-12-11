import * as yup from "yup";

const createProductShape = yup.object().shape({
  name: yup.string().max(200).required(),
  price: yup.number().required(),
  category_id: yup.number().required(),
});

export { createProductShape };
