import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //Will need to change this to specific user/ip based.
    const key = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
    const { success } = await ratelimit.limit(key);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limit service is down:", error.message);
    // We DON'T pass the error to next().
    // We just call next() so the user can still use the app.
    next();
  }
};

export default rateLimiter;
