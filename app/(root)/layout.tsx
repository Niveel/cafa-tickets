import { Navbar, Footer } from "@/components"
import { isAuthenticated, getCurrentUser } from "@/app/lib/auth"

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, currentUser] = await Promise.all([
    isAuthenticated(),
    getCurrentUser()
  ]) 
  
  // console.log('RootLayout - currentUser:', currentUser);
  // console.log('RootLayout - isLoggedIn:', isLoggedIn);

  return (
    <div>
        <Navbar currentUser={currentUser} isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout