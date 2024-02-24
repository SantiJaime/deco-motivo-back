const express = require("express");
const {
  getAllAdmins,
  createAdmin,
  loginAdmin,
  editAdmin,
  deleteAdmin,
} = require("../controllers/admins");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", auth(), getAllAdmins);
router.post(
  "/",
  [
    check("name", "Campo nombre vacío").notEmpty(),
    check("email", "Campo correo electrónico vacío").notEmpty(),
    check("email", "Formato de correo electrónico inválido").isEmail(),
    check("pass", "Campo contraseña vacío").notEmpty(),
    check("pass", "Formato inválido. Min de 8 caracteres").isLength({ min: 8 }),
  ],
  createAdmin
);
router.post("/login", loginAdmin);
router.put(
  "/:id",
  auth(),
  [check("id", "Formato ID incorrecto").isMongoId()],
  editAdmin
);
router.delete(
  "/:id",
  auth(),
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteAdmin
);

module.exports = router;
