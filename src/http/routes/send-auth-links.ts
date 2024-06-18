import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import { createId } from '@paralleldrive/cuid2'
import { authLinks } from '../../db/schema'
import { env } from '../../env'
import chalk from 'chalk'

/**
 * Rota para enviar links de autenticação aos usuários.
 */
export const sendAuthLinks = new Elysia()

/**
 * Envia um link de autenticação ao usuário com o email fornecido.
 *
 * @param {Object} body - O corpo da solicitação que contém o email do usuário.
 * @returns {Promise<void>} - Uma promessa que é resolvida quando o link de autenticação é enviado.
 * @throws {Error} - Se o usuário com o e-mail fornecido não for encontrado.
 */
sendAuthLinks.post(
  'authenticate',
  async ({ body }) => {
    const { email } = body

    // Encontre o usuário com o e-mail fornecido
    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    // Se o usuário não for encontrado, gera um erro
    if (!userFromEmail) {
      throw new Error('User not found')
    }

    // Gere um código de link de autenticação exclusivo
    const authLinkCode = createId()

    // Insira o código do link de autenticação e o ID do usuário no banco de dados
    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    // Crie o URL do link de autenticação
    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode) // example: http://localhost:3333/auth-links/authenticate?code=123456
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    // Log the authentication link URL
    console.log(chalk.greenBright(`🔗 Auth link: ${authLink.toString()}`))
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
