import { Plus, Search, Calendar, BarChart3 } from 'lucide-react';

type Action = {
    title: string;
    description: string;
    icon: typeof Plus;
    href: string;
    color: string;
};

export const dashboardActions: Action[] = [
        {
            title: 'Create Event',
            description: 'Start organizing a new event',
            icon: Plus,
            href: '/dashboard/events/create',
            color: 'from-accent to-accent-100'
        },
        {
            title: 'Browse Events',
            description: 'Find events to attend',
            icon: Search,
            href: '/events',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'My Events',
            description: 'View your organized events',
            icon: Calendar,
            href: '/dashboard/events',
            color: 'from-purple-500 to-purple-600'
        },
];