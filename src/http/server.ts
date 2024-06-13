import { Elysia, t } from 'elysia'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

const app = new Elysia()
const port = 3333

app.post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, phone, description } = body

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager',
      })
      .returning({
        id: users.id,
      })

    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager.id,
      description,
    })

    set.status = 'OK'
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      phone: t.String(),
      description: t.String(),
    }),
  },
)

app.listen(port, () => {
  console.log(`🔥Listening on port ${port}`)
})
