/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(64),
      },
      skin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PlayerSkins',
          key: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'cascade',
      },
      createdAt: {
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Players');
  },
};
