/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("lawfrims", (table) => {
    table.bigIncrements("id");
    table.string("name");
    table.string("language");
    table.string("rating");
    table.string("address");
    table.string("specialty");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("lawfirms");
};
