import S3 from 'aws-sdk/clients/s3'
import { nanoid } from 'nanoid'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    const contentType = params.get('contentType')
    if (
      !contentType ||
      (contentType !== 'image/jpeg' &&
        contentType !== 'image/png' &&
        contentType !== 'audio/mpeg' &&
        contentType !== 'audio/mp3')
    ) {
      throw new Error('Invalid file type')
    }
    const contentLength = parseInt(req.headers.get('Content-Length') || '0', 10)
    const maxFileSize = 30 * 1024 * 1024 // 30 MB
    if (contentLength > maxFileSize) {
      throw new Error('File size exceeds maximum limit')
    }
    const ext = contentType?.split('/')[1]
    const folder = params.get('folder') || 'public'
    const fileName = params.get('fileName') || 'file'
    const uniqueId = nanoid()

    const key = `${folder}/${fileName}-${uniqueId}.${ext}`

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: contentType,
    }
    const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params)

    return new Response(JSON.stringify({ url: signedUrl, key }), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: err }), {
      headers: { 'content-type': 'application/json' },
    })
  }
}
