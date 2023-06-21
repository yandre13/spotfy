'use client'

import { ListMusic, Plus } from 'lucide-react'
import ModalDialog from '../modal'
import { useModals } from '@/hooks/use-modals'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { uploadToS3 } from '@/utils/upload-to-s3'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import useAuth from '@/hooks/use-auth'
import { Upload } from 'lucide-react'
import Spinner from '../spinner'

const schema = z.object({
  author: z.string().nonempty({ message: 'Author is required' }),
  title: z.string().nonempty({ message: 'Title is required' }),
  song: z.any().refine(
    (file) => {
      if (!file) return false
      return file[0]?.type.includes('audio')
    },
    { message: 'Song must be an audio file' }
  ),

  cover: z.any().refine(
    (file) => {
      if (!file) return false
      return file[0]?.type.includes('image')
    },
    { message: 'Cover must be an image file' }
  ),
})

type FormValues = z.infer<typeof schema>

function ModalUpload() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      cover: null,
    },
    resolver: zodResolver(schema),
  })

  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    const { author, title } = data
    const song = data.song[0] as File
    const cover = data.cover[0] as File
    const folder = `${author}-${title}`
    try {
      const resultImg = uploadToS3(cover, {
        type: 'image',
        folder,
      })
      const resultSong = uploadToS3(song, {
        type: 'audio',
        folder,
      })
      const result = await Promise.all([resultImg, resultSong])
      const [coverUrl, songUrl] = result
      const newSong = {
        title,
        author,
        song_url: songUrl?.key,
        image_url: coverUrl?.key,
        user_id: user!.id,
      }
      const res = await fetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify(newSong),
      })
      const data = await res.json()
      // data.status === 201
      toast({
        title: 'Success',
        description: 'Your song was uploaded successfully',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'There was an error uploading the files. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <>
      <p className="text-center">Upload an mp3 file</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pt-2"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            id="author"
            placeholder="Ex: Jhon doe"
            {...register('author')}
          />
          <p className="text-sm text-muted-foreground">
            Enter the name of the artist
          </p>
          {errors.author && (
            <p className="text-sm font-medium text-destructive">
              {errors.author.message}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Ex: My song"
            {...register('title')}
          />
          <p className="text-sm text-muted-foreground">
            Enter the title of the song
          </p>
          {errors.title && (
            <p className="text-sm font-medium text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="song">Song</Label>
          <Input
            type="file"
            accept="audio/mp3, audio/wav, audio/ogg, audio/mpeg"
            id="song"
            placeholder="Select a song"
            {...register('song')}
          />
          <p className="text-sm text-muted-foreground">
            Select a song to upload
          </p>
          {errors.song && (
            <p className="text-sm font-medium text-destructive">
              {errors.song.message as string}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="cover">Cover</Label>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="cover"
            placeholder="Select a cover"
            {...register('cover')}
          />
          <p className="text-sm text-muted-foreground">
            Select a cover to upload
          </p>
          {errors.cover && (
            <p className="text-sm font-medium text-destructive">
              {errors.cover.message as string}
            </p>
          )}
        </div>

        <Button className="mb-2 flex gap-3" disabled={loading}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <span>Upload</span>
              <Upload className="text-black h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </>
  )
}

export default function Library() {
  const { modals, onOpenChangeUpload } = useModals()
  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400">Your library</p>
        </div>
        <ModalDialog
          label={
            <Plus className="text-neutral-400 transition cursor-pointer hover:text-white" />
          }
          labelClass="p-0 h-auto bg-transparent border-none"
          title="Add a new song"
          content={<ModalUpload />}
          open={modals.upload}
          onOpenChange={onOpenChangeUpload}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of songs!</div>
    </div>
  )
}
