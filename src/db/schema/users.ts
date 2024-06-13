import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const UserRole = pgEnum('user_role', ['manager', 'customer'])

export const users = pgTable('users', {
  id: text('id')
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: UserRole('role').default('customer').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/* 
Este trecho de código está definindo um esquema de tabela para uma tabela "users" em um banco de dados PostgreSQL usando o Drizzle ORM.

As declarações import estão importando módulos necessários do pacote drizzle-orm/pg-core e do pacote @paralleldrive/cuid2.
A constante UserRole está definindo um tipo de enumeração chamado "user_role" com dois valores: "manager" e "customer".

A constante users está definindo o esquema da tabela "users". Ela possui várias colunas, como id, name, email, phone, role, createdAt e updatedAt. 

A coluna id possui um valor padrão gerado pela função createId do pacote @paralleldrive/cuid2 e é a chave primária da tabela. 
As colunas name e email não são nulas, e a coluna email possui uma restrição de unicidade. 
A coluna role possui um valor padrão de "customer" e também não é nula. 
As colunas createdAt e updatedAt possuem valores padrão definidos como o timestamp atual.
*/
