'use server';
import { apiFetch } from '@/lib/apiFetch';
import { setAuthToken, setRefreshToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_LOGIN_URL = 'http://127.0.0.1:8000/api/token/pair';

interface POSTResponse {
	username: string;
	access: string;
	refresh: string;
}

export async function POST(request: Request) {
	try {
		const requestData = await request.json();
		const body = JSON.stringify(requestData);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		};

		const data: POSTResponse = await apiFetch(BACKEND_LOGIN_URL, options);

		const { username, access, refresh } = data;

		await setAuthToken(access);
		await setRefreshToken(refresh);

		return NextResponse.json({ loggedIn: true, username: username }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ loggedIn: false, username: (e as Error).message }, { status: 400 });
	}
}
