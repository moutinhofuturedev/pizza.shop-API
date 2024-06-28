/* eslint-disable drizzle/enforce-delete-with-where */
/* eslint-disable camelcase */
import { fakerPT_BR } from '@faker-js/faker'
import { users, restaurants, authLinks } from './schema'
import { db } from './connection'
import chalk from 'chalk'

/**
 * Este script é usado para popular o banco de dados com dados de teste.
 * Ele se conecta ao banco de dados PostgreSQL e popula as tabelas
 * 'users' e 'restaurants'.
 */

/*
Reset the database
*/
await db.delete(users)
await db.delete(restaurants)
await db.delete(authLinks)

console.log(chalk.greenBright('Database reset successfully!'))

/*
Populate the database with data customers
*/
await db.insert(users).values([
  {
    name: fakerPT_BR.person.fullName(),
    email: fakerPT_BR.internet.email(),
    phone: fakerPT_BR.phone.number(),
    role: 'customer',
  },
])

console.log(chalk.whiteBright('✅Create customers!'))

/*
Populate the database with data manager
*/
const [manager] = await db
  .insert(users)
  .values([
    {
      name: fakerPT_BR.person.fullName(),
      email: 'admin@admin.com',
      phone: fakerPT_BR.phone.number(),
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

console.log(chalk.whiteBright('✅Create manager!'))

/*
Populate the database with data restaurants
*/
await db.insert(restaurants).values([
  {
    restaurantName: fakerPT_BR.company.name(),
    description: fakerPT_BR.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log(chalk.whiteBright('✅Create restaurants!'))

console.log(chalk.greenBright('Database seeding completed successfully!'))

process.exit()
