export const getTicketTheme = (ticketName: string): { 
    gradient: string; 
    border: string; 
    badge: string;
    icon: string;
} => {
    const name = ticketName.toLowerCase();
    
    if (name.includes('vip') || name.includes('premium')) {
        return {
            gradient: 'from-amber-500 to-yellow-600',
            border: 'border-amber-500',
            badge: 'bg-amber-500/20 text-amber-200 border-amber-400',
            icon: 'text-amber-300'
        };
    }
    
    if (name.includes('early') || name.includes('bird')) {
        return {
            gradient: 'from-emerald-500 to-green-600',
            border: 'border-emerald-500',
            badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400',
            icon: 'text-emerald-300'
        };
    }
    
    if (name.includes('regular') || name.includes('standard') || name.includes('general')) {
        return {
            gradient: 'from-accent to-accent-100',
            border: 'border-accent',
            badge: 'bg-accent/20 text-accent-50 border-accent',
            icon: 'text-accent-50'
        };
    }
    
    if (name.includes('student') || name.includes('discount')) {
        return {
            gradient: 'from-blue-500 to-indigo-600',
            border: 'border-blue-500',
            badge: 'bg-blue-500/20 text-blue-200 border-blue-400',
            icon: 'text-blue-300'
        };
    }
    
    // Default theme
    return {
        gradient: 'from-purple-500 to-indigo-600',
        border: 'border-purple-500',
        badge: 'bg-purple-500/20 text-purple-200 border-purple-400',
        icon: 'text-purple-300'
    };
};

export const formatImageUrls = (arr: string[]) => arr.map(img => img.startsWith('http') ? img : `http://localhost:8000${img}`);

export const sanitizeImgUrl = (url: string): string => {
    if (!url) return '';
    
    // Check if it's a malformed media URL with embedded external URL
    if (url.includes('/media/https%3A') || url.includes('/media/http%3A')) {
        // Extract everything after '/media/'
        const afterMedia = url.split('/media/')[1];
        // Decode the URL-encoded string
        const decoded = decodeURIComponent(afterMedia);
        // Fix any malformed protocol (https%3A/ -> https://)
        return decoded.replace(/^(https?):\/([^/])/, '$1://$2');
    }
    
    // If it's already a valid external URL (Unsplash, Cloudinary, etc.)
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    // If it's a relative media URL (uploaded images)
    if (url.startsWith('/media/')) {
        return `http://localhost:8000${url}`;
    }
    
    return url;
};