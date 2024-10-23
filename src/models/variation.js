const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Variation extends Model {
        static associate(models) {
            Variation.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }

    Variation.init({
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Tên bảng sản phẩm
                key: 'id'
            }
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true // URL hình ảnh tương ứng với màu sắc
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Variation'
    });

    return Variation;
};