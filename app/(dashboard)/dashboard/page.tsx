import { redirect } from 'next/navigation';
import { 
    DashboardOverview, 
    DashboardQuickActions,
    DashboardRecentActivity,
    DashboardTicketsByCategory,
    DashboardBestSellingEvent,
    DashboardRevenueChart 
} from "@/components";
import { getUserStats } from "@/app/lib/dashboard";
import { getCurrentUser } from "@/app/lib/auth";

const DashboardPage = async () => {
    const [userStats, currentUser] = await Promise.all([
        getUserStats(),
        getCurrentUser(),
    ]);

    // Redirect if no stats (no token)
    if (!userStats) {
        redirect('/login?redirect=/dashboard');
    }


    return (
        <main className='dash-page space-y-6'>
            {/* Overview Section */}
            <DashboardOverview stats={userStats} />

            {/* Quick Actions */}
            <DashboardQuickActions canCreateEvent={!!currentUser?.is_organizer} />

            {/* Two Column Layout - Activity & Tickets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DashboardRecentActivity activities={userStats.recent_activity} />
                <DashboardTicketsByCategory 
                    ticketsByCategory={userStats?.purchasing_stats.tickets_by_category}
                    totalSpent={userStats?.purchasing_stats.total_spent}
                />
            </div>

            {/* Two Column Layout - Best Selling Event & Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardBestSellingEvent 
                    bestSellingEvent={userStats.organizing_stats.best_selling_event}
                    totalTicketsSold={userStats.organizing_stats.total_tickets_sold}
                />
                <DashboardRevenueChart 
                    revenueData={userStats.organizing_stats.revenue_by_month}
                    totalRevenue={userStats.organizing_stats.total_revenue}
                />
            </div>
        </main>
    );
};

export default DashboardPage;
