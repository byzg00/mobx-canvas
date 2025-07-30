import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}
