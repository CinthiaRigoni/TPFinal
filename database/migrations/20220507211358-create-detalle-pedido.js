'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetallePedido', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      subtotal: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      articuloManufacturado_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'articulomanufacturado',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      bebida_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'bebida',
          key: 'id'
        },
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('DetallePedido');
  }
};