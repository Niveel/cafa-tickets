import React from 'react';
import { History, User, Clock, Ticket } from 'lucide-react';

type Props = {
    history: any[];
};

const CheckInHistory = ({ history }: Props) => {
    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('en-GH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <History className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h3 className="big-text-4 font-bold text-white">
                        Recent Check-ins
                    </h3>
                    <p className="small-text text-slate-400">
                        Last {history.length} check-in{history.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map((item, index) => (
                    <div 
                        key={index}
                        className="p-4 bg-primary-200 rounded-lg border border-accent/30 hover:border-accent/50 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <p className="normal-text-2 font-bold text-white mb-1">
                                    {item.ticket.attendee_name}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Ticket className="w-3 h-3" aria-hidden="true" />
                                        <span className="small-text font-mono">
                                            {item.ticket.ticket_id}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                        <span className="small-text">
                                            {item.ticket.ticket_type.name}
                                        </span>
                                    </div>

                                    {item.ticket.checked_in_at && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" aria-hidden="true" />
                                            <span className="small-text">
                                                {formatDateTime(item.ticket.checked_in_at)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Badge */}
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg small-text font-semibold border border-emerald-500/30 shrink-0">
                                Checked In
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckInHistory;