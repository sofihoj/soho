const { validationResult } = require("express-validator");
const db = require("../database/models");
function errors(req, res, next) {
  const resultvalidations = validationResult(req);
  const oldValues = req.body;
  const oldValuesFiles = req.files;

  db.Producto.findOne({where: { nombre: req.params.nombre }}).then((oldInfo) => {
    if (resultvalidations.errors.length > 0) {
      return res.render("admin/editar", {
        errors: resultvalidations.mapped(),
        oldValues: oldValues,
        producto: {...oldValues, imagen:oldInfo.imagen},
        oldValuesFiles,
        categoria
      });
    } else {
      next();
    }
  });
}
module.exports = errors;