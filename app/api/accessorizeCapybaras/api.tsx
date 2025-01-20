'use server';

import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { getAuthToken } from '@/lib/auth';

const BACKEND_HABIT_URL = `${DJANGO_API_ENDPOINT}/habits`;

export async function accessorizeHabitAPI(habitID: number, accessoryID: number) {
	const authToken = await getAuthToken();
	if (!authToken) {
		console.error('Auth token invalid');
	}
	if (!habitID) {
		console.error('Habit ID not passed');
	}
	if (!accessoryID) {
		console.error('Accessory ID not passed');
	}

	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify({ accessory_id: accessoryID })
		};

		await apiFetch(`${BACKEND_HABIT_URL}/${habitID}/accessory`, options);
	} catch (e) {
		console.error('Habit accessorization failed:', e);
	}
}
