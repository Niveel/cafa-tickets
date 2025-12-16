import { DashboardNav } from "@/components"
import { getCurrentUser } from "../lib/auth"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser()

    // console.log('Current User in Dashboard Layout:', user)

    return (
        <DashboardNav user={user}>
            {children}
        </DashboardNav>
    )
}

export default DashboardLayout