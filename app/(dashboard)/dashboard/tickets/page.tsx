import { Metadata } from 'next';
import { myTickets } from '@/data/dummy.tickets';
import { MyTicketsContent } from '@/components';

type Props = {
    searchParams: Promise<{
        status?: string;
        search?: string;
        category?: string;
        page?: string;
    }>;
};

export const metadata: Metadata = {
    title: 'My Tickets | Cafa Tickets',
    description: 'View and manage all your purchased event tickets. Download tickets, check event details, and track your attendance.',
    keywords: ['my tickets', 'purchased tickets', 'event tickets Ghana', 'ticket downloads'],
};

const MyTicketsPage = async ({ searchParams }: Props) => {
    const params = await searchParams;
    
    // In production, fetch from API with filters
    // const tickets = await fetchMyTickets(params);
    const tickets = myTickets;

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <MyTicketsContent 
                    tickets={tickets} 
                    searchParams={params}
                />
            </div>
        </main>
    );
};

export default MyTicketsPage;