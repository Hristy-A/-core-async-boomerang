'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Enemies',
      [
        {
          skin: 'ðū',
          base_tick: 10,
          strong: 1,
        },
        {
          skin: 'ð',
          base_tick: 11,
          strong: 1,
        },
        {
          skin: 'ðđ',
          base_tick: 15,
          strong: 1,
        },
        {
          skin: 'ðŧ',
          base_tick: 12,
          strong: 1,
        },
        {
          skin: 'ð―',
          base_tick: 13,
          strong: 1,
        },
        {
          skin: 'ðŋ',
          base_tick: 10,
          strong: 1,
        },
        {
          skin: 'ðĐ',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: 'ðĪĄ',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: 'ðĪš',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: 'ð§',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: 'ð§',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: 'ð',
          base_tick: 14,
          strong: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enemies', null, {});
  },
};
