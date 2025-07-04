const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errText = errMsg.join(",");
    const mergeErr = new Error(errText);
    next(mergeErr);
  }
};

export default validate;
