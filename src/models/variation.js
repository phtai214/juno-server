const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Variation extends Model {
        static associate(models) {
            Variation.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
            Variation.belongsTo(models.ProductDetail, { foreignKey: 'productDetailId', as: 'productDetail' });
        }
    }

    Variation.init({
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        productDetailId: { // Thêm trường productDetailId
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ProductDetails', // Tên bảng chi tiết sản phẩm
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
            allowNull: true
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