'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'PlayerSkins',
      [
        {
          skin: '🦞',
          boomerang: '🍤',
        },
        {
          skin: '🦔',
          boomerang: '🍄',
        },
        {
          skin: '🎅',
          boomerang: '🎄',
        },
        {
          skin: '🐻',
          boomerang: '🔥',
        },
        {
          skin: '🧚',
          boomerang: '🪄',
        },
        {
          skin: '👮',
          boomerang: '🔫',
        },
        {
          skin: '🕺',
          boomerang: '🪃 ',
        },
        {
          skin: '🧝',
          boomerang: '🏹',
        },
        {
          skin: '🥷',
          boomerang: '🗡',
        },
        {
          skin: '🦉',
          boomerang: '🌪',
        },
        {
          skin: '🦸',
          boomerang: '🪐',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlayerSkins', null, {});
  },
};
