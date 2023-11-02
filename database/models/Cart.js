module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";

    let config = {
        tableName: "carrito"
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        }
    };

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = models => {
        Carrito.belongsTo(models.Producto, {
            as: 'producto', // Alias para la relación
            foreignKey: 'producto_id'
        });
    };

    return Carrito;
}