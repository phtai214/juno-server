'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            category: {
                type: Sequelize.STRING,
                allowNull: true
            },
            image_url: {
                type: Sequelize.JSON,
                allowNull: true
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true // Đảm bảo giá trị slug là duy nhất
            },
            tag: {
                type: Sequelize.JSON, // Thay thế ARRAY bằng JSON để lưu trữ mảng
                allowNull: true,
                defaultValue: [] // Mặc định là mảng trống
            },
            flash_sale_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true // Giá FLASH-SALE, nếu có
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};
