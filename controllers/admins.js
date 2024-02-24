const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin");

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find();
    res
      .status(200)
      .json({ msg: "Usuarios administradores encontrados", allAdmins });
  } catch (error) {
    res.status(500).json({
      msg: "No se pudo encontrar los usuarios administradores",
      error,
    });
  }
};

const createAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newAdmin = new AdminModel(req.body);
    const salt = bcrypt.genSaltSync();

    newAdmin.pass = await bcrypt.hash(req.body.pass, salt);
    await newAdmin.save();
    res
      .status(201)
      .json({ msg: "Usuario administrador creado correctamente", newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo crear el usuario administrador", error });
  }
};

const editAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const editedAdmin = await AdminModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      msg: "Usuario administrador editado correctamente",
      editedAdmin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo editar el usuario administrador", error });
  }
};

const deleteAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await AdminModel.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ msg: "Usuario administrador eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo eliminar el usuario administrador", error });
  }
};

const loginAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const userExist = await AdminModel.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(422).json({ msg: "El usuario no existe", status: 422 });
    }

    const passCheck = await bcrypt.compare(req.body.pass, userExist.pass);
    if (passCheck) {
      const payload_jwt = {
        user: {
          id: userExist._id,
          email: userExist.email,
        },
      };
      const token = jwt.sign(payload_jwt, process.env.SECRET_KEY);
      res.status(200).json({
        msg: "Sesión iniciada correctamente",
        userExist,
        token,
        status: 200,
      });
    } else {
      res
        .status(422)
        .json({ msg: "Email y/o contraseña incorrectos", status: 422 });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo iniciar sesión", error });
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
};
