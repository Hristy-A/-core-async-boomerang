'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'PlayerSkins',
      [
        {
          skin: '🤠',
        },
        {
          skin: '🦸',
        },
        {
          skin: '🎅',
        },
        {
          skin: '🥸',
        },
        {
          skin: '🥰',
        },
        {
          skin: '🥷',
        },
        {
          skin: '🕺',
        },
        {
          skin: '🧝',
        },
        {
          skin: '🧙',
        },
        {
          skin: '👼',
        },
        {
          skin: '🧞',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlayerSkins', null, {});
  },
};
