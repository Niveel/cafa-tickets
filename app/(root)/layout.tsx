import { Navbar, Footer } from "@/components"
import { currentUser } from "@/data/dummy.general"
// import { getCurrentUser, isAuthenticated } from "../lib/auth"

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  // const isLoggedIn = await isAuthenticated()
  // const user = await getCurrentUser()

  return (
    <div>
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout