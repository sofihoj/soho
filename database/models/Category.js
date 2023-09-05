module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";

    let config = {
        tableName: "categorias_productos"
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoria: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    const Categoria = sequelize.define(alias, cols, config);

    //Categoria.associate = models => {
    //     Categoria.belongsTo(models.Producto, {
    //         as: 'categoria',
    //         foreignKey: 'categoria_id'
    //     });
    // };

    return Categoria;
}