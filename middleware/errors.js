import createError from 'http-errors';

export const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message || 'Server Error 💩️',
      details: err.details || null,
    },
  });
};

export const throw404 = (req, res, next) => {
  const newError = new createError.NotFound();
  next(newError);
};
