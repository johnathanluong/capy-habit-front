'use server';
import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { getAuthToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_GACHA_URL = `${DJANGO_API_ENDPOINT}/gacha`;

export async function POST(request: Request) {
	const authToken = await getAuthToken();
	if (!authToken) {
		return NextResponse.json({ error: 'No auth token found' }, { status: 401 });
	}

	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		};

		const data: Response = await apiFetch(`${BACKEND_GACHA_URL}/pull`, options);
		return NextResponse.json({ data }, { status: 200 });
	} catch (e) {
		console.error('Pull failed:', e);
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
