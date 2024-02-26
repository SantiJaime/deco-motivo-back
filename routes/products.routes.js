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
  // [
    // check("nombre", "El campo nombre está vacío").notEmpty(),
    // check(
    //   "nombre",
    //   "Mínimo de 3 caracteres | Máximo de 100 caracteres"
    // ).isLength({
    //   min: 3,
    //   max: 100,
    // }),
    // check("descripcion", "El campo descripción está vacío").notEmpty(),
    // check("categoria", "El campo categoría está vacío").notEmpty(),
    // check("img1", "El campo imágen 1 está vacío").notEmpty(),
    // check("img2", "El campo imágen 2 está vacío").notEmpty(),
    // check("precio", " El campo precio está vacío").notEmpty(),
  // ],
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
