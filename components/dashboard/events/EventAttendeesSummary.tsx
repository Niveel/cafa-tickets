import React from 'react';
import { Users, CheckCircle, XCircle, Percent } from 'lucide-react';
import { EventAttendees } from '@/types/dash-events.types';

type Props = {
    summary: EventAttendees['summary'];
};

const EventAttendeesSummary = ({ summary }: Props) => {
    const cards = [
        {
            title: 'Total Attendees',
            value: summary.total_attendees,
            icon: Users,
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            subtitle: 'Ticket holders'
        },
        {
            title: 'Checked In',
            value: summary.checked_in,
            icon: CheckCircle,
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            subtitle: 'At the event'
        },
        {
            title: 'Not Checked In',
            value: summary.not_checked_in,
            icon: XCircle,
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            subtitle: 'Still pending'
        },
        {
            title: 'Attendance Rate',
            value: `${summary.check_in_percentage.toFixed(1)}%`,
            icon: Percent,
            iconBg: 'bg-accent/20',
            iconColor: 'text-accent-50',
            subtitle: 'Check-in progress'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                
                return (
                    <div 
                        key={index}
                        className="bg-primary rounded-xl p-6 border-2 border-accent/30 hover:border-accent transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="normal-text-2 text-slate-300 font-medium mb-2">
                                    {card.title}
                                </p>
                                <h3 className="big-text-2 font-bold text-white mb-1">
                                    {card.value}
                                </h3>
                                <p className="small-text text-slate-400">
                                    {card.subtitle}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-6 h-6 ${card.iconColor}`} aria-hidden="true" />
                            </div>
                        </div>

                        {/* Progress Bar for Attendance Rate */}
                        {index === 3 && (
                            <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden">
                                <div 
                                    className="h-full bg-linear-to-r from-accent to-accent-100 rounded-full transition-all duration-500"
                                    style={{ width: `${summary.check_in_percentage}%` }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EventAttendeesSummary;