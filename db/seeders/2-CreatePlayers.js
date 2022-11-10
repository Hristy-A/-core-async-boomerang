'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Players',
      [
        {
          name: 'Lera',
          skin_id: 8,
        },
        {
          name: 'Naida',
          skin_id: 6,
        },
        {
          name: 'Andrey',
          skin_id: 2,
        },
        {
          name: 'Artem',
          skin_id: 11,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  },
};
