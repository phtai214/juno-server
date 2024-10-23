const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Shop extends Model {
        static associate(models) {
            // Có thể định nghĩa mối quan hệ ở đây nếu cần
        }
    }

    Shop.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Shop',
        tableName: 'Shops', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Shop;
};
