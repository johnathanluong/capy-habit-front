'use server';
import { getAuthToken, getRefreshToken, setAuthToken, setRefreshToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_LOGIN_URL = 'http://127.0.0.1:8000/api/token/refresh';

export async function POST() {
	const refreshToken = await getRefreshToken();
	const authToken = await getAuthToken();
	if (!refreshToken || !authToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refresh: refreshToken })
	};

	const res = await fetch(BACKEND_LOGIN_URL, requestOptions);

	if (!res.ok) {
		console.error('Invalid refresh token');
		return NextResponse.json({ error: res.statusText }, { status: res.status });
	}

	const data = await res.json();
	const { access, refreshToken: newRefreshToken } = data;
	if (!access) {
		console.error('No auth token in response');
		return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
	}

	await setAuthToken(access);

	if (newRefreshToken) {
		await setRefreshToken(refreshToken);
	}

	return NextResponse.json({}, { status: 200 });
}
