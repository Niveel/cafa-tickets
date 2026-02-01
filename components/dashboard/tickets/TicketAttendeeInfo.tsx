import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

import { TicketAttendeeInfo as AttendeeInfoType } from '@/types/tickets.types';

type Props = {
    attendeeInfo: AttendeeInfoType;
};

const TicketAttendeeInfo = ({ attendeeInfo }: Props) => {
    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        Attendee Information
                    </h2>
                    <p className="small-text text-slate-400">
                        Ticket holder details
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Name */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <User className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Full Name</p>
                        <p className="normal-text-2 font-semibold text-white">
                            {attendeeInfo.name}
                        </p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <Mail className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Email Address</p>
                        <p className="normal-text-2 font-semibold text-white">
                            {attendeeInfo.email}
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <Phone className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Phone Number</p>
                        <p className="normal-text-2 font-semibold text-white">
                            {attendeeInfo.phone}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketAttendeeInfo;