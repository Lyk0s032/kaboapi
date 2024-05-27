const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('project', { 
        // Wallpaper
        wallpaper:{
            type: DataTypes.STRING
        },
        // Nombre
        nameProject: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        // Description
        description: {
            type: DataTypes.STRING
        },
        // url
        link:{
            type: DataTypes.STRING
        },
        // Disponibilidad del link
        avaliable: {
            type: DataTypes.BOOLEAN
        },
        // time
        time:{
            type: DataTypes.DATE
        }, 
        tags:{
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        // Estado
        state: {
            type: DataTypes.STRING
        }

    })
}   