'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Factura', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATE
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      montoDescuento: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      formaPago: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      nroTarjeta: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        }
      },
      totalVenta: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      totalCosto: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      pedido_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pedido',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Factura');
  }
};