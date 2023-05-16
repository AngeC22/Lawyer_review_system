/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  knex.schema.createTable("lawyers", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("specialty").notNullable().unsigned();
    table.bigInteger("language").notNullable();
    table.bigInteger("location").notNullable();
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
