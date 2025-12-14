import { Navbar, Footer } from "@/components"
import { currentUser } from "@/data/dummy.general"
import { isAuthenticated } from "@/app/lib/auth"

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  const isLoggedIn = await isAuthenticated()
  // const user = await getCurrentUser()

  return (
    <div>
        <Navbar currentUser={currentUser} isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout