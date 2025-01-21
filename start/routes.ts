/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release
  }
})

router.post('user', async ({ request }) => {
  console.log(request.all())
  const user = await User.create(request.all())

  const token = await User.accessTokens.create(user)
  return {
    id: user.id,
    createdAt: user.createdAt,
    token: token
  }
})

router.delete('user/:id', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  await user.delete()
  return {
    message: 'User deleted'
  }
})