module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
    return res.status(400).json({ message: 'Please fix the highlighted fields', errors });
  }
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid task id' });
  if (err.status) return res.status(err.status).json({ message: err.message });

  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server' });
};