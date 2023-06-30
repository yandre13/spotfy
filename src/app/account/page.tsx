import AccountContent from '@/components/client/account-content'
import Header from '@/components/client/header'
import Box from '@/components/ui/box'

//TODO: add middleware to check if user is logged in
export default async function AccountPage() {
  return (
    <section>
      <Box className="h-full overflow-hidden">
        <Header title="Account Settings" />
        <div className="px-6">
          <AccountContent />
        </div>
      </Box>
    </section>
  )
}
