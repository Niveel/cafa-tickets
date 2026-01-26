import { DashboardSideBar, DashboardTopBar } from "@/components"
import { CurrentUser } from "@/types/general.types"

type Props = {
    children: React.ReactNode,
    user: CurrentUser | null, 
}

const DashboardNav = ({ children, user }: Props) => {
    console.log('Rendering DashboardNav with user image:', user?.profile_image);

    return (
        <div className="min-h-screen p-2 xs:p-4 max-w-[1400px] mx-auto bg-primary text-white">
            <DashboardSideBar />
            <div className="w-full md:w-[calc(100%-14rem)] md:ml-auto h-full flex flex-col gap-4">
                <DashboardTopBar user={user} />
                <div className="w-full flex-1 rounded-xl md:pl-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardNav