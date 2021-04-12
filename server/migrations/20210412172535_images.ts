import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("images", (t) => {
    t.increments();
    t.string("hex");
    t.string("path");
    t.integer("user_id")
      .references("users.id")
      .onUpdate("cascade")
      .onDelete("set null");
  });
}

export async function down(knex: Knex): Promise<void> {}
