import React from 'react';
import { LucideIcon } from 'lucide-react';

type Props = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    subtitle?: string;
    iconBgColor?: string;
    iconColor?: string;
};

const DashboardMetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    subtitle,
    iconBgColor = 'bg-accent/20',
    iconColor = 'text-accent-50'
}: Props) => {
    return (
        <div className="bg-primary rounded-xl p-4 border-2 border-accent/30 hover:border-accent transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="normal-text-2 text-slate-300 font-medium mb-1">
                        {title}
                    </p>
                    <h3 className="big-text-2 font-bold text-white mb-1">
                        {value}
                    </h3>
                    {subtitle && (
                        <p className="small-text text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} aria-hidden="true" />
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2 pt-3 border-t border-accent/20">
                    <div className={`flex items-center gap-1 small-text font-semibold ${
                        trend.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                        <span>{trend.isPositive ? '↑' : '↓'}</span>
                        <span>{trend.value}</span>
                    </div>
                    <span className="small-text text-slate-400">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default DashboardMetricCard;