module.exports = function (sequelize, dataTypes) {
    let alias = 'Users';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.INTEGER
        },
        cell_phone: {
            type: dataTypes.INTEGER
        },
        address: {
            type: dataTypes.STRING
        },
        zipcode: {
            type: dataTypes.STRING
        },
        city: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        isAdmin: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    let Users = sequelize.define(alias, cols, config);

    /* Users.associate = function (models) {
        Users.belongsTo(models.Cart, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        }) 
    } */

    return Users;
}