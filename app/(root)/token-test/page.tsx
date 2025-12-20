"use client";

import { useState } from "react";

/**
 * Token Testing Page - Simple Version
 * Use this to test token refresh behavior
 * Watch your server terminal (where npm run dev runs) for logs
 */
export default function TokenTestPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>("");

    const testApiCall = async () => {
        setLoading(true);
        setResult("⏳ Making API call... Check your terminal for logs!");

        try {
            // Simple GET request to fetch my events - will trigger all token logs
            const response = await fetch('/api/events/my-events');

            if (response.ok) {
                const data = await response.json();
                setResult(`✅ Success! Status: ${response.status}\n\nReturned ${data?.results?.length || 0} events\n\n🎯 NOW CHECK YOUR SERVER TERMINAL for detailed token logs!\n\nYou should see:\n- 🟢 Token status\n- ⏰ Time remaining\n- 🔄 Refresh if needed`);
            } else {
                const data = await response.json().catch(() => ({ error: 'Unknown error' }));
                setResult(`❌ Failed! Status: ${response.status}\n\nError: ${JSON.stringify(data, null, 2)}\n\n🎯 CHECK YOUR SERVER TERMINAL for logs anyway - they'll show what went wrong!`);
            }
        } catch (error) {
            setResult(`💥 Error: ${error}\n\n🎯 CHECK YOUR SERVER TERMINAL for logs - they'll show the error details!`);
        } finally {
            setLoading(false);
        }
    };

    const testMultipleCalls = async () => {
        setLoading(true);
        setResult("⏳ Making 3 API calls in sequence... Watch your terminal!");

        try {
            // Make 3 calls quickly to test token handling
            for (let i = 1; i <= 3; i++) {
                setResult(prev => `${prev}\n\n🔄 Call ${i}/3...`);
                const response = await fetch('/api/events/my-events');
                const status = response.ok ? '✅' : '❌';
                setResult(prev => `${prev} ${status} ${response.status}`);
                
                // Small delay between calls
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            setResult(prev => `${prev}\n\n✅ All calls complete!\n\n🎯 CHECK YOUR TERMINAL - you should see:\n- Token checked 3 times\n- Only refreshed if needed (not every time)\n- All requests succeeded`);
        } catch (error) {
            setResult(prev => `${prev}\n\n💥 Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-200 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-primary rounded-2xl border-2 border-accent/30 p-8">
                    <h1 className="big-text-3 font-bold text-white mb-2">
                        🧪 Token Refresh Testing
                    </h1>
                    <p className="normal-text text-slate-300 mb-6">
                        Click buttons below and watch your server terminal
                    </p>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                        <p className="normal-text font-semibold text-yellow-300 mb-2">
                            ⚠️ IMPORTANT: Where to Look
                        </p>
                        <div className="small-text text-yellow-300 space-y-2">
                            <p>
                                <strong>✅ DO:</strong> Look at your <strong>terminal/command prompt</strong> where you ran <code className="bg-yellow-500/20 px-1 rounded">npm run dev</code>
                            </p>
                            <p>
                                <strong>❌ DON'T:</strong> Look at browser console (F12) - logs won't appear there
                            </p>
                            <p className="mt-3 pt-3 border-t border-yellow-500/30">
                                💡 The terminal will show detailed logs like:
                            </p>
                            <ul className="ml-5 list-disc space-y-1">
                                <li>🟢 Token valid (45m 30s left)</li>
                                <li>🟡 Token expiring soon (refreshing)</li>
                                <li>🔄 Refresh process details</li>
                                <li>✅ Success confirmations</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-primary-100 rounded-xl p-6 border border-accent/20">
                            <h2 className="normal-text-2 font-semibold text-white mb-2">
                                Test 1: Single API Call
                            </h2>
                            <p className="small-text text-slate-300 mb-4">
                                Makes one request to fetch your events. Check terminal for token status.
                            </p>
                            <button
                                onClick={testApiCall}
                                disabled={loading}
                                className="w-full py-3 px-4 bg-accent hover:bg-accent-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '⏳ Testing...' : '🚀 Test Single Call'}
                            </button>
                        </div>

                        <div className="bg-primary-100 rounded-xl p-6 border border-accent/20">
                            <h2 className="normal-text-2 font-semibold text-white mb-2">
                                Test 2: Multiple Calls
                            </h2>
                            <p className="small-text text-slate-300 mb-4">
                                Makes 3 requests in sequence. Good for testing that token only refreshes when needed.
                            </p>
                            <button
                                onClick={testMultipleCalls}
                                disabled={loading}
                                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '⏳ Testing...' : '🔄 Test Multiple Calls'}
                            </button>
                        </div>

                        {result && (
                            <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                                <h3 className="normal-text-2 font-semibold text-white mb-2">
                                    📋 Browser Result:
                                </h3>
                                <pre className="small-text text-slate-300 whitespace-pre-wrap font-mono">
                                    {result}
                                </pre>
                            </div>
                        )}

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mt-6">
                            <p className="small-text font-semibold text-green-300 mb-2">
                                📺 Example Terminal Output (what you should see):
                            </p>
                            <pre className="small-text text-green-400 font-mono overflow-x-auto">
{`╔════════════════════════════════════════╗
║ [2:30:45 PM] AUTHENTICATED API REQUEST ║
╚════════════════════════════════════════╝
🌐 Method: GET
🔗 URL: https://cafaticket.pythonanywhere.com/...

🔐 Checking access token status...
📊 Token Status: 🟢 VALID (45m 30s left)
✅ Token is valid, no refresh needed
📤 Sending request to Django...
📥 Response received in 234ms: 200 OK
════════════════════════════════════════`}
                            </pre>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <p className="small-text text-blue-300">
                                <strong>💡 What the status means:</strong>
                            </p>
                            <ul className="small-text text-blue-300 mt-2 space-y-1 ml-5 list-disc">
                                <li><strong>🟢 VALID</strong> - Token has &gt;2 minutes left, everything normal</li>
                                <li><strong>🟡 EXPIRING SOON</strong> - Token has &lt;2 minutes left, auto-refreshing</li>
                                <li><strong>🔴 EXPIRED</strong> - Token expired, will refresh before request</li>
                            </ul>
                            <p className="small-text text-blue-300 mt-3">
                                You'll mostly see 🟢 VALID because refresh happens automatically before expiry!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}