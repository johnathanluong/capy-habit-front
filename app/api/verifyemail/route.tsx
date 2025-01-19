'use server';
import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { NextResponse } from 'next/server';

const BACKEND_VERIFY_URL = `${DJANGO_API_ENDPOINT}/users/verify`;

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

		await apiFetch(BACKEND_VERIFY_URL, options);

		return NextResponse.json({}, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 400 });
	}
}
