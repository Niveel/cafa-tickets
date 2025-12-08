import React from 'react';
import { CheckCircle, XCircle, Mail, Phone } from 'lucide-react';
import { EventAttendees } from '@/types/dash-events.types';

type Attendee = EventAttendees['results'][0];

type Props = {
    attendees: Attendee[];
};

const EventAttendeesTable = ({ attendees }: Props) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPaymentStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'pending':
                return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    if (attendees.length === 0) {
        return (
            <div role="region" aria-label="Attendees list" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <h2 className="big-text-3 font-bold text-white mb-3">
                    No Attendees Found
                </h2>
                <p className="normal-text text-slate-300">
                    No attendees match your current filters.
                </p>
            </div>
        );
    }

    return (
        <div role="region" aria-label="Attendees list" className="bg-primary rounded-xl p-6 border-2 border-accent/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-accent/20">
                            <th className="text-left py-3 px-2 small-text text-slate-400 font-semibold">
                                Attendee
                            </th>
                            <th className="text-left py-3 px-2 small-text text-slate-400 font-semibold">
                                Contact
                            </th>
                            <th className="text-left py-3 px-2 small-text text-slate-400 font-semibold">
                                Ticket Type
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Amount
                            </th>
                            <th className="text-center py-3 px-2 small-text text-slate-400 font-semibold">
                                Payment
                            </th>
                            <th className="text-center py-3 px-2 small-text text-slate-400 font-semibold">
                                Check-in
                            </th>
                            <th className="text-left py-3 px-2 small-text text-slate-400 font-semibold">
                                Purchase Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map((attendee, index) => (
                            <tr 
                                key={index}
                                className="border-b border-accent/10 hover:bg-primary-200 transition-colors duration-200"
                            >
                                {/* Attendee Name */}
                                <td className="py-4 px-2">
                                    <div>
                                        <p className="normal-text-2 font-semibold text-white">
                                            {attendee.attendee_name}
                                        </p>
                                        <p className="small-text text-slate-400 font-mono">
                                            {attendee.ticket_id}
                                        </p>
                                    </div>
                                </td>

                                {/* Contact */}
                                <td className="py-4 px-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                            <p className="small-text text-slate-300">
                                                {attendee.attendee_email}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                            <p className="small-text text-slate-300">
                                                {attendee.attendee_phone}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Ticket Type */}
                                <td className="py-4 px-2">
                                    <div>
                                        <p className="normal-text-2 font-semibold text-white">
                                            {attendee.ticket_type.name}
                                        </p>
                                        <p className="small-text text-slate-400">
                                            GH₵ {parseFloat(attendee.ticket_type.price).toLocaleString('en-GH')}
                                        </p>
                                    </div>
                                </td>

                                {/* Amount Paid */}
                                <td className="py-4 px-2 text-right">
                                    <p className="normal-text-2 font-bold text-emerald-400">
                                        GH₵ {parseFloat(attendee.amount_paid).toLocaleString('en-GH')}
                                    </p>
                                    <p className="small-text text-slate-400 font-mono">
                                        {attendee.payment_reference}
                                    </p>
                                </td>

                                {/* Payment Status */}
                                <td className="py-4 px-2 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-lg font-semibold small-text border capitalize ${getPaymentStatusBadge(attendee.payment_status)}`}>
                                        {attendee.payment_status}
                                    </span>
                                </td>

                                {/* Check-in Status */}
                                <td className="py-4 px-2 text-center">
                                    {attendee.is_checked_in ? (
                                        <div className="inline-flex flex-col items-center">
                                            <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" aria-hidden="true" />
                                            <p className="small-text text-emerald-400">
                                                {attendee.checked_in_at && formatDate(attendee.checked_in_at)}
                                            </p>
                                            {attendee.checked_in_by && (
                                                <p className="small-text-2 text-slate-400">
                                                    by {attendee.checked_in_by}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="inline-flex flex-col items-center">
                                            <XCircle className="w-6 h-6 text-slate-400 mb-1" aria-hidden="true" />
                                            <p className="small-text text-slate-400">
                                                Not checked in
                                            </p>
                                        </div>
                                    )}
                                </td>

                                {/* Purchase Date */}
                                <td className="py-4 px-2">
                                    <p className="normal-text-2 text-slate-300">
                                        {formatDate(attendee.purchase_date)}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventAttendeesTable;