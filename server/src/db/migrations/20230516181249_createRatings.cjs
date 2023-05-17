/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  knex.schema.createTable("ratings", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("reviewId").references("reviews.id").notNullable().unsigned();
    table.bigInteger("userId").references("users.id").notNullable().unsigned();
    table.bigInteger("rating").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("ratings");
};
