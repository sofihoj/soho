module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";

    let config = {
        tableName: "categorias_productos",
        timestamps: false
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

    Categoria.associate = models => {
        Categoria.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'categoria_id'
        });
    };

    return Categoria;
}