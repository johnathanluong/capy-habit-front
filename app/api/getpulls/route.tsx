'use server';

import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { getAuthToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_GACHA_URL = `${DJANGO_API_ENDPOINT}/gacha`;

// Get available gacha items
export async function GET() {
	const authToken = await getAuthToken();
	if (!authToken) {
		return NextResponse.json({ error: 'No auth token found' }, { status: 401 });
	}

	try {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken.trim()}`
			}
		};
		const data = await apiFetch(BACKEND_GACHA_URL, options);

		return NextResponse.json({ data }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
