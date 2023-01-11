'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticuloManufacturadoDetalle', {
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
      unidadMedida: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      articuloInsumo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'articuloinsumo',
          key: 'id'
        },
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('ArticuloManufacturadoDetalle');
  }
};