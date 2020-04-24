const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next, "Server Error");

module.exports = asyncHandler;
