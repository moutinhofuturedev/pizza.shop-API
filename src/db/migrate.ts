/**
 * Este script é usado para executar migrações de banco de dados usando Drizzle ORM.
 * Ele se conecta ao banco de dados PostgreSQL, executa as migrations,
 * e então encerra a conexão.
 */

import postgres from 'postgres' // Import the PostgreSQL driver
import { drizzle } from 'drizzle-orm/postgres-js' // Import the Drizzle ORM
import { migrate } from 'drizzle-orm/postgres-js/migrator' // Import the migrator function
import { env } from '../env'
import chalk from 'chalk'

/**
 * Conecte-se ao banco de dados PostgreSQL.
 * A conexão está configurada para usar o driver 'postgres',
 * e o banco de dados está localizado em 'localhost' com a porta '5432'.
 * O nome de usuário é ‘docker’ e a senha é ‘password’.
 * O nome do banco de dados é 'pizzashop'.
 * O número máximo de conexões é definido como 1.
 */
const connection = postgres(env.DATABASE_URL, { max: 1 })

/**
 * Crie uma instância Drizzle ORM usando a conexão criada anteriormente.
 */
const db = drizzle(connection)

/**
 * Execute as migrações usando a instância Drizzle ORM.
 * As migrações estão localizadas na pasta ‘drizzle’.
 */
await migrate(db, { migrationsFolder: 'drizzle' })

console.log(chalk.greenBright('Database migrations completed successfully!'))

/**
 * Encerre a conexão com o banco de dados.
 */
connection.end()

console.log(chalk.redBright('Connection closed!'))

/**
 * Saia do processo.
 */
process.exit()
