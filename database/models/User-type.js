module.exports = (sequelize, dataTypes) => {
    let alias = "TipoUsuario";

    let config = {
        tableName: "tipo_usuario"
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

    const TipoUsuario = sequelize.define(alias, cols, config);

    TipoUsuario.associate = models => {
        TipoUsuario.hasMany(models.Usuario, {
            as: 'tipo_usuario',
            foreignKey: 'tipo_usuario_id'
        });
    };

    return TipoUsuario;
}