module.exports = function (sequelize, dataTypes) {
    let alias = 'UsersToActivate';

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
            type: dataTypes.DOBLE
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
        },
        uuid: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    let UsersToActivate = sequelize.define(alias, cols, config);

    return UsersToActivate;
}