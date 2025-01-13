'use server';
import { apiFetch } from '@/lib/apiFetch';
import { NextResponse } from 'next/server';

const BACKEND_REGISTER_URL = 'http://127.0.0.1:8000/api/users/register';

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

		const data = await apiFetch(BACKEND_REGISTER_URL, options);

		return NextResponse.json({}, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 400 });
	}
}
