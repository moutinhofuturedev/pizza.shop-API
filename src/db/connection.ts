import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import * as schema from './schema'

/**
 * Create a connection to the PostgreSQL database using the environment variable DATABASE_URL.
 */
const connection = postgres(env.DATABASE_URL)

/**
 * Create a Drizzle ORM instance using the connection and the schema.
 * @param {Object} connection - The connection object to the PostgreSQL database.
 * @param {Object} options - The options object.
 * @param {Object} options.schema - The schema object.
 * @returns {Object} - The Drizzle ORM instance.
 */
export const db = drizzle(connection, { schema })
