const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();
    return product;
  };
  
  const ProductModel = model("productos", ProductSchema);
  
  module.exports = ProductModel;