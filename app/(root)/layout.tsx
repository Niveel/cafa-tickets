import { Navbar, Footer } from "@/components"
import { isAuthenticated, getCurrentUser } from "@/app/lib/auth"
import { getOnboardingContent } from "@/app/lib/onboarding";
import OnboardingGate from "@/components/onboarding/OnboardingGate";

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, currentUser, onboarding] = await Promise.all([
    isAuthenticated(),
    getCurrentUser(),
    getOnboardingContent()
  ]) 
  
  // console.log('RootLayout - currentUser:', currentUser);
  // console.log('RootLayout - isLoggedIn:', isLoggedIn);

  return (
    <div>
        <OnboardingGate title={onboarding.title} paragraphs={onboarding.paragraphs} />
        <Navbar currentUser={currentUser} isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout
