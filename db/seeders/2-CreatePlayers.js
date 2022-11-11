'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Players',
      [
        {
          name: 'Lera',
          skin_id: 3,
        },
        {
          name: 'Naida',
          skin_id: 9,
        },
        {
          name: 'Andrey',
          skin_id: 10,
        },
        {
          name: 'Hristy',
          skin_id: 11,
        },
        {
          name: 'Roma',
          skin_id: 8,
        },
        {
          name: 'Oleg',
          skin_id: 6,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  },
};
