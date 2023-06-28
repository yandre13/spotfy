import { getSong } from '@/db/functions/songs'
import { getAuthSession } from '@/lib/auth'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Context) {
  const idSong = params.id
  const session = await getAuthSession()
  const song = await getSong(idSong, session?.user.id)

  const response = {
    status: 200,
    message: 'song found',
    data: song,
  }
  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
