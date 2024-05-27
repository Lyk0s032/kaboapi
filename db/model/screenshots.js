const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('screenshot', { 
        // Wallpaper
        screenshot:{
            type: DataTypes.STRING
        },
        // Name screenshot
        nameScreenshot: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        }

    })
}   