// import { DB } from '@/src/schemas/db.schema'
import { KyselyAuth } from '@auth/kysely-adapter'
import { loadEnvConfig } from '@next/env'

import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

declare global {
  // var kysely: Kysely<DB> | undefined
  var kysely: Kysely<any> | undefined
}

const dev = process.env.NODE_ENV !== 'production'
const { DB_ID, DB_USER, DB_PORT, DB_PASSWORD, DB_HOST } = loadEnvConfig('../', dev).combinedEnv

export const pool = new Pool({
  database: DB_ID,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT as number | undefined,
  max: 10,
})

const dialect = new PostgresDialect({
  pool,
})

export const db =
  globalThis.kysely ||
  new Kysely({
    dialect,
  })
// export const db =
//   globalThis.kysely ||
//   new KyselyAuth<Database, Database>({
//     dialect,
//   })

if (process.env.NODE_ENV !== 'production') globalThis.kysely = db
