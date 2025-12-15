import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import {EventsPageContent} from '@/components';
import { getEventCategories } from '@/app/lib/general';

const EventsPage = async () => {
    const categories = await getEventCategories();

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
        }>
            <EventsPageContent categories={categories} />
        </Suspense>
    );
};

export default EventsPage;