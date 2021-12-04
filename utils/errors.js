import createError from 'http-errors';

// export const throw404 = (req, res) => {
//   res.status(404).send({ error: 'Unknown Endpoint' });
// };

// export const handleErrors = (err, req, res, next) => {
//   console.log(err);
//   if (err.name === 'ValidationError') {
//     res.status(400).send({ error: err.errors });
//   } else if (err.name === 'JsonWebTokenError') {
//     res.status(401).send({ error: 'Missing or invalid token' });
//   } else if (err.name === 'TokenExpiredError') {
//     res.status(401).send({ error: 'Token expired' });
//   }
//   next();
// };

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
