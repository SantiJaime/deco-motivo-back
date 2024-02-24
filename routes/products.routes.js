const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/", getAllProducts);
router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneProduct
);
router.post(
  "/",
  auth(),
  [
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check(
      "nombre",
      "Mínimo de 3 caracteres | Máximo de 100 caracteres"
    ).isLength({
      min: 3,
      max: 100,
    }),
    check("descripcion", "El campo descripción está vacío").notEmpty(),
    check("categoria", "El campo categoría está vacío").notEmpty(),
    check("imagen", "El campo imágen está vacío").notEmpty(),
    check("precio", " El campo precio está vacío").notEmpty(),
  ],
  createProduct
);
router.put(
  "/:id",
  auth(),
  [check("id", "Formato ID incorrecto").isMongoId()],
  editProduct
);
router.delete(
  "/:id",
  auth(),
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteProduct
);

module.exports = router;
