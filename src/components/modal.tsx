import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, ButtonVariantProps } from '@/components/ui/button'
import { X } from 'lucide-react'

type Props = {
  label: string
  title: string
  content: React.ReactNode | string
  variant?: ButtonVariantProps['variant']
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ModalDialog({
  label,
  title,
  content,
  variant,
  open,
  onOpenChange,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant={variant || 'outline'}>{label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription asChild={typeof content !== 'string'}>
            {content}
          </AlertDialogDescription>
          <AlertDialogCancel className="p-2 absolute top-0 right-2 h-auto w-auto">
            <X className="h-5 w-5" />
          </AlertDialogCancel>
        </AlertDialogHeader>
        {/* <AlertDialogFooter className="text-center">
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  )
}
