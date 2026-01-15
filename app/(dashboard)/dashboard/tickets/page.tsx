import { Metadata } from 'next';

import { MyTicketsContent } from '@/components';
import { fetchMyTickets } from '@/app/lib/dashboard';
import { getEventCategories } from '@/app/lib/general';
import { redirect } from 'next/navigation';

type Props = {
    searchParams: Promise<{
        status?: string;
        search?: string;
        category?: string;
        page?: string;
    }>;
};

export const metadata: Metadata = {
    title: 'My Tickets | Cafa Ticket',
    description: 'View and manage all your purchased event tickets.',
    keywords: ['my tickets', 'purchased tickets', 'event tickets'],
};

const MyTicketsPage = async ({ searchParams }: Props) => {
    const params = await searchParams;
    
    const [tickets, eventCategories] = await Promise.all([
        fetchMyTickets(params),
        getEventCategories(),
    ]);

    // console.log("my fetched tickets", tickets?.results);
    
    if (!tickets) {
        redirect('/login');
    }

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <MyTicketsContent 
                    tickets={tickets} 
                    searchParams={params}
                    eventCategories={eventCategories}
                />
            </div>
        </main>
    );
};

export default MyTicketsPage;