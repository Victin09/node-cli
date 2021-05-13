export function handleError(err, _req, res, _next) {
  const { message, statusCode = 500 } = err;
  res.status(statusCode).json({ status: 'error', message, statusCode });
}
