module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";

    let config = {
        tableName: "productos",
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        precio: {
            type: dataTypes.FLOAT(10, 2),
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING(300),
            allowNull: true
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        categoria_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        descuento_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        tamanio_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        }
    };

    const Producto = sequelize.define(alias, cols, config);

    // Producto.associate = models => {
    //     Producto.belongsTo(models.Descuento, {
    //         as: 'descuento',
    //         foreignKey: 'descuento_id'
    //     });

        // Producto.belongsToMany(models.Actor, {
        //     as: 'actors',
        //     through: 'actor_movie',
        //     foreignKey: 'movie_id',
        //     otherKey: 'actor_id'
        // });
    //};

    return Producto;
}