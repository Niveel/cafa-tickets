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
// Complete Ghana bank data with codes
export const ghanaBanks = [
    { name: 'Absa Bank Ghana Limited', code: '030100' },
    { name: 'Access Bank Ghana Plc', code: '280100' },
    { name: 'ADB Bank Limited', code: '080100' },
    { name: 'ARB Apex Bank', code: '070101' },
    { name: 'Bank of Africa Ghana Limited', code: '210100' },
    { name: 'Bank of Ghana', code: '010100' },
    { name: 'CAL Bank Limited', code: '140100' }, // ✅ Fixed - was 401100
    { name: 'Consolidated Bank Ghana Limited', code: '340100' },
    { name: 'Ecobank Ghana Limited', code: '130100' },
    { name: 'FBNBank Ghana Limited', code: '200100' },
    { name: 'Fidelity Bank Ghana Limited', code: '240100' },
    { name: 'First Atlantic Bank Limited', code: '170100' },
    { name: 'First National Bank Ghana Limited', code: '330100' },
    { name: 'GCB Bank Limited', code: '040100' },
    { name: 'Guaranty Trust Bank (Ghana) Limited', code: '230100' },
    { name: 'National Investment Bank Limited', code: '050100' },
    { name: 'OmniBSIC Bank Ghana Limited', code: '360100' },
    { name: 'Prudential Bank Limited', code: '180100' },
    { name: 'Republic Bank (GH) Limited', code: '110100' },
    { name: 'Société Générale Ghana Limited', code: '090100' },
    { name: 'Stanbic Bank Ghana Limited', code: '190100' },
    { name: 'Standard Chartered Bank Ghana Limited', code: '020100' },
    { name: 'United Bank for Africa Ghana Limited', code: '060100' },
    { name: 'Universal Merchant Bank Ghana Limited', code: '100100' },
    { name: 'Zenith Bank Ghana Limited', code: '120100' },
];

// Bank options for dropdown (only names)
export const bankOptions = ghanaBanks.map(bank => ({
    label: bank.name,
    value: bank.name
}));

// Helper function to get bank code from name
export const getBankCodeFromName = (bankName: string): string => {
    const bank = ghanaBanks.find(b => b.name === bankName);
    return bank?.code || '';
};
