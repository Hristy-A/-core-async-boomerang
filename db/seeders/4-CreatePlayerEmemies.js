'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Enemies',
      [
        {
          skin: '👾',
          base_tick: 10,
          strong: 1,
        },
        {
          skin: '💀',
          base_tick: 11,
          strong: 1,
        },
        {
          skin: '👹',
          base_tick: 15,
          strong: 1,
        },
        {
          skin: '👻',
          base_tick: 12,
          strong: 1,
        },
        {
          skin: '👽',
          base_tick: 13,
          strong: 1,
        },
        {
          skin: '👿',
          base_tick: 10,
          strong: 1,
        },
        {
          skin: '💩',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: '🤡',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: '🤺',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: '🧛',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: '🧟',
          base_tick: 14,
          strong: 1,
        },
        {
          skin: '🎃',
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
