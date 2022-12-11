const SchemaMiddleware = (serializer) => async (req, res, next) => {
  try {
    const validated = await serializer.validate(req.body);

    req.validatedBody = validated;

    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};

export { SchemaMiddleware };
