
const successResponse = (res, data, msg) => {
    res.status(200).send({ success: 1, data, msg });
  };
  
  const serverError = (res, msg) => {
    res.status(500).send({ success: 0, msg });
  };
  
  const notFound = (res, msg) => {
    res.status(404).send({ success: 0, msg });
  };
  
  const unauthorized = (res, msg) => {
    res.status(401).send({ success: 0, msg });
  };
  
  const other = (res, msg) => {
    res.status(400).send({ success: 0, msg });
  };
  
  module.exports = {
    successResponse,
    serverError,
    notFound,
    unauthorized,
    other
  };
  