'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          score: 500,
          enemies_killed: 120,
          player_id: 1,
        },
        {
          score: 1700,
          enemies_killed: 200,
          player_id: 2,
        },
        {
          score: 500,
          enemies_killed: 30,
          player_id: 3,
        },
        {
          score: 1000,
          enemies_killed: 270,
          player_id: 3,
        },
        {
          score: 400,
          enemies_killed: 30,
          player_id: 3,
        },
        {
          score: 120,
          enemies_killed: 34,
          player_id: 4,
        },
        {
          score: 1200,
          enemies_killed: 350,
          player_id: 4,
        },
        {
          score: 1500,
          enemies_killed: 400,
          player_id: 4,
        },
        {
          score: 1000,
          enemies_killed: 340,
          player_id: 4,
        },
        {
          score: 1000,
          enemies_killed: 340,
          player_id: 5,
        },
        {
          score: 450,
          enemies_killed: 230,
          player_id: 5,
        },
        {
          score: 500,
          enemies_killed: 230,
          player_id: 6,
        },
        {
          score: 500,
          enemies_killed: 130,
          player_id: 6,
        },
        {
          score: 100,
          enemies_killed: 30,
          player_id: 6,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
