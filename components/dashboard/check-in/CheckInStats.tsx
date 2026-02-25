import React from 'react';
import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';

import { MyEvent } from '@/types/dash-events.types';

type Props = {
    event: MyEvent;
};

const CheckInStats = ({ event }: Props) => {
    const checkedInCount = event.analytics.tickets_checked_in;
    const totalSold = event.analytics.tickets_sold;
    const notCheckedIn = totalSold - checkedInCount;
    const percentage = totalSold > 0 ? (checkedInCount / totalSold * 100).toFixed(1) : 0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Sold */}
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <p className="normal-text-2 text-slate-400">Total Sold</p>
                </div>
                <p className="big-text-1 font-bold text-white">
                    {totalSold}
                </p>
            </div>

            {/* Checked In */}
            <div className="bg-primary rounded-xl border-2 border-emerald-500/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <p className="normal-text-2 text-slate-400">Checked In</p>
                </div>
                <p className="big-text-1 font-bold text-emerald-400">
                    {checkedInCount}
                </p>
            </div>

            {/* Pending */}
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <p className="normal-text-2 text-slate-400">Pending</p>
                </div>
                <p className="big-text-1 font-bold text-white">
                    {notCheckedIn}
                </p>
            </div>

            {/* Percentage */}
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <p className="normal-text-2 text-slate-400">Progress</p>
                </div>
                <p className="big-text-1 font-bold text-white">
                    {percentage}%
                </p>
            </div>
        </div>
    );
};

export default CheckInStats;