module.exports = (sequelize, dataTypes) => {
    let alias = "Inventario";

    let config = {
        tableName: "inventario"
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    const Inventario = sequelize.define(alias, cols, config);

    Inventario.associate = models => {
        Inventario.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'inventario_id'
        });
    };

    return Inventario;
}