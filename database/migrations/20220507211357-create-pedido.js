'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedido', {
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
      estadoPedido_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'estadopedido',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      horaEstimadaFin: {
        allowNull: false,
        type: Sequelize.TIME
      },
      tipoEnvio: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      domicilio_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'domicilio',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      mercadoPagoDatos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'mercadopagodatos',
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
    await queryInterface.dropTable('Pedido');
  }
};