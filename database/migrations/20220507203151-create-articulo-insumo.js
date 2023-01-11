'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticuloInsumo', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denominacion: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
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
      stockMinimo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unidadMedida: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      esInsumo: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      rubroInsumo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rubroinsumo',
          key: 'id'
        },
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('ArticuloInsumo');
  }
};