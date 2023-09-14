module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";

    let config = {
        tableName: "usuarios",
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
        apellido: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        direccion: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        tipo_usuario_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = models => {
        Usuario.belongsTo(models.TipoUsuario, {
            as: 'tipo_usuario',
            foreignKey: 'tipo_usuario_id'
        });

        Usuario.belongsToMany(models.Compra, {
            as: 'compras',
            through: 'DetalleCompra',
            foreignKey: 'usuario_id'
        });
    };

    // Usuario.findByField = async (field, value) => {
    //     const user = await Usuario.findOne({
    //       where: { [field]: value },
    //     });
    //     return user;
    // };

    return Usuario;
}