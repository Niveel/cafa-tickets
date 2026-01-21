// app/api/banks/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country') || 'ghana';
        
        const response = await fetch(
            `https://api.paystack.co/bank?country=${country}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
                next: { revalidate: 86400 },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch banks from Paystack');
        }

        const data = await response.json();

        if (data.status && data.data) {
            // ✅ Remove duplicates by bank code (unique identifier)
            const uniqueBanks = new Map();
            
            data.data.forEach((bank: any) => {
                if (!uniqueBanks.has(bank.code)) {
                    uniqueBanks.set(bank.code, {
                        name: bank.name,
                        code: bank.code,
                        country: bank.country || country,
                        currency: bank.currency,
                        type: bank.type,
                        active: bank.active,
                    });
                }
            });

            const banks = Array.from(uniqueBanks.values());

            return NextResponse.json({
                success: true,
                banks,
                count: banks.length,
            });
        } else {
            throw new Error('Invalid response from Paystack');
        }
    } catch (error) {
        console.error('❌ Failed to fetch banks:', error);
        
        return NextResponse.json({
            success: true,
            banks: [
                { name: 'Absa Bank Ghana Limited', code: '030100', country: 'ghana' },
                { name: 'Access Bank Ghana Plc', code: '280100', country: 'ghana' },
                { name: 'GCB Bank Limited', code: '040100', country: 'ghana' },
                { name: 'Ecobank Ghana Limited', code: '130100', country: 'ghana' },
                { name: 'Fidelity Bank Ghana Limited', code: '240100', country: 'ghana' },
            ],
            fallback: true,
        });
    }
}