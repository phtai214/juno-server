const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ProductDetail extends Model {
        static associate(models) {
            ProductDetail.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }

    ProductDetail.init({
        product_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        design: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colors: {
            type: DataTypes.STRING, // Hoặc JSON nếu bạn muốn lưu mảng màu sắc
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vat_included: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'ProductDetail'
    });

    return ProductDetail;
};
