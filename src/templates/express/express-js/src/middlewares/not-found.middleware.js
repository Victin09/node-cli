export function handleNotFound(req, res, _next) {
  const statusCode = 404;
  res.status(statusCode).json({ status: 'not found', url: req.url, statusCode });
}
