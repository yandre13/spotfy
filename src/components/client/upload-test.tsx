'use client'
import { uploadToS3 } from '@/utils/upload-to-s3'
import { ChangeEvent } from 'react'

export default function UploadForm() {
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const coverFile = formData.get('cover') as File
    const songFile = formData.get('song') as File
    try {
      const resultImg = uploadToS3(coverFile, {
        type: 'image',
      })
      const resultSong = uploadToS3(songFile, {
        type: 'audio',
      })
      const result = await Promise.all([resultImg, resultSong])
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <p>Please select file(s) to upload</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image" name="cover" />
        <input type="file" accept=".mp3" name="song" />
        <button type="submit">Upload</button>
      </form>
    </>
  )
}
