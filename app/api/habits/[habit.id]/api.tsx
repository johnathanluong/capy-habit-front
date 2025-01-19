import { Habit } from '@/app/interfaces/model';
import { DJANGO_API_ENDPOINT } from '@/config/defaults';
import { apiFetch } from '@/lib/apiFetch';
import { getAuthToken } from '@/lib/auth';
import { convertHabiToFormData } from '@/lib/utils';

const BACKEND_HABIT_URL = `${DJANGO_API_ENDPOINT}/habits`;

export async function updateHabitAPI(updatedHabit: Habit) {
	const authToken = await getAuthToken();
	if (!authToken) {
		console.error('No auth token found');
	}

	if (!updatedHabit.id) {
		console.error('Habit ID not passed');
	}

	try {
		const requestData = convertHabiToFormData(updatedHabit);

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body: JSON.stringify(requestData)
		};

		await apiFetch<Habit>(`${BACKEND_HABIT_URL}/${updatedHabit.id}`, options);
	} catch (e) {
		console.error('Habit modification failed:', e);
	}
}

export const deleteHabitAPI = async (habitId: number) => {
	const authToken = await getAuthToken();
	if (!authToken) {
		console.error('No auth token found');
	}
	if (!habitId) {
		console.error('Habit ID not passed');
	}

	try {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		};

		await apiFetch(`${BACKEND_HABIT_URL}/${habitId}`, options);
	} catch (e) {
		console.error('Habit deleted failed:', e);
	}
};
