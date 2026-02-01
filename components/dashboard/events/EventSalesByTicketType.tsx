import React from 'react';
import { Ticket } from 'lucide-react';

import { MyEventAnalytics } from '@/types/dash-events.types';

type Props = {
    salesByTicketType: MyEventAnalytics['sales_by_ticket_type'];
};

const EventSalesByTicketType = ({ salesByTicketType }: Props) => {
    return (
        <div role="region" aria-label="Sales by ticket type" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white">
                    Sales by Ticket Type
                </h2>
            </div>

            {/* Ticket Types */}
            <div className="space-y-6">
                {salesByTicketType.map((ticketType, index) => (
                    <div key={index} className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="big-text-5 font-bold text-white">
                                    {ticketType.ticket_type}
                                </p>
                                <p className="small-text text-slate-400">
                                    GH₵ {parseFloat(ticketType.price).toLocaleString('en-GH')} per ticket
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="big-text-5 font-bold text-white">
                                    {ticketType.tickets_sold}/{ticketType.total_quantity}
                                </p>
                                <p className="small-text text-slate-400">
                                    tickets sold
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="small-text text-slate-400">Quantity Sold</p>
                                <p className="small-text font-semibold text-blue-400">
                                    {ticketType.percentage_of_quantity_sold.toFixed(1)}%
                                </p>
                            </div>
                            <div className="w-full bg-primary-100 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                    style={{ width: `${ticketType.percentage_of_quantity_sold}%` }}
                                />
                            </div>
                        </div>

                        {/* Revenue Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                <p className="small-text text-slate-400 mb-1">Revenue</p>
                                <p className="big-text-5 font-bold text-emerald-400">
                                    GH₵ {parseFloat(ticketType.revenue).toLocaleString('en-GH')}
                                </p>
                            </div>
                            <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                <p className="small-text text-slate-400 mb-1">% of Total Sales</p>
                                <p className="big-text-5 font-bold text-accent-50">
                                    {ticketType.percentage_of_total_sales.toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        {index < salesByTicketType.length - 1 && (
                            <div className="border-t border-accent/20 pt-6"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventSalesByTicketType;