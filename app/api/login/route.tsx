'use server';
import { setAuthToken, setRefreshToken } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

const BACKEND_LOGIN_URL = 'http://127.0.0.1:8000/api/token/pair';

interface POSTResponse {
	username: string;
	access: string;
	refresh: string;
}

export async function POST(request: Request) {
	const requestData = await request.json();
	const body = JSON.stringify(requestData);
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: body
	};

	const res = await fetch(BACKEND_LOGIN_URL, requestOptions);
	const data: POSTResponse = await res.json();

	if (!res.ok) {
		console.error('Error logging in:', res.statusText, res.status);
		return NextResponse.json({ loggedIn: false, ...data }, { status: 400 });
	}

	const { username, access, refresh } = data;

	await setAuthToken(access);
	await setRefreshToken(refresh);

	return NextResponse.json({ loggedIn: true, username: username }, { status: 200 });
}
