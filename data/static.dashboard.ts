import { Plus, Search, Calendar } from 'lucide-react';

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

// for payment profile
export const networkOptions = [
    { value: '', label: 'Select Network' },
    { value: 'MTN', label: 'MTN Mobile Money' },
    { value: 'Vodafone', label: 'Vodafone Cash' },
    { value: 'AirtelTigo', label: 'AirtelTigo Money' }
];

export const bankOptions = [
    { value: '', label: 'Select Bank' },
    { value: 'CAL Bank', label: 'CAL Bank' },
    { value: 'GCB Bank', label: 'GCB Bank Limited' },
    { value: 'Ecobank Ghana', label: 'Ecobank Ghana' },
    { value: 'Standard Chartered', label: 'Standard Chartered Bank Ghana' },
    { value: 'Fidelity Bank', label: 'Fidelity Bank Ghana' },
    { value: 'Absa Bank', label: 'Absa Bank Ghana' },
    { value: 'Zenith Bank', label: 'Zenith Bank Ghana' },
    { value: 'Stanbic Bank', label: 'Stanbic Bank Ghana' }
];

export const bankCodeOptions = [
    { value: '', label: 'Select Bank Code' },
    { value: 'CAL', label: 'CAL' },
    { value: 'GCB', label: 'GCB' },
    { value: 'ECO', label: 'ECO' },
    { value: 'SCB', label: 'SCB' },
    { value: 'FID', label: 'FID' },
    { value: 'ABS', label: 'ABS' },
    { value: 'ZEN', label: 'ZEN' },
    { value: 'SBG', label: 'SBG' }
];