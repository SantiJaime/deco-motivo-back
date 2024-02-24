const { validationResult } = require("express-validator");
const ProductModel = require("../models/products");

const getAllProducts = async (req, res) => {
  try {
    const allProds = await ProductModel.find();
    res.status(200).json({ msg: "Productos encontrados", allProds });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudieron encontrar los productos", error });
  }
};

const getOneProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneProd = await ProductModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Producto encontrado", oneProd });
  } catch (error) {
    res.satus(500).json({ msg: "No se pudo encontrar el producto", error });
  }
};

const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json({ msg: "Producto creado correctamente", newProduct });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el producto", error });
  }
};

const editProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const editedProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Producto editado correctamente", editedProduct });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar el producto", error });
  }
};

const deleteProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el producto", error });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
