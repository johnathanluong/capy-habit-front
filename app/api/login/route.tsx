'use server';
import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { setAuthToken, setRefreshToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_LOGIN_URL = `${DJANGO_API_ENDPOINT}/users/login`;

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
		return NextResponse.json({ loggedIn: false, error: (e as Error).message }, { status: 400 });
	}
}
