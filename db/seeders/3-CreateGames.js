'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          score: 0,
          enemies_killed: 0,
          player_id: 1,
        },
        {
          score: 0,
          enemies_killed: 0,
          player_id: 2,
        },
        {
          score: 100,
          enemies_killed: 30,
          player_id: 3,
        },
        {
          score: 120,
          enemies_killed: 34,
          player_id: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
