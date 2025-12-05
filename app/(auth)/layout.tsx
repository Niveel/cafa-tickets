import { Navbar, Footer } from "@/components"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default AuthLayout