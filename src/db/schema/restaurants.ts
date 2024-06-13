import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'
import { relations } from 'drizzle-orm'

export const restaurants = pgTable('restaurants', {
  id: text('id')
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  managerId: text('manager_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const restaurantsRelations = relations(restaurants, ({ one }) => {
  return {
    manager: one(users, {
      fields: [restaurants.managerId],
      references: [users.id],
      relationName: 'restaurant_manager',
    }),
  }
})

/* 
Este trecho de código define um esquema de tabela para uma tabela "restaurants" em um banco de dados PostgreSQL usando a biblioteca Drizzle ORM. A tabela possui as seguintes colunas:

id: uma coluna de texto que gera um identificador único usando a função createId da biblioteca @paralleldrive/cuid2. Ela é a chave primária da tabela.
name: uma coluna de texto que não pode ser nula.
description: uma coluna de texto.
managerId: uma coluna de texto que faz referência à coluna id da tabela "users". Se o usuário referenciado for excluído, o valor de managerId será definido como nulo.
createdAt: uma coluna de timestamp que não pode ser nula e possui um valor padrão igual à data e hora atuais.
updatedAt: uma coluna de timestamp que não pode ser nula e possui um valor padrão igual à data e hora atuais.

O código também define uma relação entre a tabela "restaurants" e a tabela "users" usando a função relations da biblioteca Drizzle ORM. 
A relação é chamada de "manager" e representa uma relação um-para-um entre um restaurante e seu gerente.
*/
