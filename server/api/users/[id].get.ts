import { StatusCodes } from 'http-status-codes'
import { useErrorRes, useRes } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      return useRes(event, StatusCodes.NOT_FOUND, 'User not found')
    }

    return user
  } catch (err: any) {
    console.error(err)
    return useErrorRes(event, err)
  }
})
