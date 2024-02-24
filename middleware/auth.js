const jwt = require("jsonwebtoken");

module.exports = () => (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (verify) next();
    else res.status(401).json({ msg: "No estás autorizado" });

  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el token", error });
  }
};