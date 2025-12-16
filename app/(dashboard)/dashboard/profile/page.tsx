import { redirect } from "next/navigation";

import { 
    ProfileHeader,
    ProfileNotificationSettings,
    ProfileAccountDetails,
    ProfileQuickActions,
} from "@/components";
import { getCurrentUser } from "@/app/lib/auth";

const DashboardProfilePage = async () => {
    const currentUser = await getCurrentUser();

    // Redirect if not logged in
    if (!currentUser) {
        redirect("/login");
    }

    return (
        <main className='dash-page space-y-8'>
            {/* Profile Header */}
            <ProfileHeader user={currentUser} />

            {/* Two Column Layout - Quick Actions & Account Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileQuickActions />
                <ProfileAccountDetails user={currentUser} />
            </div>
            
            {/* Notification Settings */}
            <ProfileNotificationSettings settings={currentUser.settings} />
        </main>
    );
};

export default DashboardProfilePage;