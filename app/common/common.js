exports.handleError = function handleError(res, err) {
  console.log(err);
  if(err.name === 'ValidationError')
    return res.status(400).json(err);
  else
    return res.status(500).json(err);
};