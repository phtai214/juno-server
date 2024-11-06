'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CartItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Carts', // Tên bảng liên kết
                    key: 'id' // Khóa chính của bảng Carts
                }
            },
            variation_id: { // Khóa ngoại tới bảng Variations
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Variations', // Tên bảng liên kết
                    key: 'id' // Khóa chính của bảng Variations
                }
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CartItems');
    }
};