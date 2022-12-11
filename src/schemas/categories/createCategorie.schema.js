import * as yup from "yup";

const categorieShape = yup.object().shape({
  name: yup.string().max(200).required(),
});

export { categorieShape };
