module.exports = (sequelize, dataTypes) => {
    let alias = "Tamanio";

    let config = {
        tableName: "tamanios"
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ancho: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        alto: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        diametro: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        precio_extra: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        }
    };

    const Tamanio = sequelize.define(alias, cols, config);

    // Tamanio.associate = models => {
    //     Tamanio.belongsTo(models.Producto, {
    //         as: 'tamanio',
    //         foreignKey: 'tamanio_id'
    //     });
    // };

    return Tamanio;
}