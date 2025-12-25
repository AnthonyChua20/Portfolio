const logger = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;