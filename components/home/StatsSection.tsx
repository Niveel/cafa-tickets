import React from 'react';
import { Users, Ticket, Calendar, CheckCircle } from 'lucide-react';
import { PublicStats } from '@/types/general.types';

interface StatsSectionProps {
    stats: PublicStats['data'] | null;
}

// ✅ Helper function to format large numbers
const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
    }
    return num.toString();
};

const StatsSection = ({ stats }: StatsSectionProps) => {
    if (!stats) return null;

    const statCards = [
        {
            icon: Calendar,
            value: formatNumber(stats.overview.total_upcoming_events), // ✅ Format number
            label: 'Upcoming Events',
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500/30'
        },
        {
            icon: Ticket,
            value: formatNumber(stats.overview.total_tickets_sold), // ✅ Format number
            label: 'Tickets Sold',
            color: 'text-accent-50',
            bgColor: 'bg-accent/20',
            borderColor: 'border-accent/30'
        },
        {
            icon: Users,
            value: formatNumber(stats.overview.total_organizers), // ✅ Format number
            label: 'Event Organizers',
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20',
            borderColor: 'border-purple-500/30'
        },
        {
            icon: CheckCircle,
            value: formatNumber(stats.overview.total_attendees_checked_in), // ✅ Format number
            label: 'Attendees Checked In',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/20',
            borderColor: 'border-emerald-500/30'
        }
    ];

    return (
        <section className="py-20 bg-primary-100">
            <div className="inner-wrapper">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="big-text-1 font-bold text-white mb-4">
                        Join Ghana&apos;s Growing Events Community
                    </h2>
                    <p className="big-text-5 text-slate-200 max-w-2xl mx-auto">
                        Thousands of event-goers and organizers trust our platform every day
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-6 bg-primary rounded-2xl border-2 ${stat.borderColor} hover:border-accent transition-all duration-300 hover:scale-105`}
                        >
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
                            </div>
                            <div className="massive-text font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="normal-text text-slate-300">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Highlights */}
                {stats.overview.active_events_now > 0 && (
                    <div className="mt-8 p-6 bg-accent/10 border-2 border-accent/30 rounded-2xl text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="big-text-4 font-bold text-white">
                                {stats.overview.active_events_now} Event{stats.overview.active_events_now !== 1 ? 's' : ''} Happening Right Now!
                            </span>
                        </div>
                        <p className="normal-text text-slate-300">
                            Check out what&apos;s happening live on our platform
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StatsSection;