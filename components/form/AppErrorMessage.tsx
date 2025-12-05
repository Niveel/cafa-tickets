import { AlertCircle } from 'lucide-react';

type Props = {
    error?: string;
    visible?: boolean;
}

const AppErrorMessage = ({ error, visible }: Props) => {
    if (!error || !visible) return null;

    return (
        <div 
            className='flex items-start gap-2 bg-red-50 border-2 border-red-500 rounded-lg p-3'
            role='alert'
            aria-live='polite'
        >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <p className='small-text text-red-600 font-semibold leading-tight'>
                {error}
            </p>
        </div>
    );
}

export default AppErrorMessage;