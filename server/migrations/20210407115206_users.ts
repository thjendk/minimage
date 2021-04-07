import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (t) => {
    t.increments();
    t.string("username");
    t.string("password");
    t.string("email");
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
