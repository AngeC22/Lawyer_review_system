/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("lawyers", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("url").notNullable();
    table.string("imageUrl");
    table.string("specialty");
    table.string("educationBackground").notNullable();
    table.string("language").notNullable();
    table.string("location").notNullable();
    table.string("workExperience");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("lawyers");
};
