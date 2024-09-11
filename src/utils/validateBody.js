import createHttpError from "http-errors";

const validateBody = schema => {
    const validateFunc = async(req, res, next)=> {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        }
        catch(error) {
            const validateError = createHttpError(400, error.message);
            next(validateError);
        }
    };

    return validateFunc;
};

export default validateBody;