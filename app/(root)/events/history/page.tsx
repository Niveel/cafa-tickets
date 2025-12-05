import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import {EventsHistoryContent} from "@/components"

const EventsHistoryPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
        }>
            <EventsHistoryContent />
        </Suspense>
    );
};

export default EventsHistoryPage;