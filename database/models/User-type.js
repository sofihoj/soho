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

    return TipoUsuario;
}