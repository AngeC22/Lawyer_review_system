/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  knex.schema.createTable("lawyers", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("lawFirmUrl").notNullable();
    table.string("educationBackground").notNullable();
    table.string("workExperience").notNullable();
    table.string("specialty").notNullable();
    table.string("language").notNullable();
    table.string("location").notNullable();
    table.bigInteger(reviewId).references(reviews.id).notNullable().unsigned();
    table.timestamp("createAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("lawyers");
};
