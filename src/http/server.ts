import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLinks } from './routes/send-auth-links'
import chalk from 'chalk'

const port = 3333
const app = new Elysia().use(registerRestaurant).use(sendAuthLinks)

app.listen(port, () => {
  console.log(chalk.redBright(`🚀 Server running on port ${port}`))
})
