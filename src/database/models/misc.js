module.exports = (sequelize, dataTypes) => {
  let alias = 'Misc';
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      autoNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: dataTypes.STRING(255),
      autoNull: false
    },
    value: {
      type: dataTypes.STRING(255),
      autoNull: false
    },
    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE
  }

  let config = {
    tableName: "misc",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }

  const Misc = sequelize.define(alias, cols, config); 

  return Misc;
}