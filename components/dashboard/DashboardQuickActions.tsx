"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { dashboardActions as actions } from '@/data/static.dashboard';
import { useAlertModal } from '@/contexts/AlertModalContext';

type Props = {
    canCreateEvent: boolean;
};

const DashboardQuickActions = ({ canCreateEvent }: Props) => {
    const router = useRouter();
    const { showConfirm } = useAlertModal();

    const handleCreateEventClick = () => {
        if (canCreateEvent) {
            router.push('/dashboard/events/create');
            return;
        }

        showConfirm({
            title: 'Identity Verification Required',
            message: 'You need to complete identity verification before creating an event.',
            confirmText: 'Start Verification',
            cancelText: 'Cancel',
            variant: 'info',
            onConfirm: () => router.push('/dashboard/profile/verify'),
        });
    };

    return (
        <div role='region' className="space-y-4 p-2">
            <h2 className="big-text-3 font-bold text-white">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    const isCreateEventAction = action.href === '/dashboard/events/create';
                    
                    return (
                        isCreateEventAction ? (
                            <button
                                key={index}
                                type="button"
                                onClick={handleCreateEventClick}
                                className="group text-left bg-primary rounded-xl p-4 border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
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
                            </button>
                        ) : (
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
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardQuickActions;
