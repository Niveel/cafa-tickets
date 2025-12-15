import Link from 'next/link';
import { AlertCircle, Home, Calendar } from 'lucide-react';

const EventNotFound = () => {
    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-red-400" aria-hidden="true" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="big-text-1 font-bold text-white mb-4">
                    Event Not Found
                </h1>

                {/* Description */}
                <p className="big-text-5 text-slate-200 mb-8">
                    The event you&apos;re looking for doesn&apos;t exist or may have been deleted by the organizer.
                </p>

                {/* Suggestions */}
                <div className="bg-primary-100 rounded-2xl p-6 border border-accent/30 mb-8">
                    <p className="normal-text text-slate-300 mb-4">
                        Here are some things you can try:
                    </p>
                    <ul className="space-y-2 text-left">
                        <li className="flex items-start gap-3">
                            <span className="text-accent-50 mt-1">•</span>
                            <span className="normal-text-2 text-slate-300">
                                Check the URL for typos
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent-50 mt-1">•</span>
                            <span className="normal-text-2 text-slate-300">
                                The event may have ended and been removed
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent-50 mt-1">•</span>
                            <span className="normal-text-2 text-slate-300">
                                The organizer may have cancelled the event
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/events"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all"
                    >
                        <Calendar className="w-5 h-5" aria-hidden="true" />
                        Browse Events
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-semibold normal-text transition-all"
                    >
                        <Home className="w-5 h-5" aria-hidden="true" />
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default EventNotFound;