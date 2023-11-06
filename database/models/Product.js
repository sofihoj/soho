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
        descuento: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        tamanio_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        inventario_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = models => {
        Producto.belongsTo(models.Categoria, {
            as: 'categoria',
            foreignKey: 'categoria_id'
        });

        Producto.belongsTo(models.Tamanio, {
            as: 'tamanio',
            foreignKey: 'tamanio_id'
        });

        Producto.belongsTo(models.Inventario, {
            as: 'inventario',
            foreignKey: 'inventario_id'
        });

        Producto.hasMany(models.DetalleCompra, {
            as: 'detallesCompra',
            foreignKey: 'producto_id'
        });
    };

    return Producto;
}