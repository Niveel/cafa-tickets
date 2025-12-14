import { Suspense } from "react"
import { LoginForm } from "@/components"

const LoginPage = () => {
    return (
        <main className="bg-primary text-white py-12">
            <section>
                <div className="inner-wrapper">
                    <Suspense fallback={<LoginFormSkeleton />}>
                        <LoginForm />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}

const LoginFormSkeleton = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="animate-pulse">
                <div className="h-12 bg-primary-100 rounded-xl mb-4"></div>
                <div className="h-32 bg-primary-100 rounded-xl mb-4"></div>
                <div className="h-12 bg-primary-100 rounded-xl"></div>
            </div>
        </div>
    )
}

export default LoginPage