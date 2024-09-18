// backend/middleware/authMiddleware.js
const supabase = require("../supabaseClient");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;
