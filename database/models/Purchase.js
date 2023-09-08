module.exports = (sequelize, dataTypes) => {
    let alias = "Compra";

    let config = {
        tableName: "compras"
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_compra: {
            type: dataTypes.DATE,
            allowNull: false
        },
        precio_total: {
            type: dataTypes.FLOAT(11, 3) ,
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    const Compra = sequelize.define(alias, cols, config);

    Compra.associate = models => {
        Compra.belongsTo(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        });

        Compra.hasMany(models.DetalleCompra, {
            as: 'detallesCompra',
            foreignKey: 'compra_id'
        });
    };

    return Compra;
}