'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario: {
        allowNull: false,
        unique: true,
        len: [6,12],
        type: Sequelize.STRING(12),
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      clave: {
        allowNull: false,
        type: Sequelize.STRING(64),
        validate: {
          notEmpty: true,
          is: /^[0-9a-f]{64}$/i
        }
      },
      rol_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rol',
          key: 'id'
        }
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      apellido: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      telefono: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
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
    await queryInterface.dropTable('Usuario');
  }
};