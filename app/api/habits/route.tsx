'use server';

import { getAuthToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_HABIT_URL = 'http://127.0.0.1:8000/api/habits/';

export async function GET() {
	const authToken = await getAuthToken();
	if (!authToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		};

		const res = await fetch(BACKEND_HABIT_URL, options);
		const data = await res.json();

		return NextResponse.json(data, { status: res.status });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
