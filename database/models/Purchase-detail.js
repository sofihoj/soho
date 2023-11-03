module.exports = (sequelize, dataTypes) => {
    let alias = "DetalleCompra";

    let config = {
        tableName: "detalle_compra",
        timestamps: false
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
            allowNull: false
        },
        compra_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };

    const DetalleCompra = sequelize.define(alias, cols, config);

    DetalleCompra.associate = models => {
        DetalleCompra.belongsTo(models.Compra, {
            as: 'compra',
            foreignKey: 'compra_id'
        });

        DetalleCompra.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        });
    };

    return DetalleCompra;
}