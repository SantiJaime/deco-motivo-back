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
const { upload } = require("../utils/multer");

router.get("/", getAllProducts);
router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneProduct
);
router.post(
  "/",
  auth(),
  upload.array("imgs"),
  [
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check("descripcion", "El campo descripción está vacío").notEmpty(),
    check("categoria", "El campo categoría está vacío").notEmpty(),
    check("medidas", "El campo medidas está vacío").notEmpty(),
    check("materiales", "El campo materiales está vacío").notEmpty(),
    check("imgs", "El campo imágenes está vacío").notEmpty(),
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
