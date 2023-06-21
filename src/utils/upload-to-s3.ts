export async function uploadToS3(
  file: File,
  options: {
    maxFileSize?: number
    onError?: () => void
    onSuccess?: () => void
    onErrorMaxSize?: () => void
    onErrorType?: () => void
    type?: 'image' | 'audio'
    folder?: string
  }
) {
  const {
    maxFileSize = 30 * 1024 * 1024, // 30 MB
    onError,
    onSuccess,
    onErrorMaxSize,
    onErrorType,
    type = 'image',
    folder = 'public',
  } = options

  if (file.size > maxFileSize) {
    if (onErrorMaxSize) {
      onErrorMaxSize()
    } else {
      console.log('File size exceeds maximum limit')
    }
  }
  const fileType = file.type.split('/')[1]
  if (type === 'image' && fileType !== 'jpeg' && fileType !== 'png') {
    if (onErrorType) {
      onErrorType()
    } else {
      console.log(`File ${file.name} is not an image`)
    }
    return
  } else if (type === 'audio' && fileType !== 'mpeg') {
    if (onErrorType) {
      onErrorType()
    } else {
      console.log(`File ${file.name} is not an audio file`)
    }
    return
  }
  const contentType = encodeURIComponent(file.type)

  const res = await fetch(
    `/api/upload-url?contentType=${contentType}&fileName=${
      file.name.split('.')[0]
    }&folder=${folder}`
  )
  const data = await res.json()

  const { url, key } = data
  const uploadRes = await fetch(url, {
    method: 'PUT',
    body: file,
  })
  if (uploadRes.ok) {
    if (onSuccess) {
      onSuccess()
    } else {
      console.log('uploaded to s3')
    }
    return { key }
  } else {
    if (onError) {
      onError()
    } else {
      console.log('upload error: ', uploadRes)
    }
    return null
  }
}
