import React from 'react';
import Image from "next/image";
import { placeholderPic } from "@/data/constants";
import { CurrentUser } from '@/types/general.types';

type Props = {
    user: CurrentUser | null;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
    return (
        <div
            tabIndex={0}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
            role="region"
            aria-label={`User profile: ${user?.username}`}
        >
            <Image
                src={user?.profile_image || placeholderPic}
                alt={`${user?.full_name}'s profile picture`}
                width={70}
                height={70}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shadow-md bg-white"
                draggable={false}
            />
            <div className="hidden md:block">
                <h3 className="text-sm font-semibold truncate text-white">
                    @{user?.username}
                </h3>
                <p className="text-xs text-blue-100 truncate max-w-[150px]">
                    {user?.email}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;