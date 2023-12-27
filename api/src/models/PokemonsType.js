const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemonsType', {

    pokemonId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },

    typeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
  },{
    timestamps: false,
    primaryKey: false,
  });
};
