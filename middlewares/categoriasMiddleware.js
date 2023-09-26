const db = require('../database/models');

const categoriasMiddleware = async (req, res, next) => {
    try {
      const categorias = await db.Categoria.findAll();
      res.locals.categorias = categorias;
      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = categoriasMiddleware;