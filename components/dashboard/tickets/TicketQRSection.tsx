import React from 'react';
import Image from 'next/image';
import { TicketDetails } from '@/types/tickets.types';
import { QrCode, Info } from 'lucide-react';

type Props = {
    ticket: TicketDetails;
};

const TicketQRSection = ({ ticket }: Props) => {
    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        QR Code
                    </h2>
                    <p className="small-text text-slate-400">
                        Show this at the venue
                    </p>
                </div>
            </div>

            {/* QR Code */}
            <div className="relative aspect-square w-full bg-white rounded-xl p-4 mb-4">
                <Image
                    src={ticket.qr_code}
                    alt={`QR Code for ticket ${ticket.ticket_id}`}
                    fill
                    className="object-contain p-2"
                />
            </div>

            {/* Info Note */}
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="small-text text-blue-300">
                        Present this QR code at the event entrance for check-in. Make sure your screen brightness is high enough.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TicketQRSection;