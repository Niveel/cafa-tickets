import { DashboardNav } from "@/components"
// import { getCurrentUser } from "../lib/auth"
import { currentUser } from "@/data/dummy.general"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    // const user = await getCurrentUser()

    return (
        <DashboardNav user={currentUser}>
            {children}
        </DashboardNav>
    )
}

export default DashboardLayout