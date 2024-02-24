const { model, Schema } = require("mongoose");

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

AdminSchema.methods.toJSON = function () {
  const { __v, ...admin } = this.toObject();
  return admin;
};

const AdminModel = model("admins", AdminSchema);

module.exports = AdminModel;
