// app/api/countries/route.ts
import { NextResponse } from 'next/server';
import { getPaystackCode } from '@/utils/countryDetection';

export async function GET() {
    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name,cca2',
            { next: { revalidate: 86400 } }
        );

        if (!response.ok) throw new Error('Failed to fetch countries');

        const data = await response.json();

        if (Array.isArray(data)) {
            const countries = data
                .map((country: any) => ({
                    name: country.name.common,
                    code: getPaystackCode(country.cca2),
                }))
                .sort((a, b) => a.name.localeCompare(b.name));

            return NextResponse.json({ success: true, countries, count: countries.length });
        }

        throw new Error('Invalid response');
    } catch (error) {
        console.error('❌ Failed to fetch countries:', error);
        
        return NextResponse.json({
            success: true,
            countries: [
                { name: 'Ghana', code: 'ghana' },
                { name: 'Nigeria', code: 'nigeria' },
                { name: 'Kenya', code: 'kenya' },
                { name: 'South Africa', code: 'south-africa' },
            ],
            fallback: true,
        });
    }
}