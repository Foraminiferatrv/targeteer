import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  //----Auth----
  // User
  await db.schema
    .createTable('user')
    .addColumn('id', 'text', (col) =>
      col
        .primaryKey()
        // .defaultTo(sql`gen_random_uuid()`)
        .notNull(),
    )
    .addColumn('username', 'text', (col) => col.unique().notNull())
    // .addColumn('password', 'text')
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('email_verified', 'timestamptz')
    .addColumn('image', 'text')
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute()


  //Session
  await db.schema
    .createTable('session')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull())
    .addColumn('user_id', 'text', (col) => col.references('user.id').onDelete('cascade').notNull())
    // .addColumn('sessionToken', 'text', (col) => col.notNull().unique())
    .addColumn('active_expires', 'int8', (col) => col.notNull())
    .addColumn('idle_expires', 'int8', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute()

  //Key
  await db.schema
    .createTable('key')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('user_id', 'text', (col) => col.references('user.id').onDelete('cascade').notNull())
    .addColumn('hashed_password', 'text')
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute()

  //VerificationToken
  await db.schema
    .createTable('verification_token')
    .addColumn('identifier', 'text', (col) => col.notNull())
    .addColumn('token', 'text', (col) => col.notNull().unique())
    .addColumn('expires', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute()

  // await db.schema.createIndex('Account_userId_index').on('Account').column('userId').execute()

  // await db.schema.createIndex('Session_userId_index').on('Session').column('userId').execute()

}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('account').ifExists().execute()
  await db.schema.dropTable('session').ifExists().execute()
  await db.schema.dropTable('user').ifExists().execute()
  await db.schema.dropTable('verificationToken').ifExists().execute()
}
