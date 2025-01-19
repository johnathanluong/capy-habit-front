'use server';

import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { getAuthToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_HABIT_URL = `${DJANGO_API_ENDPOINT}/habits`;

// Get user's habits
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
		const data = await apiFetch(BACKEND_HABIT_URL, options);

		return NextResponse.json({ data: data }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}

interface Response {
	id: number;
	name: string;
	description: string;
	category?: string;
	frequency: number;
	frequency_type: string;
	grace_period: number;
	streak: number;
	created: string; // ISO datetime string
	modified: string; // ISO datetime string
}
// Create habit
export async function POST(request: Request) {
	const authToken = await getAuthToken();
	if (!authToken) {
		return NextResponse.json({ error: 'No auth token found' }, { status: 401 });
	}

	try {
		const requestData = await request.json();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(requestData)
		};

		const data: Response = await apiFetch(`${BACKEND_HABIT_URL}/create`, options);
		return NextResponse.json({ habit: data }, { status: 200 });
	} catch (e) {
		console.error('Habit creation failed:', e);
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
