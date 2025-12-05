import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import {EventsPageContent} from '@/components';

const EventsPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
        }>
            <EventsPageContent />
        </Suspense>
    );
};

export default EventsPage;