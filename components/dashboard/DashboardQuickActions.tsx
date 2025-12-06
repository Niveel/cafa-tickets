import Link from 'next/link';

import { dashboardActions as actions } from '@/data/static.dashboard';

const DashboardQuickActions = () => {

    return (
        <div role='region' className="space-y-4 p-2">
            <h2 className="big-text-3 font-bold text-white">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    
                    return (
                        <Link
                            key={index}
                            href={action.href}
                            className="group bg-primary rounded-xl p-4 border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="big-text-5 font-bold text-white mb-1">
                                {action.title}
                            </h3>
                            <p className="small-text text-slate-300">
                                {action.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardQuickActions;