import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('strategy')
    .addColumn('id', 'text', (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('is_done', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('description', 'text')

    .addColumn('user_id', 'text', (col) =>
      col.references('user.id').onDelete('cascade').onUpdate('cascade').notNull(),
    )

    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))

    .execute()

  await db.schema
    .createTable('motivation')
    .addColumn('id', 'text', (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('value', 'integer', (col) => col.notNull())

    .addColumn('strategy_id', 'text', (col) =>
      col.references('strategy.id').onDelete('cascade').onUpdate('cascade').notNull(),
    )

    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))

    .execute()

  await db.schema
    .createTable('focus')
    .addColumn('id', 'text', (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('value', 'integer', (col) => col.notNull())
    .addColumn('is_hyper_focus', 'boolean', (col) => col.notNull().defaultTo(false))

    .addColumn('strategy_id', 'text', (col) =>
      col.references('strategy.id').onDelete('cascade').onUpdate('cascade').notNull(),
    )

    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))

    .execute()

  await db.schema
    .createTable('mood')
    .addColumn('id', 'text', (col) =>
      col
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('value', 'varchar', (col) => col.notNull())

    .addColumn('strategy_id', 'text', (col) =>
      col.references('strategy.id').onDelete('cascade').onUpdate('cascade').notNull(),
    )

    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))

    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('strategies').execute()
}
