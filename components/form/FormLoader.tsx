interface FormLoaderProps {
    visible: boolean;
    message?: string;
}

const FormLoader = ({ visible, message = "Processing..." }: FormLoaderProps) => {
    if (!visible) return null;

    return (
        <div 
            className="fixed inset-0 bg-primary/90 backdrop-blur-sm flex items-center justify-center z-10000"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loading-message"
        >
            <div className="bg-primary-100 rounded-2xl p-8 shadow-2xl max-w-sm mx-4 border-2 border-accent">
                <div className="flex flex-col items-center gap-6">
                    {/* Unique Pulse Animation */}
                    <div className="relative w-20 h-20">
                        {/* Outer pulsing ring */}
                        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
                        
                        {/* Middle rotating ring */}
                        <div className="absolute inset-2 rounded-full border-4 border-accent/30 border-t-accent animate-spin"></div>
                        
                        {/* Inner dot pulse */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                        </div>
                        
                        {/* Rotating dots */}
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-50"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-50"></div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-50"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-50"></div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center space-y-2">
                        <p 
                            id="loading-message"
                            className="big-text-5 font-bold text-white"
                        >
                            {message}
                        </p>
                        <p className="small-text text-slate-300">
                            Please wait a moment
                        </p>
                    </div>

                    {/* Animated Progress Dots */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-50 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-accent-50 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-accent-50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLoader;