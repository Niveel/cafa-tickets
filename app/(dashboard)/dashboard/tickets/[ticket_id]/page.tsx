import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TicketDetailsContent } from '@/components';
import { getMyTicketDetails } from '@/app/lib/dashboard';

type Props = {
    params: Promise<{ ticket_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { ticket_id } = await params;
    return {
        title: `Ticket ${ticket_id} | Cafa Tickets`,
        description: 'View your ticket details, QR code, and event information.',
    };
}

const MyTicketDetailsPage = async ({ params }: Props) => {
    const { ticket_id } = await params;
    
    const ticket = await getMyTicketDetails(ticket_id);

    if (!ticket) {
        return (
            <main className="dash-page">
                <div className="inner-wrapper">
                    <div className="text-center py-12">
                        <h1 className="big-text-2 font-bold text-white mb-3">
                            Ticket Not Found
                        </h1>
                        <p className="normal-text text-slate-300 mb-6">
                            This ticket doesn&apos;t exist or you don&apos;t have access to it.
                        </p>
                        <Link
                            href="/dashboard/tickets"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            Back to My Tickets
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="dash-page">
            <div className="inner-wrapper space-y-6">
                <Link
                    href="/dashboard/tickets"
                    className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back to My Tickets
                </Link>

                <TicketDetailsContent ticket={ticket} />
            </div>
        </main>
    );
};

export default MyTicketDetailsPage;