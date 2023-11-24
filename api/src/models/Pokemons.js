const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    image: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: 0,
      },
    },

    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    attack: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: 0,
      },
    },

    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },

    height: {
      type: DataTypes.STRING,
      allowNull:true,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};
