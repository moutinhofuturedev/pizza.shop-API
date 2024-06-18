import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import { users, restaurants } from '../../db/schema'

export const registerRestaurant = new Elysia()

registerRestaurant.post(
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
      restaurantName,
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
