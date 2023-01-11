'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bebida', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreBebida: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      precioCompra: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      precioVenta: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      stockActual: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unidadMedida: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      bajaLogica_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'bajalogica',
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
    await queryInterface.dropTable('Bebida');
  }
};